import {
  exchangeGoogleCode,
  decodeGoogleIdToken,
  googleFlowConfigured,
  googleClientId,
} from '@/lib/auth/oauth/google';
import { upsertOAuthUser } from '@/lib/auth/oauth/account';
import { signSession, setSessionCookie } from '@/lib/mailkite-auth/session';
import { getBaseUrl } from '@/lib/mailkite-auth/config';
import { NextResponse } from 'next/server';

const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days

function fail(request: Request, message: string) {
  return NextResponse.redirect(
    new URL(`/sign-in?error=${encodeURIComponent(message)}`, request.url)
  );
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');
  const state = searchParams.get('state');

  if (error) return fail(request, error);
  if (!code) return fail(request, 'No authorization code');
  if (!googleFlowConfigured()) return fail(request, 'Google sign-in is not configured');

  // redirect_uri must match the one sent to the authorize endpoint exactly.
  const idToken = await exchangeGoogleCode(code, `${getBaseUrl()}/auth/google/callback`);
  const identity = idToken ? decodeGoogleIdToken(idToken) : null;

  // The ID token is only trustworthy if it was minted for *us* — reject any other `aud`.
  // Also require a verified address: an unverified one would let someone claim an email
  // they don't control and get merged into an existing account.
  if (
    !identity ||
    identity.aud !== googleClientId() ||
    !identity.email ||
    !identity.emailVerified
  ) {
    return fail(request, 'Google sign-in failed');
  }

  let user;
  try {
    user = await upsertOAuthUser({
      email: identity.email,
      name: identity.name,
      avatarUrl: identity.picture,
    });
  } catch (e) {
    // A DB failure here would otherwise surface as an opaque 500 digest page.
    console.error('google auth: account upsert failed', (e as Error).message);
    return fail(request, 'Could not complete sign-in. Please try again.');
  }

  await setSessionCookie(
    await signSession({
      userId: String(user.id),
      expires: new Date(Date.now() + SESSION_DURATION).toISOString(),
    })
  );

  // Only honour a relative `state` — anything else would be an open redirect.
  const dest = state && state.startsWith('/') && !state.startsWith('//') ? state : '/dashboard';
  return NextResponse.redirect(new URL(dest, request.url));
}

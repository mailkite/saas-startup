import {
  exchangeGitHubCode,
  fetchGitHubIdentity,
  githubFlowConfigured,
} from '@/lib/auth/oauth/github';
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
  if (!githubFlowConfigured()) return fail(request, 'GitHub sign-in is not configured');

  // redirect_uri must match the one sent to the authorize endpoint exactly.
  const token = await exchangeGitHubCode(code, `${getBaseUrl()}/auth/github/callback`);
  const identity = token ? await fetchGitHubIdentity(token) : null;

  if (!identity || !identity.email) {
    // The specific cause (bad secret / stale code / uri mismatch) is logged server-side;
    // this route is unauthenticated, so the response stays generic.
    return fail(request, 'GitHub sign-in failed');
  }

  let user;
  try {
    user = await upsertOAuthUser({
      email: identity.email,
      name: identity.name,
      avatarUrl: identity.avatarUrl,
    });
  } catch (e) {
    // A DB failure here would otherwise surface as an opaque 500 digest page.
    console.error('github auth: account upsert failed', (e as Error).message);
    return fail(request, 'Could not complete sign-in. Please try again.');
  }

  await setSessionCookie(
    await signSession({
      userId: String(user.id),
      expires: new Date(Date.now() + SESSION_DURATION).toISOString(),
    })
  );

  // `state` carries the post-sign-in destination. Only honour a relative path —
  // anything else (absolute URL, protocol-relative //host) would be an open redirect.
  const dest = state && state.startsWith('/') && !state.startsWith('//') ? state : '/dashboard';
  return NextResponse.redirect(new URL(dest, request.url));
}

// Google sign-in — server-side authorization-code (redirect) flow.
//
// The sign-in page links to Google's consent screen with our web client id and a
// redirect_uri of <BASE_URL>/auth/google/callback. Google redirects back with a one-time
// `code`, which /auth/google/callback exchanges here for tokens (confidential client:
// client id + secret). We decode the returned ID token and enforce its `aud` is our
// client id before trusting the identity.
//
// The ID token comes straight from Google's token endpoint over TLS using our secret, so
// it's trusted at the transport layer — we decode it locally (and check aud) rather than
// making an extra tokeninfo round-trip.

import 'server-only';

const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token';

export interface GoogleIdentity {
  sub: string; // Google's stable user id
  email: string | null;
  emailVerified: boolean;
  name: string | null;
  picture: string | null; // profile image URL (stored as the account avatar)
  aud: string | null;
}

export function googleClientId(): string {
  return process.env.GOOGLE_CLIENT_ID || process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';
}

/** True when the backend code-exchange flow is configured (id + secret present). */
export function googleFlowConfigured(): boolean {
  return !!(googleClientId() && process.env.GOOGLE_CLIENT_SECRET);
}

/** Exchange an authorization code for tokens. Returns the ID token, or null. */
export async function exchangeGoogleCode(
  code: string,
  redirectUri: string
): Promise<string | null> {
  if (!googleFlowConfigured()) {
    console.error('google auth: GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET is unset');
    return null;
  }
  try {
    const res = await fetch(GOOGLE_TOKEN_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: googleClientId(),
        client_secret: process.env.GOOGLE_CLIENT_SECRET ?? '',
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }).toString(),
    });
    if (!res.ok) {
      console.error(
        `google auth: token exchange HTTP ${res.status}: ${(await res.text()).slice(0, 200)}`
      );
      return null;
    }
    const body = (await res.json()) as { id_token?: string };
    return body.id_token ?? null;
  } catch (e) {
    console.error('google auth: token exchange threw', (e as Error).message);
    return null;
  }
}

function b64urlToString(segment: string): string {
  const b64 = segment.replace(/-/g, '+').replace(/_/g, '/');
  const bin = atob(b64);
  const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

/** Decode (not re-verify) the ID token payload into an identity. Trusted because it came
 *  directly from Google's token endpoint via our authenticated exchange. Callers must
 *  still check `aud` against our client id. */
export function decodeGoogleIdToken(idToken: string): GoogleIdentity | null {
  const parts = idToken.split('.');
  if (parts.length !== 3) return null;
  try {
    const p = JSON.parse(b64urlToString(parts[1])) as {
      sub?: string;
      email?: string;
      email_verified?: boolean;
      name?: string;
      picture?: string;
      aud?: string;
    };
    if (!p.sub) return null;
    return {
      sub: p.sub,
      email: p.email ?? null,
      emailVerified: p.email_verified === true,
      name: p.name ?? null,
      picture: p.picture ?? null,
      aud: p.aud ?? null,
    };
  } catch {
    return null;
  }
}

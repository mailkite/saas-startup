// GitHub sign-in — server-side authorization-code (redirect) flow.
//
// The sign-in page links to GitHub's consent screen with our OAuth app client id and a
// redirect_uri of <BASE_URL>/auth/github/callback (scope: read:user user:email). GitHub
// redirects back with a one-time `code`, which /auth/github/callback exchanges here for
// an access token (confidential client: client id + secret). Unlike Google, GitHub
// returns no ID token, so we call the REST API to read the profile and a verified
// primary email.

import 'server-only';

const GITHUB_TOKEN_URL = 'https://github.com/login/oauth/access_token';
const GITHUB_USER_URL = 'https://api.github.com/user';
const GITHUB_EMAILS_URL = 'https://api.github.com/user/emails';
// GitHub rejects API requests without a User-Agent (403). Identify ourselves.
const UA = 'saas-starter';

export interface GitHubIdentity {
  id: number; // GitHub's stable numeric user id
  email: string | null; // verified primary email
  name: string | null;
  avatarUrl: string | null;
}

/** True when the backend code-exchange flow is configured (id + secret present). */
export function githubFlowConfigured(): boolean {
  return !!(
    (process.env.GITHUB_CLIENT_ID || process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID) &&
    process.env.GITHUB_CLIENT_SECRET
  );
}

function clientId(): string {
  return process.env.GITHUB_CLIENT_ID || process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID || '';
}

/** Exchange an authorization code for a user access token. Returns the token, or null. */
export async function exchangeGitHubCode(
  code: string,
  redirectUri: string
): Promise<string | null> {
  if (!githubFlowConfigured()) {
    console.error('github auth: GITHUB_CLIENT_ID or GITHUB_CLIENT_SECRET is unset');
    return null;
  }
  try {
    const res = await fetch(GITHUB_TOKEN_URL, {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        // Ask for JSON — GitHub form-encodes the response body by default.
        accept: 'application/json',
        'user-agent': UA,
      },
      body: new URLSearchParams({
        code,
        client_id: clientId(),
        client_secret: process.env.GITHUB_CLIENT_SECRET ?? '',
        redirect_uri: redirectUri,
      }).toString(),
    });
    if (!res.ok) {
      console.error(
        `github auth: token exchange HTTP ${res.status}: ${(await res.text()).slice(0, 200)}`
      );
      return null;
    }
    const body = (await res.json()) as {
      access_token?: string;
      error?: string;
      error_description?: string;
    };
    // GitHub answers 200 OK with an {error} body — the status code tells you nothing, so a
    // bad secret and a stale code both land here as a silent null. The distinction
    // ('incorrect_client_credentials' vs 'bad_verification_code' vs 'redirect_uri_mismatch')
    // IS the diagnosis; log it. Kept out of the response: this route is unauthenticated.
    if (body.error) {
      console.error(
        `github auth: ${body.error}${body.error_description ? ` — ${body.error_description}` : ''}` +
          ` (client_id ${clientId().slice(0, 10)}…, redirect_uri ${redirectUri})`
      );
      return null;
    }
    if (!body.access_token) {
      console.error('github auth: token exchange returned neither access_token nor error');
      return null;
    }
    return body.access_token;
  } catch (e) {
    console.error('github auth: token exchange threw', (e as Error).message);
    return null;
  }
}

/** Read the authenticated user's profile + verified primary email via the REST API. */
export async function fetchGitHubIdentity(token: string): Promise<GitHubIdentity | null> {
  try {
    const headers = {
      authorization: `Bearer ${token}`,
      accept: 'application/vnd.github+json',
      'user-agent': UA,
    };
    const [userRes, emailsRes] = await Promise.all([
      fetch(GITHUB_USER_URL, { headers }),
      fetch(GITHUB_EMAILS_URL, { headers }),
    ]);
    if (!userRes.ok) return null;
    const user = (await userRes.json()) as {
      id?: number;
      email?: string | null;
      name?: string | null;
      avatar_url?: string | null;
    };
    if (typeof user.id !== 'number') return null;

    // Prefer a verified primary email from /user/emails; GitHub's profile `email` may be
    // null (private) or unverified, so only fall back to it if it's the sole signal.
    let email: string | null = null;
    if (emailsRes.ok) {
      const emails = (await emailsRes.json()) as Array<{
        email: string;
        primary: boolean;
        verified: boolean;
      }>;
      email =
        emails.find((e) => e.primary && e.verified)?.email ??
        emails.find((e) => e.verified)?.email ??
        null;
    }

    return {
      id: user.id,
      email,
      name: user.name ?? null,
      avatarUrl: user.avatar_url ?? null,
    };
  } catch {
    return null;
  }
}

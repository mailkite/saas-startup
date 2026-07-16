// Authorize-URL builders for the OAuth sign-in buttons.
//
// These only assemble the provider consent URL — the code exchange happens locally in
// app/auth/<provider>/callback. Nothing here talks to an external auth service.

import { getAuthConfig, getBaseUrl } from '@/lib/mailkite-auth/config';

/**
 * The sign-in/sign-up pages are server components, so `window` is undefined and we fall
 * back to BASE_URL. The provider requires an absolute redirect_uri, and it must match the
 * one the callback route sends during the code exchange (also getBaseUrl).
 */
function originForRedirect(): string {
  return typeof window !== 'undefined' ? window.location.origin : getBaseUrl();
}

export function getGoogleAuthUrl(returnUrl?: string): string {
  const config = getAuthConfig();
  if (!config.providers.google.enabled) {
    throw new Error('Google sign-in is not configured');
  }

  const params = new URLSearchParams({
    client_id: config.providers.google.clientId,
    redirect_uri: `${originForRedirect()}/auth/google/callback`,
    response_type: 'code',
    scope: 'openid email profile',
    access_type: 'offline',
    prompt: 'consent',
    ...(returnUrl ? { state: returnUrl } : {}),
  });

  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
}

export function getGitHubAuthUrl(returnUrl?: string): string {
  const config = getAuthConfig();
  if (!config.providers.github.enabled) {
    throw new Error('GitHub sign-in is not configured');
  }

  const params = new URLSearchParams({
    client_id: config.providers.github.clientId,
    redirect_uri: `${originForRedirect()}/auth/github/callback`,
    scope: 'read:user user:email',
    ...(returnUrl ? { state: returnUrl } : {}),
  });

  return `https://github.com/login/oauth/authorize?${params.toString()}`;
}

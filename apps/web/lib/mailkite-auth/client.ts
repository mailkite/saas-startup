import { getAuthConfig } from './config';
import type {
  AuthResponse,
  AuthError,
  SignInResult,
  SignUpResult,
  MagicLinkResult,
  PasswordResetResult,
  VerifyResult,
} from './types';

function getConfig() {
  return getAuthConfig();
}

async function apiCall<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const config = getConfig();
  const url = `${config.apiUrl}${path}`;

  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    const error = data as AuthError;
    throw new Error(error.error || `API error: ${res.status}`);
  }

  return data as T;
}

// ── Email/Password Auth ──────────────────────────────────────────────

export async function signInWithEmail(
  email: string,
  password: string
): Promise<SignInResult> {
  try {
    const data = await apiCall<AuthResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    return { jwt: data.token, user: data.user };
  } catch (err) {
    return { error: err instanceof Error ? err.message : 'Sign in failed' };
  }
}

export async function signUpWithEmail(
  email: string,
  password: string
): Promise<SignUpResult> {
  try {
    const data = await apiCall<AuthResponse>('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    return { jwt: data.token, user: data.user };
  } catch (err) {
    return { error: err instanceof Error ? err.message : 'Sign up failed' };
  }
}

// ── Magic Link ───────────────────────────────────────────────────────

export async function sendMagicLink(
  email: string
): Promise<MagicLinkResult> {
  try {
    await apiCall<{ status: string }>('/api/auth/signin-link', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
    return { status: 'sent' };
  } catch (err) {
    return {
      error: err instanceof Error ? err.message : 'Failed to send magic link',
    };
  }
}

export async function verifyMagicLinkToken(
  token: string
): Promise<SignInResult> {
  try {
    const data = await apiCall<AuthResponse>('/api/auth/signin', {
      method: 'POST',
      body: JSON.stringify({ token }),
    });
    return { jwt: data.token, user: data.user };
  } catch (err) {
    return {
      error: err instanceof Error ? err.message : 'Invalid or expired link',
    };
  }
}

// ── Email Verification ───────────────────────────────────────────────

export async function requestEmailVerification(
  jwt: string
): Promise<VerifyResult> {
  try {
    const data = await apiCall<{ status: string }>('/api/auth/verify/send', {
      method: 'POST',
      headers: { Authorization: `Bearer ${jwt}` },
    });
    return { status: data.status as 'verified' | 'sent' };
  } catch (err) {
    return {
      error: err instanceof Error ? err.message : 'Failed to send verification',
    };
  }
}

export async function verifyEmail(
  token: string
): Promise<VerifyResult> {
  try {
    // The verify endpoint returns HTML, not JSON — just check status
    const config = getConfig();
    const res = await fetch(`${config.apiUrl}/api/auth/verify?token=${token}`);
    if (res.ok) {
      return { status: 'verified' };
    }
    return { error: 'Invalid or expired verification link' };
  } catch (err) {
    return {
      error: err instanceof Error ? err.message : 'Verification failed',
    };
  }
}

// ── Password Reset ───────────────────────────────────────────────────

export async function requestPasswordReset(
  email: string
): Promise<PasswordResetResult> {
  try {
    await apiCall<{ status: string }>('/api/auth/password/forgot', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
    return { status: 'sent' };
  } catch (err) {
    return {
      error: err instanceof Error ? err.message : 'Failed to send reset email',
    };
  }
}

export async function resetPasswordConfirm(
  token: string,
  password: string
): Promise<PasswordResetResult> {
  try {
    await apiCall<{ status: string }>('/api/auth/password/reset', {
      method: 'POST',
      body: JSON.stringify({ token, password }),
    });
    return { status: 'reset' };
  } catch (err) {
    return {
      error: err instanceof Error ? err.message : 'Password reset failed',
    };
  }
}

// ── OAuth: Google ────────────────────────────────────────────────────

export function getGoogleAuthUrl(returnUrl?: string): string {
  const config = getConfig();
  if (!config.providers.google.enabled) {
    throw new Error('Google sign-in is not configured');
  }

  const baseUrl =
    typeof window !== 'undefined' ? window.location.origin : '';
  const redirectUri = `${baseUrl}/auth/google/callback`;

  const params = new URLSearchParams({
    client_id: config.providers.google.clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: 'openid email profile',
    access_type: 'offline',
    prompt: 'consent',
    ...(returnUrl ? { state: returnUrl } : {}),
  });

  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
}

export async function handleGoogleCallback(
  code: string,
  redirectUri: string
): Promise<SignInResult> {
  try {
    const data = await apiCall<AuthResponse>('/api/auth/google', {
      method: 'POST',
      body: JSON.stringify({ code, redirectUri }),
    });
    return { jwt: data.token, user: data.user };
  } catch (err) {
    return {
      error: err instanceof Error ? err.message : 'Google sign-in failed',
    };
  }
}

// ── OAuth: GitHub ────────────────────────────────────────────────────

export function getGitHubAuthUrl(returnUrl?: string): string {
  const config = getConfig();
  if (!config.providers.github.enabled) {
    throw new Error('GitHub sign-in is not configured');
  }

  const baseUrl =
    typeof window !== 'undefined' ? window.location.origin : '';
  const redirectUri = `${baseUrl}/auth/github/callback`;

  const params = new URLSearchParams({
    client_id: config.providers.github.clientId,
    redirect_uri: redirectUri,
    scope: 'read:user user:email',
    ...(returnUrl ? { state: returnUrl } : {}),
  });

  return `https://github.com/login/oauth/authorize?${params.toString()}`;
}

export async function handleGitHubCallback(
  code: string,
  redirectUri: string
): Promise<SignInResult> {
  try {
    const data = await apiCall<AuthResponse>('/api/auth/github', {
      method: 'POST',
      body: JSON.stringify({ code, redirectUri }),
    });
    return { jwt: data.token, user: data.user };
  } catch (err) {
    return {
      error: err instanceof Error ? err.message : 'GitHub sign-in failed',
    };
  }
}

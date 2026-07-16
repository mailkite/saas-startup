import { AuthConfig } from './types';

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required env var: ${name}`);
  return value;
}

export function getAuthConfig(): AuthConfig {
  return {
    apiUrl: process.env.MAILKITE_API_URL || 'https://api.mailkite.dev',
    sessionCookie: process.env.MAILKITE_SESSION_COOKIE || 'mk_session',
    providers: {
      google: {
        enabled: !!(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || process.env.GOOGLE_CLIENT_ID),
        clientId: (process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || process.env.GOOGLE_CLIENT_ID || ''),
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      },
      github: {
        enabled: !!(process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID || process.env.GITHUB_CLIENT_ID),
        clientId: (process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID || process.env.GITHUB_CLIENT_ID || ''),
        clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
      },
      email: { enabled: true },
      magicLink: {
        enabled: process.env.MAILKITE_MAGIC_LINK === 'true',
      },
    },
  };
}

export function getJwtSecret(): Uint8Array {
  const key = process.env.AUTH_SECRET;
  if (!key) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('Missing required env var: AUTH_SECRET');
    }
    return new TextEncoder().encode('dev-fallback-key-do-not-use-in-production');
  }
  return new TextEncoder().encode(key);
}

export function getBaseUrl(): string {
  if (process.env.BASE_URL) return process.env.BASE_URL;

  // Falling back to localhost in production yields an OAuth redirect_uri the
  // provider rejects, so prefer Vercel's deployment URL and only default to
  // localhost outside production.
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }

  return 'http://localhost:3000';
}

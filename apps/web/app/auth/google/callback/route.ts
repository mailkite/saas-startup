import { handleGoogleCallback } from '@/lib/mailkite-auth/client';
import { setSessionCookie } from '@/lib/mailkite-auth/session';
import { getBaseUrl } from '@/lib/mailkite-auth/config';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');
  const state = searchParams.get('state');

  if (error) {
    return NextResponse.redirect(new URL(`/sign-in?error=${encodeURIComponent(error)}`, request.url));
  }

  if (!code) {
    return NextResponse.redirect(new URL('/sign-in?error=No+authorization+code', request.url));
  }

  const result = await handleGoogleCallback(code, `${getBaseUrl()}/auth/google/callback`);

  if (result.error || !result.jwt) {
    const msg = encodeURIComponent(result.error || 'Google sign-in failed');
    return NextResponse.redirect(new URL(`/sign-in?error=${msg}`, request.url));
  }

  const redirectUrl = state || '/dashboard';
  await setSessionCookie(result.jwt);
  const response = NextResponse.redirect(new URL(redirectUrl, request.url));
  return response;
}

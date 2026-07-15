import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getAuthConfig } from './config';
import { verifySession } from './session';

interface MiddlewareOptions {
  protectedRoutes?: string[];
  loginUrl?: string;
  cookieName?: string;
}

export function createAuthMiddleware(options: MiddlewareOptions = {}) {
  const {
    protectedRoutes = ['/dashboard'],
    loginUrl = '/sign-in',
  } = options;

  return async function authMiddleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const config = getAuthConfig();
    const cookieName = options.cookieName || config.sessionCookie;

    const isProtected = protectedRoutes.some((route) =>
      pathname.startsWith(route)
    );

    const sessionCookie = request.cookies.get(cookieName);

    // Redirect to login if accessing protected route without session
    if (isProtected && !sessionCookie) {
      const loginUrlObj = new URL(loginUrl, request.url);
      loginUrlObj.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrlObj);
    }

    // Refresh session on GET requests (keep alive)
    if (sessionCookie && request.method === 'GET') {
      try {
        const session = await verifySession(sessionCookie.value);
        const expires = new Date(session.expires);

        // If expiring within 1 day, refresh
        if (expires.getTime() - Date.now() < 24 * 60 * 60 * 1000) {
          const { signSession } = await import('./session');
          const newExpires = new Date(
            Date.now() + 7 * 24 * 60 * 60 * 1000
          ).toISOString();
          const newJwt = await signSession({
            ...session,
            expires: newExpires,
          });

          const res = NextResponse.next();
          res.cookies.set(cookieName, newJwt, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
          });
          return res;
        }
      } catch {
        // Invalid session — clear and redirect
        const res = NextResponse.redirect(new URL(loginUrl, request.url));
        res.cookies.delete(cookieName);
        if (isProtected) return res;
      }
    }

    return NextResponse.next();
  };
}

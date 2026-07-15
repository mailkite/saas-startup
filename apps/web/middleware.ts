import { createAuthMiddleware } from '@mailkite/auth';

export default createAuthMiddleware({
  protectedRoutes: ['/dashboard'],
  loginUrl: '/sign-in',
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

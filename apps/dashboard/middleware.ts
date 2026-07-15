import { createAuthMiddleware } from '@mailkite/auth';

export default createAuthMiddleware({
  protectedRoutes: ['/dashboard'],
  loginUrl: '/auth/v1/login',
});

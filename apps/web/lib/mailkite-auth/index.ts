// Public API
//
// This module is now only sessions, config, middleware and MailKite email — auth itself
// (email/password + OAuth) lives in lib/auth and runs against our own database.
export { getAuthConfig, getJwtSecret, getBaseUrl } from './config';
export { createAuthMiddleware } from './middleware';
export {
  setSessionCookie,
  getSession,
  clearSession,
  refreshSession,
  signSession,
  verifySession,
} from './session';
export { sendEmail, sendWelcomeEmail, isMailkiteEmailConfigured } from './email';
export type {
  AuthConfig,
  AuthUser,
  AuthResponse,
  AuthError,
  SignInResult,
  SignUpResult,
  MagicLinkResult,
  PasswordResetResult,
  VerifyResult,
  SessionData,
} from './types';

// Public API
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
export {
  signInWithEmail,
  signUpWithEmail,
  sendMagicLink,
  verifyMagicLinkToken,
  requestEmailVerification,
  verifyEmail,
  requestPasswordReset,
  resetPasswordConfirm,
  getGoogleAuthUrl,
  handleGoogleCallback,
  getGitHubAuthUrl,
  handleGitHubCallback,
} from './client';
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

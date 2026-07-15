export {
  signInWithEmail,
  signUpWithEmail,
  getGoogleAuthUrl,
  getGitHubAuthUrl,
  sendMagicLink,
  verifyEmail,
  requestPasswordReset,
  resetPasswordConfirm,
} from '@mailkite/auth/client';

export {
  getSession,
  setSessionCookie,
  clearSession,
  refreshSession,
} from '@mailkite/auth/session';

export {
  signInWithEmail,
  signUpWithEmail,
  signInWithGoogle,
  signInWithGitHub,
  sendMagicLink,
  verifyEmail,
  requestPasswordReset,
  resetPasswordConfirm,
  handleOAuthCallback,
} from '@mailkite/auth/client';

export {
  getSession,
  setSessionCookie,
  clearSession,
  refreshSession,
} from '@mailkite/auth/session';

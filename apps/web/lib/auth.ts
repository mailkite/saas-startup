export {
  signInWithEmail,
  signUpWithEmail,
  getGoogleAuthUrl,
  getGitHubAuthUrl,
  sendMagicLink,
  verifyEmail,
  requestPasswordReset,
  resetPasswordConfirm,
} from '@/lib/mailkite-auth/client';

export {
  getSession,
  setSessionCookie,
  clearSession,
  refreshSession,
} from '@/lib/mailkite-auth/session';

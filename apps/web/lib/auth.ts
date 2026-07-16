export { signInWithEmail, signUpWithEmail, issueSession } from '@/lib/auth/local';

export { getGoogleAuthUrl, getGitHubAuthUrl } from '@/lib/auth/oauth/urls';

export {
  getSession,
  setSessionCookie,
  clearSession,
  refreshSession,
} from '@/lib/mailkite-auth/session';

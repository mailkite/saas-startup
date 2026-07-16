import { Suspense } from 'react';
import { Login } from '../login';
import { getGoogleAuthUrl, getGitHubAuthUrl } from '@/lib/mailkite-auth/client';

export default function SignInPage() {
  let googleUrl = '';
  let githubUrl = '';

  try { googleUrl = getGoogleAuthUrl('/dashboard'); } catch {}
  try { githubUrl = getGitHubAuthUrl('/dashboard'); } catch {}

  return (
    <Suspense>
      <Login mode="signin" googleUrl={googleUrl} githubUrl={githubUrl} />
    </Suspense>
  );
}

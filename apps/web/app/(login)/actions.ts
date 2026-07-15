'use server';

import { z } from 'zod';
import {
  signInWithEmail,
  signUpWithEmail,
  setSessionCookie,
  clearSession,
} from '@/lib/auth';
import { redirect } from 'next/navigation';
import { validatedAction } from '@/lib/server-actions';

const signInSchema = z.object({
  email: z.string().email().min(3).max(255),
  password: z.string().min(8).max(100),
});

export const signIn = validatedAction(signInSchema, async (data, formData) => {
  const { email, password } = data;

  const result = await signInWithEmail(email, password);

  if (result.error) {
    return { error: result.error, email, password };
  }

  if (result.jwt) {
    await setSessionCookie(result.jwt);
  }

  const redirectTo = formData.get('redirect') as string | null;
  if (redirectTo === 'checkout') {
    const priceId = formData.get('priceId') as string;
    return { redirect: `/pricing?checkout=true&priceId=${priceId}` };
  }

  redirect('/dashboard');
});

const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  inviteId: z.string().optional(),
});

export const signUp = validatedAction(signUpSchema, async (data, formData) => {
  const { email, password, inviteId } = data;

  const result = await signUpWithEmail(email, password);

  if (result.error) {
    return { error: result.error, email, password };
  }

  if (result.jwt) {
    await setSessionCookie(result.jwt);
  }

  const redirectTo = formData.get('redirect') as string | null;
  if (redirectTo === 'checkout') {
    const priceId = formData.get('priceId') as string;
    return { redirect: `/pricing?checkout=true&priceId=${priceId}` };
  }

  redirect('/dashboard');
});

export async function signOut() {
  await clearSession();
  redirect('/sign-in');
}

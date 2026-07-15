'use server';

import { redirect } from 'next/navigation';
import { createCheckoutSession, createCustomerPortalSession } from './stripe';
import { getTeamForSession } from '@/lib/auth/middleware';

export async function checkoutAction(formData: FormData) {
  const team = await getTeamForSession();
  const priceId = formData.get('priceId') as string;
  await createCheckoutSession({ team: team, priceId });
}

export async function customerPortalAction() {
  const team = await getTeamForSession();
  const portalSession = await createCustomerPortalSession(team);
  redirect(portalSession.url);
}

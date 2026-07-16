// Shared account handling for the OAuth callbacks.
//
// Sign-in is email-keyed and provider-agnostic: an account is matched or created purely
// by verified email, with password_hash left NULL. Signing in with Google and GitHub on
// the same address therefore resolves to one account.

import 'server-only';
import { eq } from 'drizzle-orm';
import { db } from '@/lib/db/drizzle';
import { users, teams, teamMembers, activityLogs, ActivityType } from '@/lib/db/schema';
import type { User } from '@/lib/db/schema';
import { sendWelcomeEmail } from '@/lib/mailkite-auth/email';

export interface OAuthIdentity {
  email: string;
  name: string | null;
  avatarUrl: string | null;
}

/**
 * Find an account by email, or create one (plus its team) for a first-time sign-in.
 * The provider has already verified the address, so no verification email is sent.
 */
export async function upsertOAuthUser(identity: OAuthIdentity): Promise<User> {
  const existing = await db
    .select()
    .from(users)
    .where(eq(users.email, identity.email))
    .limit(1);

  if (existing.length > 0) {
    const user = existing[0];
    // Backfill a missing avatar/name from the provider without clobbering edits the
    // user has since made locally.
    const patch: Partial<typeof users.$inferInsert> = {};
    if (!user.avatarUrl && identity.avatarUrl) patch.avatarUrl = identity.avatarUrl;
    if (!user.name && identity.name) patch.name = identity.name;
    if (Object.keys(patch).length > 0) {
      await db.update(users).set(patch).where(eq(users.id, user.id));
      Object.assign(user, patch);
    }
    await logActivity(user.id, ActivityType.SIGN_IN);
    return user;
  }

  // New account. Everything below must land together — a user without a team would
  // leave the dashboard in a broken half-provisioned state.
  const [user] = await db
    .insert(users)
    .values({
      email: identity.email,
      name: identity.name,
      avatarUrl: identity.avatarUrl,
      passwordHash: null,
      emailVerified: true, // the provider only hands us verified addresses
      role: 'owner',
    })
    .returning();

  const [team] = await db
    .insert(teams)
    .values({ name: `${identity.name || identity.email.split('@')[0]}'s Team` })
    .returning();

  await db.insert(teamMembers).values({
    userId: user.id,
    teamId: team.id,
    role: 'owner',
  });

  await logActivity(user.id, ActivityType.SIGN_UP, team.id);

  // Best-effort: a failed welcome email must not fail the sign-in.
  try {
    await sendWelcomeEmail(user.email);
  } catch (e) {
    console.error('oauth: welcome email failed', (e as Error).message);
  }

  return user;
}

async function logActivity(userId: number, action: ActivityType, teamId?: number) {
  try {
    const team =
      teamId ??
      (
        await db
          .select({ teamId: teamMembers.teamId })
          .from(teamMembers)
          .where(eq(teamMembers.userId, userId))
          .limit(1)
      )[0]?.teamId;
    if (!team) return;
    await db.insert(activityLogs).values({ teamId: team, userId, action });
  } catch (e) {
    // Activity logging is not worth failing a sign-in over.
    console.error('oauth: activity log failed', (e as Error).message);
  }
}

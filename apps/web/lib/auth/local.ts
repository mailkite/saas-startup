// Email/password sign-in and sign-up against our own database.
//
// Sign-in is email-keyed and provider-agnostic, matching the OAuth path in
// lib/auth/oauth/account.ts — the same address resolves to one account regardless of how
// it was created. An account created via OAuth has password_hash = NULL, so
// verifyPassword returns false for it and email sign-in is correctly refused.

import 'server-only';
import { eq } from 'drizzle-orm';
import { db } from '@/lib/db/drizzle';
import { users, teams, teamMembers, activityLogs, ActivityType } from '@/lib/db/schema';
import type { User } from '@/lib/db/schema';
import { hashPassword, verifyPassword } from '@/lib/auth/password';
import { signSession } from '@/lib/mailkite-auth/session';
import { sendWelcomeEmail } from '@/lib/mailkite-auth/email';

const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days

export interface AuthResult {
  jwt?: string;
  user?: User;
  error?: string;
}

/** Mint a session JWT for a local user id. */
export async function issueSession(user: User): Promise<string> {
  return signSession({
    userId: String(user.id),
    expires: new Date(Date.now() + SESSION_DURATION).toISOString(),
  });
}

export async function signInWithEmail(email: string, password: string): Promise<AuthResult> {
  const found = await db.select().from(users).where(eq(users.email, email)).limit(1);

  // Deliberately identical error for "no such account" and "wrong password" — telling
  // them apart lets an attacker enumerate registered addresses.
  const invalid = { error: 'Invalid email or password' };
  if (found.length === 0) return invalid;

  const user = found[0];
  if (user.deletedAt) return invalid;
  if (!(await verifyPassword(password, user.passwordHash))) return invalid;

  await logActivity(user.id, ActivityType.SIGN_IN);
  return { jwt: await issueSession(user), user };
}

export async function signUpWithEmail(email: string, password: string): Promise<AuthResult> {
  const existing = await db.select().from(users).where(eq(users.email, email)).limit(1);
  if (existing.length > 0) {
    return { error: 'An account with that email already exists' };
  }

  const [user] = await db
    .insert(users)
    .values({
      email,
      passwordHash: await hashPassword(password),
      role: 'owner',
    })
    .returning();

  const [team] = await db
    .insert(teams)
    .values({ name: `${email.split('@')[0]}'s Team` })
    .returning();

  await db.insert(teamMembers).values({ userId: user.id, teamId: team.id, role: 'owner' });
  await logActivity(user.id, ActivityType.SIGN_UP, team.id);

  // Best-effort: a failed welcome email must not fail the sign-up.
  try {
    await sendWelcomeEmail(user.email);
  } catch (e) {
    console.error('signup: welcome email failed', (e as Error).message);
  }

  return { jwt: await issueSession(user), user };
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
    console.error('auth: activity log failed', (e as Error).message);
  }
}

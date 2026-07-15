import { getSession } from '@/lib/mailkite-auth/session';
import { db } from '@/lib/db/drizzle';
import { teams, teamMembers } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function getTeamForSession() {
  const session = await getSession();
  if (!session) {
    throw new Error('Not authenticated');
  }

  const result = await db
    .select({ teamId: teamMembers.teamId })
    .from(teamMembers)
    .where(eq(teamMembers.userId, Number(session.userId)))
    .limit(1);

  if (result.length === 0) {
    throw new Error('No team found');
  }

  const team = await db
    .select()
    .from(teams)
    .where(eq(teams.id, result[0].teamId))
    .limit(1);

  return team[0];
}

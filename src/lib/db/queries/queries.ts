import { headers } from 'next/headers';
import { desc, eq } from 'drizzle-orm';

import { auth } from '@/lib/auth';
import db from '@/lib/db';
import {
  activityLogs,
  members,
  organizations,
  subscriptions,
  users,
} from '@/lib/db/schema';

export async function getOrganization() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error('Session not found');
  }

  const result = await db
    .select({
      id: organizations.id,
      name: organizations.name,
      slug: organizations.slug,
      logo: organizations.logo,
      metadata: organizations.metadata,
      createdAt: organizations.createdAt,
      updatedAt: organizations.updatedAt,
    })
    .from(organizations)
    .innerJoin(members, eq(organizations.id, members.organizationId))
    .where(eq(members.userId, session.user.id))
    .limit(1);

  return result[0];
}

export async function updateOrganizationSubscription(
  organizationId: string,
  subscriptionData: {
    stripeSubscriptionId: string | null;
    stripeProductId: string | null;
    planName: string | null;
    subscriptionStatus: string;
  }
) {
  await db
    .update(subscriptions)
    .set({
      ...subscriptionData,
      updatedAt: new Date(),
    })
    .where(eq(organizations.id, organizationId));
}

export async function getUserWithTeam(userId: string) {
  const result = await db
    .select({
      user: users,
      organizationId: members.organizationId,
    })
    .from(users)
    .leftJoin(members, eq(users.id, members.userId))
    .where(eq(users.id, userId))
    .limit(1);

  return result[0];
}

export async function getActivityLogs() {
  const user = await auth.api.getSession({
    headers: await headers(),
  });

  if (!user) {
    throw new Error('User not found');
  }

  return await db
    .select({
      id: activityLogs.id,
      type: activityLogs.type,
      timestamp: activityLogs.timestamp,
      ipAddress: activityLogs.ipAddress,
      userName: users.name,
    })
    .from(activityLogs)
    .leftJoin(users, eq(activityLogs.userId, users.id))
    .where(eq(activityLogs.userId, user.user.id))
    .orderBy(desc(activityLogs.timestamp))
    .limit(10);
}

export async function getTeamForUser(userId: string) {
  const result = await db.query.users.findFirst({
    where: eq(users.id, userId),
    with: {
      members: {
        with: {
          team: {
            with: {
              members: {
                with: {
                  user: {
                    columns: {
                      id: true,
                      name: true,
                      email: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  return result?.members[0]?.team || null;
}

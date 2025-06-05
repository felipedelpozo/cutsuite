import { headers } from 'next/headers';
import { and, desc, eq, gte, inArray } from 'drizzle-orm';

import { auth } from '@/lib/auth';
import db from '@/lib/db';
import {
  activityLogs,
  chats,
  members,
  messages,
  organizations,
  subscriptions,
  users,
  votes,
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
    .where(eq(subscriptions.organizationId, organizationId));
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

export async function deleteMessagesByChatIdAfterTimestamp({
  chatId,
  timestamp,
}: {
  chatId: string;
  timestamp: Date;
}) {
  try {
    const messagesToDelete = await db
      .select({ id: messages.id })
      .from(messages)
      .where(
        and(eq(messages.chatId, chatId), gte(messages.createdAt, timestamp))
      );

    const messageIds = messagesToDelete.map((message) => message.id);

    if (messageIds.length > 0) {
      await db
        .delete(votes)
        .where(
          and(eq(votes.chatId, chatId), inArray(votes.messageId, messageIds))
        );

      return await db
        .delete(messages)
        .where(
          and(eq(messages.chatId, chatId), inArray(messages.id, messageIds))
        );
    }
  } catch (error) {
    console.error(
      'Failed to delete messages by id after timestamp from database'
    );
    throw error;
  }
}

export async function getMessageById({ id }: { id: string }) {
  try {
    return await db.select().from(messages).where(eq(messages.id, id));
  } catch (error) {
    console.error('Failed to get message by id from database');
    throw error;
  }
}

export async function updateChatVisiblityById({
  chatId,
  visibility,
}: {
  chatId: string;
  visibility: 'private' | 'public';
}) {
  try {
    return await db
      .update(chats)
      .set({ visibility })
      .where(eq(chats.id, chatId));
  } catch (error) {
    console.error('Failed to update chat visibility in database');
    throw error;
  }
}

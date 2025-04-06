import { relations } from 'drizzle-orm';

import { activityLogs } from '@/lib/db/schema//activity-logs';
import { invitations } from '@/lib/db/schema//invitations';
import { members } from '@/lib/db/schema//members';
import { users } from '@/lib/db/schema//users';
import { organizations } from '@/lib/db/schema/organizations';

export const organizationRelations = relations(organizations, ({ many }) => ({
  members: many(members),
  activityLogs: many(activityLogs),
  invitations: many(invitations),
}));

export const usersRelations = relations(users, ({ many }) => ({
  members: many(members),
  invitationsSent: many(invitations),
}));

export const invitationsRelations = relations(invitations, ({ one }) => ({
  team: one(organizations, {
    fields: [invitations.organizationId],
    references: [organizations.id],
  }),
  invitedBy: one(users, {
    fields: [invitations.inviterId],
    references: [users.id],
  }),
}));

export const teamMembersRelations = relations(members, ({ one }) => ({
  user: one(users, {
    fields: [members.userId],
    references: [users.id],
  }),
  team: one(organizations, {
    fields: [members.organizationId],
    references: [organizations.id],
  }),
}));

export const activityLogsRelations = relations(activityLogs, ({ one }) => ({
  team: one(organizations, {
    fields: [activityLogs.organizationId],
    references: [organizations.id],
  }),
  user: one(users, {
    fields: [activityLogs.userId],
    references: [users.id],
  }),
}));

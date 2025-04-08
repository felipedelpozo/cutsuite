import { type InferInsertModel, type InferSelectModel } from 'drizzle-orm';
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

import { MemberRole, memberRoleEnum } from '@/lib/db/schema/members';
import { organizationIdReference } from '@/lib/db/schema/organizations';
import { users } from '@/lib/db/schema/users';
import { changedAt } from '@/lib/db/utils';

export const invitations = pgTable('invitation', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  email: text('email').notNull(),
  role: memberRoleEnum('role').default(MemberRole.GUEST),
  status: text('status').notNull(),
  inviterId: text('inviterId')
    .notNull()
    .references(() => users.id),
  ...organizationIdReference({ onDelete: 'cascade' }),
  expiresAt: timestamp('expiresAt').notNull(),
  ...changedAt(),
});

export type Invitation = InferSelectModel<typeof invitations>;
export type NewInvitation = InferInsertModel<typeof invitations>;

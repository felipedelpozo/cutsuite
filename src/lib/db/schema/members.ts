import { type InferInsertModel, type InferSelectModel } from 'drizzle-orm';
import { jsonb, pgEnum, pgTable, text, uuid } from 'drizzle-orm/pg-core';

import { organizationIdReference } from '@/lib/db/schema/organizations';
import { userIdReference } from '@/lib/db/schema/users';
import { changedAt } from '@/lib/db/utils';

export const memberRoleEnum = pgEnum('member_role', ['ADMIN', 'USER', 'GUEST']);

export enum MemberRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
  GUEST = 'GUEST',
}

export const members = pgTable('member', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  email: text('email').notNull(),
  role: memberRoleEnum('role').default(MemberRole.GUEST),
  displayName: text('display_name'),
  phoneNumber: text('phone_number'),
  image: text('image'),
  preferences: jsonb('preferences').notNull().default('{}'),
  ...userIdReference(),
  ...organizationIdReference(),
  ...changedAt(),
});

export const memberIdReference = () => ({
  member_id: uuid('member_id')
    .notNull()
    .references(() => members.id),
});

export type Member = InferSelectModel<typeof members>;
export type NewMember = InferInsertModel<typeof members>;

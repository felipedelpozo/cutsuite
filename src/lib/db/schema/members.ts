import { type InferInsertModel, type InferSelectModel } from 'drizzle-orm';
import { pgTable, text, uuid } from 'drizzle-orm/pg-core';

import { organizationIdReference } from '@/lib/db/schema/organizations';
import { changedAt } from '@/lib/db/utils';

import { userIdReference } from './users';

export const members = pgTable('member', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  email: text('email').notNull(),
  role: text('role').notNull(),
  ...userIdReference(),
  ...organizationIdReference(),
  ...changedAt(),
});

export type Member = InferSelectModel<typeof members>;
export type NewMember = InferInsertModel<typeof members>;

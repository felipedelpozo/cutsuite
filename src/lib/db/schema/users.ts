import { type InferInsertModel, type InferSelectModel } from 'drizzle-orm';
import { boolean, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

import { changedAt } from '@/lib/db/utils';

export const users = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('emailVerified').notNull(),
  image: text('image'),
  deletedAt: timestamp('deletedAt'),
  ...changedAt(),
});

export const userIdReference = () => ({
  userId: text('user_id')
    .notNull()
    .references(() => users.id),
});

export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;

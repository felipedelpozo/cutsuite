import { type InferInsertModel, type InferSelectModel } from 'drizzle-orm';
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';

import { changedAt } from '@/lib/db/utils';

export const verification = pgTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  ...changedAt(),
});

export type SelectVerification = InferSelectModel<typeof verification>;
export type InsertVerificaton = InferInsertModel<typeof verification>;

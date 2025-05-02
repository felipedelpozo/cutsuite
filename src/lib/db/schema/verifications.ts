import { type InferInsertModel, type InferSelectModel } from 'drizzle-orm';
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';

import { changedAt } from '@/lib/db/utils';

export const verifications = pgTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expiresAt').notNull(),
  ...changedAt(),
});

export type Verification = InferSelectModel<typeof verifications>;
export type NewVerificaton = InferInsertModel<typeof verifications>;

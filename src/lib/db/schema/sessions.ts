import { type InferInsertModel, type InferSelectModel } from 'drizzle-orm';
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';

import { userIdReference } from '@/lib/db/schema/users';
import { changedAt } from '@/lib/db/utils';

export const sessions = pgTable('session', {
  id: text('id').primaryKey(),
  token: text('token').notNull().unique(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  expiresAt: timestamp('expires_at').notNull(),
  ...userIdReference(),
  ...changedAt(),
});

export type Session = InferSelectModel<typeof sessions>;
export type NewSession = InferInsertModel<typeof sessions>;

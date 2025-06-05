import { type InferInsertModel, type InferSelectModel } from 'drizzle-orm';
import {
  json,
  pgTable,
  ReferenceConfig,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

import { chatIdReference } from '@/lib/db/schema/chats';
import { changedAt } from '@/lib/db/utils';

export const messages = pgTable('message', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  role: varchar('role').notNull(),
  parts: json('parts').notNull(),
  attachments: json('attachments').notNull(),
  ...chatIdReference(),
  ...changedAt(),
});

export const messageIdReference = (actions?: ReferenceConfig['actions']) => ({
  messageId: uuid('messageId')
    .notNull()
    .references(() => messages.id, actions),
});

export type Message = InferSelectModel<typeof messages>;
export type NewMessage = InferInsertModel<typeof messages>;

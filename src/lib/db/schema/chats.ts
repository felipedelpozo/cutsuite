import { type InferInsertModel, type InferSelectModel } from 'drizzle-orm';
import {
  pgTable,
  ReferenceConfig,
  text,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

import { userIdReference } from '@/lib/db/schema/users';
import { changedAt } from '@/lib/db/utils';

export const chats = pgTable('chat', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  title: text('title').notNull(),
  visibility: varchar('visibility', { enum: ['public', 'private'] })
    .notNull()
    .default('private'),
  ...userIdReference(),
  ...changedAt(),
});

export const chatIdReference = (actions?: ReferenceConfig['actions']) => ({
  chatId: uuid('chatId')
    .notNull()
    .references(() => chats.id, actions),
});

export type Chat = InferSelectModel<typeof chats>;
export type NewChat = InferInsertModel<typeof chats>;

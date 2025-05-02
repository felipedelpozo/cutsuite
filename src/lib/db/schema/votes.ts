import { type InferInsertModel, type InferSelectModel } from 'drizzle-orm';
import { boolean, pgTable, primaryKey } from 'drizzle-orm/pg-core';

import { chatIdReference } from '@/lib/db/schema/chats';
import { changedAt } from '@/lib/db/utils';

import { messageIdReference } from './messages';

export const votes = pgTable(
  'vote',
  {
    isUpvoted: boolean('isUpvoted').notNull(),
    ...chatIdReference(),
    ...messageIdReference(),
    ...changedAt(),
  },
  (table) => [primaryKey({ columns: [table.chatId, table.messageId] })]
);

export type Vote = InferSelectModel<typeof votes>;
export type NewVote = InferInsertModel<typeof votes>;

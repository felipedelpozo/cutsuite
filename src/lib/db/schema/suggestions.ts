import { type InferInsertModel, type InferSelectModel } from 'drizzle-orm';
import { boolean, pgTable, text, uuid } from 'drizzle-orm/pg-core';

import {
  documentForeignKey,
  documentReference,
} from '@/lib/db/schema/documents';
import { userIdReference } from '@/lib/db/schema/users';

export const suggestions = pgTable(
  'suggestion',
  {
    id: uuid('id').notNull().primaryKey().defaultRandom(),
    originalText: text('originalText').notNull(),
    suggestedText: text('suggestedText').notNull(),
    description: text('description'),
    isResolved: boolean('isResolved').notNull().default(false),
    ...documentReference(),
    ...userIdReference(),
  },
  (table) => [documentForeignKey(table)]
);

export type Suggestion = InferSelectModel<typeof suggestions>;
export type NewSuggestion = InferInsertModel<typeof suggestions>;

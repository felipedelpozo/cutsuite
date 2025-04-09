import { type InferInsertModel, type InferSelectModel } from 'drizzle-orm';
import { pgTable, ReferenceConfig, text, uuid } from 'drizzle-orm/pg-core';

import { organizationIdReference } from '@/lib/db/schema//organizations';
import { changedAt } from '@/lib/db/utils';

export const documents = pgTable('document', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  content: text('content').notNull(),
  ...organizationIdReference({ onDelete: 'cascade' }),
  ...changedAt(),
});

export const documentIdReference = (actions?: ReferenceConfig['actions']) => ({
  documentId: uuid('document_id')
    .notNull()
    .references(() => documents.id, actions),
});

export type Document = InferSelectModel<typeof documents>;
export type NewDocument = InferInsertModel<typeof documents>;

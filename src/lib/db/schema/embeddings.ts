import { type InferInsertModel, type InferSelectModel } from 'drizzle-orm';
import { index, pgTable, text, uuid, vector } from 'drizzle-orm/pg-core';

import {
  documentForeignKey,
  documentReference,
} from '@/lib/db/schema/documents';
import { changedAt } from '@/lib/db/utils';

export const embeddings = pgTable(
  'embedding',
  {
    id: uuid('id').primaryKey().notNull().defaultRandom(),
    content: text('content').notNull(),
    embedding: vector('embedding', { dimensions: 1536 }).notNull(),
    ...documentReference(),
    ...changedAt(),
  },
  (table) => [
    index('embeddingIndex').using(
      'hnsw',
      table.embedding.op('vector_cosine_ops')
    ),
    documentForeignKey(table),
  ]
);

export type Embedding = InferSelectModel<typeof embeddings>;
export type NewEmbedding = InferInsertModel<typeof embeddings>;

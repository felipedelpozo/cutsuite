import { type InferInsertModel, type InferSelectModel } from 'drizzle-orm';
import { index, pgTable, text, uuid, vector } from 'drizzle-orm/pg-core';

import { changedAt } from '@/lib/db/utils';

import { documentIdReference } from './documents';

export const embeddings = pgTable(
  'embedding',
  {
    id: uuid('id').primaryKey().notNull().defaultRandom(),
    content: text('content').notNull(),
    embedding: vector('embedding', { dimensions: 1536 }).notNull(),
    ...documentIdReference({ onDelete: 'cascade' }),
    ...changedAt(),
  },
  (table) => [
    index('embeddingIndex').using(
      'hnsw',
      table.embedding.op('vector_cosine_ops')
    ),
  ]
);

export type Embedding = InferSelectModel<typeof embeddings>;
export type NewEmbedding = InferInsertModel<typeof embeddings>;

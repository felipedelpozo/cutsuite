import { index, pgTable, serial, vector } from 'drizzle-orm/pg-core';

import { organizationIdReference } from '@/lib/db/schema//organizations';
import { changedAt } from '@/lib/db/utils';

export const guides = pgTable(
  'document',
  {
    id: serial('id').primaryKey(),
    embedding: vector('embedding', { dimensions: 1536 }),
    ...organizationIdReference(),
    ...changedAt(),
  },
  (table) => [
    index('embeddingIndex').using(
      'hnsw',
      table.embedding.op('vector_cosine_ops')
    ),
  ]
);

import {
  ColumnBaseConfig,
  ColumnDataType,
  type InferInsertModel,
  type InferSelectModel,
} from 'drizzle-orm';
import {
  ExtraConfigColumn,
  foreignKey,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

import { organizationIdReference } from '@/lib/db/schema/organizations';
import { changedAt } from '@/lib/db/utils';

export const documents = pgTable(
  'document',
  {
    id: uuid('id').notNull(),
    title: text('title').notNull(),
    kind: varchar('text', { enum: ['text', 'code', 'image', 'sheet'] })
      .notNull()
      .default('text'),
    content: text('content').notNull(),
    ...organizationIdReference({ onDelete: 'cascade' }),
    ...changedAt(),
  },
  (table) => [
    primaryKey({
      columns: [table.id, table.createdAt],
    }),
  ]
);

export const documentReference = () => ({
  documentId: uuid('documentId').notNull(),
  documentCreatedAt: timestamp('documentCreatedAt').notNull(),
});

export const documentForeignKey = <
  T extends {
    documentId: ExtraConfigColumn<ColumnBaseConfig<ColumnDataType, string>>;
    documentCreatedAt: ExtraConfigColumn<
      ColumnBaseConfig<ColumnDataType, string>
    >;
  },
>(
  table: T
) =>
  foreignKey({
    columns: [table.documentId, table.documentCreatedAt],
    foreignColumns: [documents.id, documents.createdAt],
  });

export type Document = InferSelectModel<typeof documents>;
export type NewDocument = InferInsertModel<typeof documents>;

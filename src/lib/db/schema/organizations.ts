import { type InferInsertModel, type InferSelectModel } from 'drizzle-orm';
import { pgTable, ReferenceConfig, text, uuid } from 'drizzle-orm/pg-core';

import { changedAt } from '@/lib/db/utils';

export const organizations = pgTable('organization', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  name: text('name').notNull(),
  slug: text('slug').unique(),
  logo: text('logo'),
  metadata: text('metadata'),
  ...changedAt(),
});

export const organizationIdReference = (
  actions?: ReferenceConfig['actions']
) => ({
  organizationId: uuid('organization_id')
    .notNull()
    .references(() => organizations.id, actions),
});

export type Organization = InferSelectModel<typeof organizations>;
export type NewOrganization = InferInsertModel<typeof organizations>;

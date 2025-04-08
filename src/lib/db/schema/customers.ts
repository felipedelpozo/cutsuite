import { type InferInsertModel, type InferSelectModel } from 'drizzle-orm';
import { pgTable, ReferenceConfig, text, uuid } from 'drizzle-orm/pg-core';

import { memberIdReference } from '@/lib/db/schema/members';
import { organizationIdReference } from '@/lib/db/schema/organizations';
import { changedAt } from '@/lib/db/utils';

export const customers = pgTable('customer', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  name: text('name'),
  displayName: text('display_name'),
  email: text('email').notNull(),
  phoneNumber: text('phone_number'),
  image: text('image'),
  ...memberIdReference(),
  ...organizationIdReference({ onDelete: 'cascade' }),
  ...changedAt(),
});

export const customerIdReference = (actions?: ReferenceConfig['actions']) => ({
  customer_id: uuid('customer_id')
    .notNull()
    .references(() => customers.id, actions),
});

export type Customer = InferSelectModel<typeof customers>;
export type NewCustomer = InferInsertModel<typeof customers>;

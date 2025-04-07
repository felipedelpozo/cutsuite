import { type InferInsertModel, type InferSelectModel } from 'drizzle-orm';
import { pgTable, text, uuid } from 'drizzle-orm/pg-core';

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
  ...organizationIdReference(),
  ...changedAt(),
});

export const customerIdReference = () => ({
  customer_id: uuid('customer_id')
    .notNull()
    .references(() => customers.id),
});

export type Customer = InferSelectModel<typeof customers>;
export type NewCustomer = InferInsertModel<typeof customers>;

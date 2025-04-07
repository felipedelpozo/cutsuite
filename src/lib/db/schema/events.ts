import { type InferInsertModel, type InferSelectModel } from 'drizzle-orm';
import { boolean, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

import { organizationIdReference } from '@/lib/db/schema//organizations';
import { customerIdReference } from '@/lib/db/schema/customers';
import { memberIdReference } from '@/lib/db/schema/members';
import { changedAt } from '@/lib/db/utils';

export const events = pgTable('event', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  start: timestamp('start').notNull(),
  end: timestamp('end').notNull(),
  allDay: boolean('allDay').default(false),
  color: text('color').notNull(),
  ...organizationIdReference(),
  ...memberIdReference(),
  ...customerIdReference(),
  ...changedAt(),
});

export type Event = InferSelectModel<typeof events>;
export type NewEvent = InferInsertModel<typeof events>;

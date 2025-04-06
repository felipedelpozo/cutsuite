import { type InferInsertModel, type InferSelectModel } from 'drizzle-orm';
import { pgTable, text, uuid } from 'drizzle-orm/pg-core';

import { organizationIdReference } from '@/lib/db/schema/organizations';
import { changedAt } from '@/lib/db/utils';

export const subscriptions = pgTable('subscription', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  stripeCustomerId: text('stripeCustomerId'),
  stripeSubscriptionId: text('stripeSubscriptionId'),
  stripeProductId: text('stripeProductId'),
  planName: text('planName'),
  subscriptionStatus: text('subscriptionStatus').notNull(),
  ...organizationIdReference(),
  ...changedAt(),
});

export type Subscription = InferSelectModel<typeof subscriptions>;
export type NewSubscription = InferInsertModel<typeof subscriptions>;

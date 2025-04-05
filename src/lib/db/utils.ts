import { timestamp } from 'drizzle-orm/pg-core';

export const changedAt = () => ({
  createdAt: timestamp('created_at', { withTimezone: false }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: false })
    .defaultNow()
    .$onUpdate(() => new Date()),
});

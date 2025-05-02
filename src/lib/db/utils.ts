import { timestamp } from 'drizzle-orm/pg-core';

export const changedAt = () => ({
  createdAt: timestamp('createdAt', { withTimezone: false })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updatedAt', { withTimezone: false })
    .defaultNow()
    .$onUpdate(() => new Date()),
});

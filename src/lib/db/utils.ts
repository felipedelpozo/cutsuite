import { timestamp, uuid } from 'drizzle-orm/pg-core';

import { users } from '@/lib/db/schema/user';

export const changedAt = () => ({
  createdAt: timestamp('created_at', { withTimezone: false }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: false })
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const changedAtAndCreatedBy = () => ({
  ...changedAt(),
  createdBy: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
});

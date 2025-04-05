import { type InferInsertModel, type InferSelectModel } from 'drizzle-orm';
import {
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';

import { changedAt } from '@/lib/db/utils';

export const userRoleEnum = pgEnum('user_role', ['ADMIN', 'USER', 'GUEST']);

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
  GUEST = 'GUEST',
}

export const users = pgTable('user', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  name: text('name'),
  displayName: text('display_name'),
  email: text('email').unique(),
  emailVerified: timestamp('emailVerified', { mode: 'date' }),
  phoneNumber: text('phone_number').unique(),
  image: text('image'),
  role: userRoleEnum('role').default(UserRole.GUEST),
  preferences: jsonb('preferences').notNull().default('{}'),
  ...changedAt(),
});

export const userIdReference = () => ({
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
});

export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;

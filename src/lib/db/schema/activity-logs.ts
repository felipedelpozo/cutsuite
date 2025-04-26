import { type InferInsertModel, type InferSelectModel } from 'drizzle-orm';
import {
  pgEnum,
  pgTable,
  serial,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

import { organizationIdReference } from '@/lib/db/schema/organizations';

import { userIdReference } from './users';

export const activityTypeEnum = pgEnum('type', [
  'SIGN_UP',
  'SIGN_IN',
  'SIGN_OUT',
  'UPDATE_PASSWORD',
  'DELETE_ACCOUNT',
  'UPDATE_ACCOUNT',
  'CREATE_TEAM',
  'REMOVE_TEAM_MEMBER',
  'INVITE_TEAM_MEMBER',
  'ACCEPT_INVITATION',
]);

export enum ActivityType {
  SIGN_UP = 'SIGN_UP',
  SIGN_IN = 'SIGN_IN',
  SIGN_OUT = 'SIGN_OUT',
  UPDATE_PASSWORD = 'UPDATE_PASSWORD',
  DELETE_ACCOUNT = 'DELETE_ACCOUNT',
  UPDATE_ACCOUNT = 'UPDATE_ACCOUNT',
  CREATE_TEAM = 'CREATE_TEAM',
  REMOVE_TEAM_MEMBER = 'REMOVE_TEAM_MEMBER',
  INVITE_TEAM_MEMBER = 'INVITE_TEAM_MEMBER',
  ACCEPT_INVITATION = 'ACCEPT_INVITATION',
}

export const activityLogs = pgTable('activityLogs', {
  id: serial('id').primaryKey(),
  type: activityTypeEnum('role'),
  timestamp: timestamp('timestamp').notNull().defaultNow(),
  ipAddress: varchar('ipAddress', { length: 45 }),
  ...userIdReference(),
  ...organizationIdReference(),
});

export type ActivityLog = InferSelectModel<typeof activityLogs>;
export type NewActivityLog = InferInsertModel<typeof activityLogs>;

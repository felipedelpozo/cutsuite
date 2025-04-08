import { type InferInsertModel, type InferSelectModel } from 'drizzle-orm';
import { pgEnum, pgTable, text } from 'drizzle-orm/pg-core';

import { organizationIdReference } from '@/lib/db/schema//organizations';
import { serviceIdReference } from '@/lib/db/schema/services';
import { changedAt } from '@/lib/db/utils';

export const instanceStatusEnum = pgEnum('instance_status', [
  'CONNECT',
  'CONNECTED',
  'DISCONNECTED',
  'LOADING',
]);

export enum InstanceStatus {
  CONNECT = 'CONNECT',
  CONNECTED = 'CONNECTED',
  DISCONNECTED = 'DISCONNECTED',
  LOADING = 'LOADING',
}

export const instances = pgTable('instance', {
  id: text('id').primaryKey().notNull(),
  name: text('title').notNull(),
  status: instanceStatusEnum('status').default(InstanceStatus.DISCONNECTED),
  ...serviceIdReference(),
  ...organizationIdReference({ onDelete: 'cascade' }),
  ...changedAt(),
});

export type Instance = InferSelectModel<typeof instances>;
export type NewInstance = InferInsertModel<typeof instances>;

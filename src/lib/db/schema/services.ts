import { type InferInsertModel, type InferSelectModel } from 'drizzle-orm';
import {
  jsonb,
  pgEnum,
  pgTable,
  ReferenceConfig,
  text,
  uuid,
} from 'drizzle-orm/pg-core';

import { changedAt } from '@/lib/db/utils';

export const serviceStatusEnum = pgEnum('status', ['ACTIVE', 'DISABLED']);

export enum ServiceStatus {
  ACTIVE = 'ACTIVE',
  DISABLED = 'DISABLED',
}

export const services = pgTable('service', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  slug: text('slug').notNull().unique(),
  logo: text('logo'),
  status: serviceStatusEnum('status').default(ServiceStatus.DISABLED),
  params: jsonb('params').notNull().default('{}'),
  ...changedAt(),
});

export const serviceIdReference = (actions?: ReferenceConfig['actions']) => ({
  serviceId: uuid('serviceId')
    .notNull()
    .references(() => services.id, actions),
});

export type Service = InferSelectModel<typeof services>;
export type NewService = InferInsertModel<typeof services>;

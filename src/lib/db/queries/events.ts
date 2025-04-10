import { endOfDay, startOfDay } from 'date-fns';
import { and, desc, eq, gte, lte, SQLWrapper } from 'drizzle-orm';

import db from '@/lib/db';
import { events } from '@/lib/db/schema/events';

export type FindEventsByOrganizationIdParams = {
  organizationId: string;
  date: Date;
};

export const findEventsDaily = async ({
  organizationId,
  date,
}: FindEventsByOrganizationIdParams) => {
  if (!organizationId) {
    throw new Error('Organization ID is required');
  }

  const filters: SQLWrapper[] = [eq(events.organizationId, organizationId)];
  filters.push(gte(events.start, startOfDay(date)));
  filters.push(lte(events.start, endOfDay(date)));

  return await db
    .select()
    .from(events)
    .orderBy(desc(events.start))
    .where(and(...filters));
};

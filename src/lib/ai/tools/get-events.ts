import { tool } from 'ai';
import { z } from 'zod';

import { getOrganization } from '@/lib/db/queries';
import { findEventsDaily } from '@/lib/db/queries/events';

export const getEvents = tool({
  description: `get events for a specific date.`,
  parameters: z.object({
    date: z.string().describe('date'),
  }),
  execute: async ({ date }) => {
    const { id } = await getOrganization();

    const response = await findEventsDaily({
      organizationId: id,
      date: new Date(date),
    });

    console.log({ id, date, response });

    return response;
  },
});

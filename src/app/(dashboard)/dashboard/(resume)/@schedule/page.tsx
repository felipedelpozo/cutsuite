import { PageSearchParams } from '@/types';

import { getOrganization } from '@/lib/db/queries';
import { findEventsMonth } from '@/lib/db/queries/events';
import { loadSearchParams } from '@/lib/params/server';
import { EventCalendar } from '@/components/event-calendar/event-calendar';

type PageProps = PageSearchParams;

export default async function Page({ searchParams }: PageProps) {
  const organization = await getOrganization();
  const props = await loadSearchParams(searchParams);

  const events = await findEventsMonth({
    organizationId: organization.id,
    date: props.date,
  });

  return <EventCalendar events={events} className="h-full" />;
}

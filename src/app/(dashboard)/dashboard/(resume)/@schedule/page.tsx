import { getOrganization } from '@/lib/db/queries';
import { findEventsMonth } from '@/lib/db/queries/events';
import { getSearchParams, PageSearchParams } from '@/lib/params/server';
import { EventCalendar } from '@/components/event-calendar/event-calendar';

export default async function Page({ searchParams }: PageSearchParams) {
  const organization = await getOrganization();
  const props = await getSearchParams(searchParams);

  const events = await findEventsMonth({
    organizationId: organization.id,
    date: props.date,
  });

  return <EventCalendar events={events} className="h-full" />;
}

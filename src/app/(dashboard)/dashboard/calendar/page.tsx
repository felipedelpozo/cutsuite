import { PageSearchParams } from '@/types';

import { getOrganization } from '@/lib/db/queries';
import { findEventsMonth } from '@/lib/db/queries/events';
import { loadSearchParams } from '@/lib/params/server';
import { EventCalendar } from '@/components/event-calendar/event-calendar';
import { PageContainer } from '@/components/page-container';
import { SiteHeader } from '@/components/site-header';

type PageProps = PageSearchParams;

export default async function CalendarPage({ searchParams }: PageProps) {
  const organization = await getOrganization();
  const props = await loadSearchParams(searchParams);

  const events = await findEventsMonth({
    organizationId: organization.id,
    date: props.date,
  });

  return (
    <>
      <SiteHeader>
        <h1 className="text-base font-medium">Calendar</h1>
      </SiteHeader>
      <PageContainer>
        <EventCalendar events={events} />
      </PageContainer>
    </>
  );
}

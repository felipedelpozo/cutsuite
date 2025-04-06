'use client';

import { useState } from 'react';

import { sampleEvents } from '@/components/dashboard/sample-events';
import { EventCalendar, type CalendarEvent } from '@/components/event-calendar';

export default function Page() {
  const [events, setEvents] = useState<CalendarEvent[]>(sampleEvents);

  const handleEventAdd = (event: CalendarEvent) => {
    setEvents([...events, event]);
  };

  const handleEventUpdate = (updatedEvent: CalendarEvent) => {
    setEvents(
      events.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
  };

  const handleEventDelete = (eventId: string) => {
    setEvents(events.filter((event) => event.id !== eventId));
  };

  return (
    <div className="@container p-1 sm:w-full sm:p-4 md:max-w-sm">
      <EventCalendar
        events={events}
        onEventAdd={handleEventAdd}
        onEventUpdate={handleEventUpdate}
        onEventDelete={handleEventDelete}
        initialView="day"
        viewSelector={false}
      />
    </div>
  );
}

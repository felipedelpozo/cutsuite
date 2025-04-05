'use client';

import { useState } from 'react';

import { sampleEvents } from '@/components/dashboard/sample-events';
import { EventCalendar, type CalendarEvent } from '@/components/event-calendar';

export default function Home() {
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
    <div className="flex flex-col p-1 sm:p-4">
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

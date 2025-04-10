import type { Event, NewEvent } from '@/lib/db/schema/events';

export type CalendarView = 'month' | 'week' | 'day' | 'agenda';
export type CalendarEvent = Event;
export type NewCalendarEvent = NewEvent;

export type EventColor =
  | 'sky'
  | 'amber'
  | 'violet'
  | 'rose'
  | 'emerald'
  | 'orange';

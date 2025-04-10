import type { Event } from '@/lib/db/schema/events';

export type CalendarView = 'month' | 'week' | 'day' | 'agenda';

export type CalendarEvent = Event;

export type EventColor =
  | 'sky'
  | 'amber'
  | 'violet'
  | 'rose'
  | 'emerald'
  | 'orange';

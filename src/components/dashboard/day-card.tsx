'use client';

import { IconTrendingUp } from '@tabler/icons-react';

import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DayView } from '@/components/event-calendar/day-view';
import { CalendarEvent } from '@/components/event-calendar/types';

interface DayCardProps {
  events: CalendarEvent[];
}

export function DayCard(props: DayCardProps) {
  const handleOnEventSelect = (event: CalendarEvent) => {
    console.log('Event selected:', event);
  };

  const handleOnEventCreate = (startTime: Date) => {
    console.log('Event created:', startTime);
  };

  //   return (
  //     <Card className="@container/card">
  //       <CardHeader>
  //         <CardDescription>Total Revenue</CardDescription>
  //         <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
  //           $1,250.00
  //         </CardTitle>
  //         <CardAction>
  //           <Badge variant="outline">
  //             <IconTrendingUp />
  //             +12.5%
  //           </Badge>
  //         </CardAction>
  //       </CardHeader>
  //       <CardContent className="min-h-[400px]">
  //         <DayView
  //           currentDate={new Date()}
  //           events={props.events}
  //           onEventSelect={handleOnEventSelect}
  //           onEventCreate={handleOnEventCreate}
  //         />
  //       </CardContent>
  //     </Card>
  //   );

  return (
    <DayView
      currentDate={new Date()}
      events={props.events}
      onEventSelect={handleOnEventSelect}
      onEventCreate={handleOnEventCreate}
    />
  );
}

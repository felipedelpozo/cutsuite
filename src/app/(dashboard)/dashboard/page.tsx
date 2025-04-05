import { DayCard } from '@/components/dashboard/day-card';
import { sampleEvents } from '@/components/dashboard/sample-events';

export default function Page() {
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <div className="px-4 lg:px-6">
        <DayCard currentDate={new Date()} events={sampleEvents} />
      </div>
    </div>
  );
}

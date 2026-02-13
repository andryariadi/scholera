import { Ellipsis } from "lucide-react";
import EvCalendar from "./EvCalendar";
import EventList from "./EventList";
import { Suspense } from "react";
import EventListSkeleton from "./skeletons/EventListSkeleton";

const EvCalendarContainer = ({ searchParams }: { searchParams: Promise<{ date?: string }> }) => {
  return (
    <div className="bg-white shadow-xs w-fulll p-4 rounded-xl space-y-3">
      {/* Calendar */}
      <EvCalendar />

      {/* Title */}
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Events</h1>
        <Ellipsis size={16} />
      </div>

      {/* List of events */}
      <div className="flex flex-col gap-4">
        <Suspense fallback={<EventListSkeleton />}>
          <EventList searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
};

export default EvCalendarContainer;

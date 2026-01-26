import EventListContent from "@/components/EventListContent";
import FormModal from "@/components/FormModal";
import TableSearchSkeleton from "@/components/skeletons/SearchBarSkeleton";
import { TeacherListSkeleton } from "@/components/skeletons/TeacherTableSkeleton";
import TableFilter from "@/components/TableFilter";
import TableSearch from "@/components/TableSearch";
import TableSort from "@/components/TableSort";
import { eventFilterConfig } from "@/libs/config/filter-configs";
import { eventSortOptions } from "@/libs/config/sort-config";
import { Suspense } from "react";

export interface EventListPageProps {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    search?: string;
    title?: string;
    class?: "MALE" | "FEMALE";
    sortBy?: "title" | "class" | "date" | "startTime" | "endTime";
    sortOrder?: "asc" | "desc";
  }>;
}

const EventListPage = ({ searchParams }: EventListPageProps) => {
  const role = "admin";

  return (
    <section className="bg-white p-4 rounded-lg space-y-5 shadow-sm">
      {/* Top - Header */}
      <div className="b-rose-500 flex items-center justify-between">
        {/* Title */}
        <h1 className="hidden md:block text-lg font-semibold">All Events</h1>

        {/* Actions Button */}
        <div className="w-full md:w-auto flex flex-col md:flex-row items-center gap-4">
          {/* Search */}
          <Suspense fallback={<TableSearchSkeleton />}>
            <TableSearch />
          </Suspense>

          <div className="flex items-center gap-4 self-end">
            <TableFilter filters={eventFilterConfig} title="Event Filters" />

            <TableSort options={eventSortOptions} />

            {/* Modal Button */}
            {role === "admin" && <FormModal table="event" type="create" />}
          </div>
        </div>
      </div>

      {/* Event List */}
      <Suspense fallback={<TeacherListSkeleton />}>
        <EventListContent searchParams={searchParams} />
      </Suspense>
    </section>
  );
};

export default EventListPage;

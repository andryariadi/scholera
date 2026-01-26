import FormModal from "@/components/FormModal";
import TableSearchSkeleton from "@/components/skeletons/SearchBarSkeleton";
import { TeacherListSkeleton } from "@/components/skeletons/TeacherTableSkeleton";
import TableFilter from "@/components/TableFilter";
import TableSearch from "@/components/TableSearch";
import TableSort from "@/components/TableSort";
import { announcementFilterConfig } from "@/libs/config/filter-configs";
import { announcementSortOptions } from "@/libs/config/sort-config";
import { Suspense } from "react";

export interface AnnouncementListPageProps {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    search?: string;
    title?: string;
    class?: string;
    sortBy?: "title" | "class" | "date";
    sortOrder?: "asc" | "desc";
  }>;
}

const AnnouncementListPage = ({ searchParams }: AnnouncementListPageProps) => {
  const role = "admin";

  return (
    <section className="bg-white p-4 rounded-lg space-y-5 shadow-sm">
      {/* Top - Header */}
      <div className="b-rose-500 flex items-center justify-between">
        {/* Title */}
        <h1 className="hidden md:block text-lg font-semibold">All Announcements</h1>

        {/* Actions Button */}
        <div className="w-full md:w-auto flex flex-col md:flex-row items-center gap-4">
          {/* Search */}
          <Suspense fallback={<TableSearchSkeleton />}>
            <TableSearch />
          </Suspense>

          <div className="flex items-center gap-4 self-end">
            <TableFilter filters={announcementFilterConfig} title="Announcement Filters" />

            <TableSort options={announcementSortOptions} />

            {/* Modal Button */}
            {role === "admin" && <FormModal table="announcement" type="create" />}
          </div>
        </div>
      </div>

      {/* Announcement List */}
      <Suspense fallback={<TeacherListSkeleton />}>
        <AnnouncementListPage searchParams={searchParams} />
      </Suspense>
    </section>
  );
};

export default AnnouncementListPage;

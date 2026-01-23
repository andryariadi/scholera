import FormModal from "@/components/FormModal";
import TableSearchSkeleton from "@/components/skeletons/SearchBarSkeleton";
import { TeacherListSkeleton } from "@/components/skeletons/TeacherTableSkeleton";
import TableSearch from "@/components/TableSearch";
import { TeacherListContent } from "@/components/TeacherListContent";
import { Suspense } from "react";
import TableFilter from "@/components/TableFilter";
import { teacherFilterConfig } from "@/libs/config/filter-configs";
import TableSort from "@/components/TableSort";
import { teacherSortOptions } from "@/libs/config/sort-config";

export interface TeacherListPageProps {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    search?: string;
    subject?: string;
    sex?: "MALE" | "FEMALE";
    bloodType?: string;
    sortBy?: "name" | "surname" | "class" | "createdAt";
    sortOrder?: "asc" | "desc";
  }>;
}

export default function TeacherListPage({ searchParams }: TeacherListPageProps) {
  const role = "admin";

  return (
    <section className="bg-white shadow-xs p-4 rounded-lg space-y-5">
      {/* Top - Header */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Teachers</h1>

        {/* Search & Actions */}
        <div className="w-full md:w-auto flex flex-col md:flex-row items-center gap-4">
          <Suspense fallback={<TableSearchSkeleton />}>
            <TableSearch />
          </Suspense>

          <div className="flex items-center gap-4 self-end">
            <TableFilter filters={teacherFilterConfig} title="Teacher Filters" />

            <TableSort options={teacherSortOptions} />

            {/* Modal Button */}
            {role === "admin" && <FormModal table="teacher" type="create" />}
          </div>
        </div>
      </div>

      {/* Teacher List */}
      <Suspense fallback={<TeacherListSkeleton />}>
        <TeacherListContent searchParams={searchParams} />
      </Suspense>
    </section>
  );
}

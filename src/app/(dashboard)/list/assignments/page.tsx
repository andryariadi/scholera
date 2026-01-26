import AssignmentListContent from "@/components/AssignmentListContent";
import FormModal from "@/components/FormModal";
import TableSearchSkeleton from "@/components/skeletons/SearchBarSkeleton";
import { TeacherListSkeleton } from "@/components/skeletons/TeacherTableSkeleton";
import TableFilter from "@/components/TableFilter";
import TableSearch from "@/components/TableSearch";
import TableSort from "@/components/TableSort";
import { assignmentFilterConfig } from "@/libs/config/filter-configs";
import { assignmentSortOptions } from "@/libs/config/sort-config";
import { Suspense } from "react";

export interface AssignmentListPageProps {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    search?: string;
    lesson?: string;
    subject?: string;
    class?: string;
    teacher?: string;
    result?: string;
    sortBy?: "title" | "lesson" | "subject" | "class" | "teacher" | "startTime";
    sortOrder?: "asc" | "desc";
  }>;
}

const AssignmentListPage = ({ searchParams }: AssignmentListPageProps) => {
  const role = "admin";

  return (
    <section className="bg-white p-4 rounded-lg space-y-5 shadow-sm">
      {/* Top - Header */}
      <div className="b-rose-500 flex items-center justify-between">
        {/* Title */}
        <h1 className="hidden md:block text-lg font-semibold">All Assignments</h1>

        {/* Actions Button */}
        <div className="w-full md:w-auto flex flex-col md:flex-row items-center gap-4">
          {/* Search */}
          <Suspense fallback={<TableSearchSkeleton />}>
            <TableSearch />
          </Suspense>

          <div className="flex items-center gap-4 self-end">
            {/* Filter Button */}
            <TableFilter filters={assignmentFilterConfig} title="Assignment Filters" />

            <TableSort options={assignmentSortOptions} />

            {/* Modal Button */}
            {role === "admin" && <FormModal table="assignment" type="create" />}
          </div>
        </div>
      </div>

      {/* Assignment List */}
      <Suspense fallback={<TeacherListSkeleton />}>
        <AssignmentListContent searchParams={searchParams} />
      </Suspense>
    </section>
  );
};

export default AssignmentListPage;

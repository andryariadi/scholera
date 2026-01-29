import ExamListContent from "@/components/ExamListContent";
import FormModal from "@/components/FormModal";
import TableSearchSkeleton from "@/components/skeletons/SearchBarSkeleton";
import { TeacherListSkeleton } from "@/components/skeletons/TeacherTableSkeleton";
import TableFilter from "@/components/TableFilter";
import TableSearch from "@/components/TableSearch";
import TableSort from "@/components/TableSort";
import { examFilterConfig } from "@/libs/config/filter-configs";
import { examSortOptions } from "@/libs/config/sort-config";
import { Suspense } from "react";

export interface ExamListPageProps {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    search?: string;
    lesson?: string;
    subject?: string;
    class?: string;
    classId?: string;
    teacher?: string;
    result?: string;
    sortBy?: "title" | "lesson" | "subject" | "class" | "teacher" | "startTime";
    sortOrder?: "asc" | "desc";
  }>;
}

const ExamListPage = ({ searchParams }: ExamListPageProps) => {
  const role = "admin";

  return (
    <section className="bg-white p-4 rounded-lg space-y-5 shadow-sm">
      {/* Top - Header */}
      <div className="b-rose-500 flex items-center justify-between">
        {/* Title */}
        <h1 className="hidden md:block text-lg font-semibold">All Exams</h1>

        {/* Actions Button */}
        <div className="w-full md:w-auto flex flex-col md:flex-row items-center gap-4">
          {/* Search */}
          <Suspense fallback={<TableSearchSkeleton />}>
            <TableSearch />
          </Suspense>

          <div className="flex items-center gap-4 self-end">
            <TableFilter filters={examFilterConfig} title="Exam Filters" />

            <TableSort options={examSortOptions} />

            {/* Modal Button */}
            {role === "admin" && <FormModal table="exam" type="create" />}
          </div>
        </div>
      </div>

      {/* Exam List */}
      <Suspense fallback={<TeacherListSkeleton />}>
        <ExamListContent searchParams={searchParams} />
      </Suspense>
    </section>
  );
};

export default ExamListPage;

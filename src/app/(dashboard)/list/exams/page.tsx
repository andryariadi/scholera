import ExamListContent from "@/components/ExamListContent";
import FormModal from "@/components/FormModal";
import TableSearchSkeleton from "@/components/skeletons/SearchBarSkeleton";
import { TeacherListSkeleton } from "@/components/skeletons/TeacherTableSkeleton";
import TableFilter from "@/components/TableFilter";
import TableSearch from "@/components/TableSearch";
import TableSort from "@/components/TableSort";
import { examFilterConfig } from "@/libs/config/filter-configs";
import { examSortOptions } from "@/libs/config/sort-config";
import { UserRole } from "@/libs/types/prisma-schema";
import { getCurrentUserRole } from "@/libs/utils";
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
  currentUserId?: string | null;
  currentUserRole?: UserRole | null;
}

const ExamListPage = async ({ searchParams }: ExamListPageProps) => {
  const userRes = await getCurrentUserRole();
  const role = userRes?.role;
  const userId = userRes?.userId;

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
            {(role === "admin" || role === "teacher") && <FormModal table="exam" type="create" />}
          </div>
        </div>
      </div>

      {/* Exam List */}
      <Suspense fallback={<TeacherListSkeleton />}>
        <ExamListContent searchParams={searchParams} currentUserRole={role} currentUserId={userId} />
      </Suspense>
    </section>
  );
};

export default ExamListPage;

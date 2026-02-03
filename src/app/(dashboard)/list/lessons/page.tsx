import FormModal from "@/components/FormModal";
import LessonListContent from "@/components/LessonListContent";
import TableSearchSkeleton from "@/components/skeletons/SearchBarSkeleton";
import { TeacherListSkeleton } from "@/components/skeletons/TeacherTableSkeleton";
import TableFilter from "@/components/TableFilter";
import TableSearch from "@/components/TableSearch";
import TableSort from "@/components/TableSort";
import { lessonFilterConfig } from "@/libs/config/filter-configs";
import { lessonSortOptions } from "@/libs/config/sort-config";
import { UserRole } from "@/libs/types/prisma-schema";
import { getCurrentUserRole } from "@/libs/utils";
import { Suspense } from "react";

export interface LessonListPageProps {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    search?: string;
    name?: string;
    day?: string;
    teacher?: string;
    class?: string;
    classId?: string;
    sortBy?: "name" | "class" | "teacher";
    sortOrder?: "asc" | "desc";
  }>;
  currentUserId?: string | null;
  currentUserRole?: UserRole | null;
}

const LessonListPage = async ({ searchParams }: LessonListPageProps) => {
  const userRes = await getCurrentUserRole();
  const role = userRes?.role;
  const userId = userRes?.userId;

  return (
    <section className="bg-white p-4 rounded-lg space-y-5 shadow-sm">
      {/* Top - Header */}
      <div className="b-rose-500 flex items-center justify-between">
        {/* Title */}
        <h1 className="hidden md:block text-lg font-semibold">All Lessons</h1>

        {/* Actions Button */}
        <div className="w-full md:w-auto flex flex-col md:flex-row items-center gap-4">
          {/* Search */}
          <Suspense fallback={<TableSearchSkeleton />}>
            <TableSearch />
          </Suspense>

          <div className="flex items-center gap-4 self-end">
            {/* Filter Button */}
            <TableFilter filters={lessonFilterConfig} title="Lesson Filters" />

            <TableSort options={lessonSortOptions} />

            {/* Modal Button */}
            {role === "admin" && <FormModal table="lesson" type="create" />}
          </div>
        </div>
      </div>

      {/* Lesson List */}
      <Suspense fallback={<TeacherListSkeleton />}>
        <LessonListContent searchParams={searchParams} currentUserId={userId} currentUserRole={role} />
      </Suspense>
    </section>
  );
};

export default LessonListPage;

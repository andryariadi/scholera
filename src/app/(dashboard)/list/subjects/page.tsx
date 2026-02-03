import FormModal from "@/components/FormModal";
import TableSearchSkeleton from "@/components/skeletons/SearchBarSkeleton";
import { TeacherListSkeleton } from "@/components/skeletons/TeacherTableSkeleton";
import SubjectListContent from "@/components/SubjectListContent";
import TableFilter from "@/components/TableFilter";
import TableSearch from "@/components/TableSearch";
import TableSort from "@/components/TableSort";
import { subjectFilterConfig } from "@/libs/config/filter-configs";
import { subjectSortOptions } from "@/libs/config/sort-config";
import { UserRole } from "@/libs/types/prisma-schema";
import { getCurrentUserRole } from "@/libs/utils";
import { Suspense } from "react";

export interface SubjectListPageProps {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    search?: string;
    name?: string;
    teacher?: string;
    lesson?: string;
    sortBy?: "name";
    sortOrder?: "asc" | "desc";
  }>;
  currentUserId?: string | null;
  currentUserRole?: UserRole | null;
}

const SubjectListPage = async ({ searchParams }: SubjectListPageProps) => {
  const userRes = await getCurrentUserRole();
  const role = userRes?.role;
  const userId = userRes?.userId;

  return (
    <section className="bg-white p-4 rounded-lg space-y-5 shadow-sm">
      {/* Top - Header */}
      <div className="b-rose-500 flex items-center justify-between">
        {/* Title */}
        <h1 className="hidden md:block text-lg font-semibold">All Subjects</h1>

        {/* Actions Button */}
        <div className="w-full md:w-auto flex flex-col md:flex-row items-center gap-4">
          {/* Search */}
          <Suspense fallback={<TableSearchSkeleton />}>
            <TableSearch />
          </Suspense>

          <div className="flex items-center gap-4 self-end">
            <TableFilter filters={subjectFilterConfig} title="Subject Filters" />

            <TableSort options={subjectSortOptions} />

            {/* Modal Button */}
            {role === "admin" && <FormModal table="subject" type="create" />}
          </div>
        </div>
      </div>

      {/* Subjects List */}
      <Suspense fallback={<TeacherListSkeleton />}>
        <SubjectListContent searchParams={searchParams} currentUserId={userId} currentUserRole={role} />
      </Suspense>
    </section>
  );
};

export default SubjectListPage;

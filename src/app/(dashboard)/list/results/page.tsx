import FormModal from "@/components/FormModal";
import ResultListContent from "@/components/ResultListContent";
import TableSearchSkeleton from "@/components/skeletons/SearchBarSkeleton";
import { TeacherListSkeleton } from "@/components/skeletons/TeacherTableSkeleton";
import TableFilter from "@/components/TableFilter";
import TableSearch from "@/components/TableSearch";
import TableSort from "@/components/TableSort";
import { resultFilterConfig } from "@/libs/config/filter-configs";
import { resultSortOptions } from "@/libs/config/sort-config";
import { UserRole } from "@/libs/types/prisma-schema";
import { getCurrentUserRole } from "@/libs/utils";
import { Suspense } from "react";

export interface ResultListPageProps {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    search?: string;
    student?: string;
    subject?: string;
    class?: string;
    teacher?: string;
    sortBy?: "score" | "student" | "subject" | "class" | "teacher";
    sortOrder?: "asc" | "desc";
  }>;
  currentUserId?: string | null;
  currentUserRole?: UserRole | null;
}

const ResultListPage = async ({ searchParams }: ResultListPageProps) => {
  const userRes = await getCurrentUserRole();
  const role = userRes?.role;
  const userId = userRes?.userId;

  return (
    <section className="bg-white p-4 rounded-lg space-y-5 shadow-sm">
      {/* Top - Header */}
      <div className="b-rose-500 flex items-center justify-between">
        {/* Title */}
        <h1 className="hidden md:block text-lg font-semibold">All Results</h1>

        {/* Actions Button */}
        <div className="w-full md:w-auto flex flex-col md:flex-row items-center gap-4">
          {/* Search */}
          <Suspense fallback={<TableSearchSkeleton />}>
            <TableSearch />
          </Suspense>

          <div className="flex items-center gap-4 self-end">
            <TableFilter filters={resultFilterConfig} title="Results Filters" />

            <TableSort options={resultSortOptions} />

            {/* Modal Button */}
            {(role === "admin" || role === "teacher") && <FormModal table="result" type="create" />}
          </div>
        </div>
      </div>

      {/* Result List */}
      <Suspense fallback={<TeacherListSkeleton />}>
        <ResultListContent searchParams={searchParams} currentUserId={userId} currentUserRole={role} />
      </Suspense>
    </section>
  );
};

export default ResultListPage;

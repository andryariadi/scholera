import FormModal from "@/components/FormModal";
import ParentListContent from "@/components/ParentListContent";
import TableSearchSkeleton from "@/components/skeletons/SearchBarSkeleton";
import { TeacherListSkeleton } from "@/components/skeletons/TeacherTableSkeleton";
import TableFilter from "@/components/TableFilter";
import TableSearch from "@/components/TableSearch";
import TableSort from "@/components/TableSort";
import { parentFilterConfig } from "@/libs/config/filter-configs";
import { parentSortOptions } from "@/libs/config/sort-config";
import { UserRole } from "@/libs/types/prisma-schema";
import { getCurrentUserRole } from "@/libs/utils";
import { Suspense } from "react";

export interface ParentListPageProps {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    search?: string;
    address?: string;
    email?: string;
    student?: string;
    sortBy?: "name" | "username" | "phone" | "address" | "email" | "createdAt";
    sortOrder?: "asc" | "desc";
  }>;
  currentUserId?: string | null;
  currentUserRole?: UserRole | null;
}

const ParentList = async ({ searchParams }: ParentListPageProps) => {
  const userRes = await getCurrentUserRole();
  const role = userRes?.role;
  const userId = userRes?.userId;

  return (
    <section className="bg-white shadow-xs p-4 rounded-lg space-y-5">
      {/* Top - Header */}
      <div className="flex items-center justify-between">
        {/* Title */}
        <h1 className="hidden md:block text-lg font-semibold">All Parents</h1>

        {/* Actions Button */}
        <div className="w-full md:w-auto flex flex-col md:flex-row items-center gap-4">
          {/* Search */}
          <Suspense fallback={<TableSearchSkeleton />}>
            <TableSearch />
          </Suspense>

          <div className="flex items-center gap-4 self-end">
            {/* Filter Button */}
            <TableFilter filters={parentFilterConfig} title="Parent Filters" />

            <TableSort options={parentSortOptions} />

            {/* Modal Button */}
            {role === "admin" && <FormModal table="parent" type="create" />}
          </div>
        </div>
      </div>

      {/* Parent List */}
      <Suspense fallback={<TeacherListSkeleton />}>
        <ParentListContent searchParams={searchParams} currentUserId={userId} currentUserRole={role} />
      </Suspense>
    </section>
  );
};

export default ParentList;

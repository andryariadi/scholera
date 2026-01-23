import ClassListContent from "@/components/ClassListContent";
import FormModal from "@/components/FormModal";
import TableSearchSkeleton from "@/components/skeletons/SearchBarSkeleton";
import { TeacherListSkeleton } from "@/components/skeletons/TeacherTableSkeleton";
import TableFilter from "@/components/TableFilter";
import TableSearch from "@/components/TableSearch";
import TableSort from "@/components/TableSort";
import { classFilterConfig } from "@/libs/config/filter-configs";
import { classSortOptions } from "@/libs/config/sort-config";
import { Filter, SortDesc } from "lucide-react";
import { Suspense } from "react";

export interface ClassListPageProps {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    search?: string;
    capacity?: number;
    grade?: string;
    sortBy?: "name" | "grade" | "capacity";
    sortOrder?: "asc" | "desc";
  }>;
}

const ClassListPage = ({ searchParams }: ClassListPageProps) => {
  const role = "admin";

  return (
    <section className="bg-white p-4 rounded-lg space-y-5 shadow-sm">
      {/* Top - Header */}
      <div className="b-rose-500 flex items-center justify-between">
        {/* Title */}
        <h1 className="hidden md:block text-lg font-semibold">All Classes</h1>

        {/* Actions Button */}
        <div className="w-full md:w-auto flex flex-col md:flex-row items-center gap-4">
          {/* Search */}
          <Suspense fallback={<TableSearchSkeleton />}>
            <TableSearch />
          </Suspense>

          <div className="flex items-center gap-4 self-end">
            {/* Filter Button */}
            <TableFilter filters={classFilterConfig} title="Class Filters" />

            <TableSort options={classSortOptions} />

            {/* Modal Button */}
            {role === "admin" && (
              // <button className="action-btn">
              //   <Plus size={14} />
              // </button>
              <FormModal table="class" type="create" />
            )}
          </div>
        </div>
      </div>

      {/* Class List */}
      <Suspense fallback={<TeacherListSkeleton />}>
        <ClassListContent searchParams={searchParams} />
      </Suspense>
    </section>
  );
};

export default ClassListPage;

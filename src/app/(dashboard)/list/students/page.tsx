import FormModal from "@/components/FormModal";
import TableSearchSkeleton from "@/components/skeletons/SearchBarSkeleton";
import { TeacherListSkeleton } from "@/components/skeletons/TeacherTableSkeleton";
import StudentListContent from "@/components/StudentListContent";
import TableFilter from "@/components/TableFilter";
import TableSearch from "@/components/TableSearch";
import TableSort from "@/components/TableSort";
import { studentFilterConfig } from "@/libs/config/filter-configs";
import { studentSortOptions } from "@/libs/config/sort-config";
import { Suspense } from "react";

export interface StudentListPageProps {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    search?: string;
    studentId?: string;
    sex?: "MALE" | "FEMALE";
    grade?: string;
    class?: string;
    bloodType?: string;
    sortBy?: "name" | "grade" | "createdAt";
    sortOrder?: "asc" | "desc";
  }>;
}

const StudentListPage = ({ searchParams }: StudentListPageProps) => {
  const role = "admin";

  return (
    <section className="bg-white  shadow-sm p-4 rounded-lg space-y-5">
      {/* Top - Header */}
      <div className="flex items-center justify-between">
        {/* Title */}
        <h1 className="hidden md:block text-lg font-semibold">All Students</h1>

        {/* Actions Button */}
        <div className="w-full md:w-auto flex flex-col md:flex-row items-center gap-4">
          {/* Search */}
          <Suspense fallback={<TableSearchSkeleton />}>
            <TableSearch />
          </Suspense>

          <div className="flex items-center gap-4 self-end">
            <TableFilter filters={studentFilterConfig} title="Student Filters" />

            <TableSort options={studentSortOptions} />

            {/* Modal Button */}
            {role === "admin" && <FormModal table="student" type="create" />}
          </div>
        </div>
      </div>

      <Suspense fallback={<TeacherListSkeleton />}>
        <StudentListContent searchParams={searchParams} />
      </Suspense>
    </section>
  );
};

export default StudentListPage;

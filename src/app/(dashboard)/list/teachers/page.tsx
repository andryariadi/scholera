import FormModal from "@/components/FormModal";
import { TeacherListSkeleton } from "@/components/skeletons/TeacherTableSkeleton";
import TableSearch from "@/components/TableSearch";
import { TeacherListContent } from "@/components/TeacherListContent";
import { Filter, SortDesc } from "lucide-react";
import { Suspense } from "react";

interface TeacherListPageProps {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    search?: string;
    classId?: string;
    subjectId?: string;
    sex?: "MALE" | "FEMALE";
    bloodType?: string;
    sortBy?: "name" | "surname" | "email" | "createdAt";
    sortOrder?: "asc" | "desc";
  }>;
}

export default function TeacherListPage({ searchParams }: TeacherListPageProps) {
  const role = "admin";

  return (
    <section className="bg-white shadow-xs p-4 rounded-lg space-y-5">
      {/* Static Header - Langsung muncul */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Teachers</h1>

        {/* Search & Actions */}
        <div className="w-full md:w-auto flex flex-col md:flex-row items-center gap-4">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="action-btn">
              <Filter size={14} />
            </button>
            <button className="action-btn">
              <SortDesc size={14} />
            </button>
            {role === "admin" && <FormModal table="teacher" type="create" />}
          </div>
        </div>
      </div>

      {/* Dynamic Content - Stream dengan Suspense */}
      <Suspense fallback={<TeacherListSkeleton />}>
        <TeacherListContent searchParams={searchParams} />
      </Suspense>
    </section>
  );
}

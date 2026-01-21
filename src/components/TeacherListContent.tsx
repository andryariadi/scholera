import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import { getTeachers } from "@/libs/data/fetch-teachers";
import { TeacherList } from "@/libs/types/prisma-schema";
import { View } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface TeacherListContentProps {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    search?: string;
    classId?: string;
    subjectId?: string;
    sex?: "MALE" | "FEMALE";
    bloodType?: string;
    sortBy?: "name" | "surname" | "subjects" | "subjectCount" | "createdAt";
    sortOrder?: "asc" | "desc";
  }>;
}

export async function TeacherListContent({ searchParams }: TeacherListContentProps) {
  const params = await searchParams;

  const queryParams = {
    page: params.page ? parseInt(params.page) : 1,
    limit: params.limit ? parseInt(params.limit) : 10,
    search: params.search || "",
    classId: params.classId,
    subjectId: params.subjectId,
    sex: params.sex,
    bloodType: params.bloodType,
    sortBy: params.sortBy || "createdAt",
    sortOrder: params.sortOrder || "desc",
  };

  const teachersRes = await getTeachers(queryParams);

  const role = "admin";

  const columns = [
    { header: "Info", accessor: "info" },
    { header: "Teacher ID", accessor: "teacherId", className: "hidden md:table-cell" },
    { header: "Subjects", accessor: "subjects", className: "hidden md:table-cell" },
    { header: "Classes", accessor: "classes", className: "hidden md:table-cell" },
    { header: "Phone", accessor: "phone", className: "hidden lg:table-cell" },
    { header: "Address", accessor: "address", className: "hidden lg:table-cell" },
    ...(role === "admin" ? [{ header: "Actions", accessor: "action" }] : []),
  ];

  const renderRow = (item: TeacherList) => (
    <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-scholera-purple-light">
      <td className="flex items-center gap-4 p-4">
        <Image src={item?.img || "/avatar.png"} alt={item.username} width={40} height={40} className="md:hidden xl:block w-10 h-10 rounded-full object-cover" />
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-xs text-gray-500">{item?.email}</p>
        </div>
      </td>
      <td className="hidden md:table-cell">{item.id}</td>
      <td className="hidden md:table-cell">{item.subjects.map((subject) => subject.name).join(", ")}</td>
      <td className="hidden md:table-cell">{item.classes.map((classItem) => classItem.name).join(", ")}</td>
      <td className="hidden md:table-cell">{item.phone}</td>
      <td className="hidden md:table-cell">{item.address}</td>
      <td>
        <div className="flex items-center gap-2">
          <Link href={`/list/teachers/${item.id}`}>
            <button className="action-btn-table bg-scholera-sky">
              <View size={16} />
            </button>
          </Link>

          {role === "admin" && <FormModal table="teacher" type="delete" id={item.id} />}
        </div>
      </td>
    </tr>
  );

  return (
    <>
      {/* Table */}
      <Table columns={columns} data={teachersRes.data} renderRow={renderRow} />

      {/* Pagination */}
      <Pagination
        total={teachersRes.pagination.total}
        page={teachersRes.pagination.page}
        limit={teachersRes.pagination.limit}
        totalPages={teachersRes.pagination.totalPages}
        hasNext={teachersRes.pagination.hasNext}
        hasPrev={teachersRes.pagination.hasPrev}
      />
    </>
  );
}

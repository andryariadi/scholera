import { View } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import FormModal from "./FormModal";
import Table from "./Table";
import Pagination from "./Pagination";
import { StudentListPageProps } from "@/app/(dashboard)/list/students/page";
import { getStudents } from "@/libs/data/fetch-students";
import { StudentList } from "@/libs/types/prisma-schema";

const StudentListContent = async ({ searchParams }: StudentListPageProps) => {
  const params = await searchParams;

  const queryParams = {
    page: params.page ? parseInt(params.page) : 1,
    limit: params.limit ? parseInt(params.limit) : 10,
    search: params.search || "",
    studentId: params.studentId,
    sex: params.sex,
    grade: params.grade,
    class: params.class,
    teacher: params.teacher,
    sortBy: params.sortBy || "createdAt",
    sortOrder: params.sortOrder || "desc",
  };

  const students = await getStudents(queryParams);

  const role = "admin";

  const columns = [
    {
      header: "Info",
      accessor: "info",
    },
    {
      header: "Student ID",
      accessor: "studentId",
      className: "hidden md:table-cell",
    },
    {
      header: "Sex",
      accessor: "sex",
      className: "hidden md:table-cell",
    },
    {
      header: "Grade",
      accessor: "grade",
      className: "hidden md:table-cell",
    },
    {
      header: "Phone",
      accessor: "phone",
      className: "hidden lg:table-cell",
    },
    {
      header: "Address",
      accessor: "address",
      className: "hidden lg:table-cell",
    },
    {
      header: "Actions",
      accessor: "action",
    },
  ];

  const renderRow = (item: StudentList) => (
    <tr key={item.id} className="b-sky-600 border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-scholera-purple-light">
      {/* Info */}
      <td className="flex items-center gap-4 p-4">
        <Image src={item.img || "/avatar.png"} alt="" width={40} height={40} className="md:hidden xl:block w-10 h-10 rounded-full object-cover" />

        <div className="flex flex-col">
          <h3 className="font-semibold">{item.name}</h3>
          <div className="flex items-center gap-2">
            {" "}
            <p className="text-xs text-gray-500">{item.class.name}</p>
            <p className="text-xs text-gray-500">{item.class.supervisor.name}</p>
          </div>
        </div>
      </td>
      {/* Student-ID */}
      <td className="hidden md:table-cell">{item.id}</td>
      {/* Sex */}
      <td className="hidden md:table-cell">{item.sex.toLowerCase()}</td>
      {/* Grade */}
      <td className="hidden md:table-cell">{item.grade.level}</td>
      {/* Phone */}
      <td className="hidden md:table-cell">{item.phone}</td>
      {/* Address */}
      <td className="hidden md:table-cell">{item.address}</td>
      {/* Actions */}
      <td>
        <div className="flex items-center gap-2">
          {/* View */}
          <Link href={`/list/students/${item.id}`}>
            <button className="action-btn-table bg-scholera-sky">
              <View size={16} />
            </button>
          </Link>

          {/* Delete */}
          {role === "admin" && <FormModal table="student" type="delete" id={item.id} />}
        </div>
      </td>
    </tr>
  );

  return (
    <>
      {/* Middle - Table */}
      <Table columns={columns} data={students.data} renderRow={renderRow} />

      {/* Bottom - Pagination */}
      <Pagination total={students.pagination.total} page={students.pagination.page} limit={students.pagination.limit} totalPages={students.pagination.totalPages} hasNext={students.pagination.hasNext} hasPrev={students.pagination.hasPrev} />
    </>
  );
};

export default StudentListContent;

import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { studentData } from "@/libs/constants";
import { Filter, Plus, SortDesc, Trash, View } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const StudentList = () => {
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

  const renderRow = (item: Student) => (
    <tr key={item.id} className="b-sky-600 border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-scholera-purple-light">
      {/* Info */}
      <td className="flex items-center gap-4 p-4">
        <Image src={item.photo} alt="" width={40} height={40} className="md:hidden xl:block w-10 h-10 rounded-full object-cover" />

        <div className="flex flex-col">
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-xs text-gray-500">{item.class}</p>
        </div>
      </td>
      {/* Student-ID */}
      <td className="hidden md:table-cell">{item.studentId}</td>
      {/* Grade */}
      <td className="hidden md:table-cell">{item.grade}</td>
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
          {role === "admin" && (
            <button className="action-btn-table bg-scholera-purple">
              <Trash size={16} />
            </button>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <section className="bg-white p-4 rounded-lg space-y-5 shadow-sm">
      {/* Top - Header */}
      <div className="b-rose-500 flex items-center justify-between">
        {/* Title */}
        <h1 className="hidden md:block text-lg font-semibold">All Students</h1>

        {/* Actions Button */}
        <div className="w-full md:w-auto flex flex-col md:flex-row items-center gap-4">
          {/* Search */}
          <TableSearch />

          <div className="flex items-center gap-4 self-end">
            {/* Filter Button */}
            <button className="action-btn">
              <Filter size={14} />
            </button>

            {/* Sort Button */}
            <button className="action-btn">
              <SortDesc size={14} />
            </button>

            {/* Modal Button */}

            {role === "admin" && (
              <button className="action-btn">
                <Plus size={14} />
              </button>
              //   <FormModal table="teacher" type="create"/>
            )}
          </div>
        </div>
      </div>

      {/* Middle - Table */}
      <Table columns={columns} data={studentData} renderRow={renderRow} />

      {/* Bottom - Pagination */}
      <Pagination />
    </section>
  );
};

export default StudentList;

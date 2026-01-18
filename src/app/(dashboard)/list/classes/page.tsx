import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { classesData } from "@/libs/constants";
import { Filter, SortDesc } from "lucide-react";

const ClassListPage = () => {
  const role = "admin";

  const columns = [
    {
      header: "Class Name",
      accessor: "name",
    },
    {
      header: "Capacity",
      accessor: "capacity",
      className: "hidden md:table-cell",
    },
    {
      header: "Grade",
      accessor: "grade",
      className: "hidden md:table-cell",
    },
    {
      header: "Supervisor",
      accessor: "supervisor",
      className: "hidden md:table-cell",
    },
    {
      header: "Actions",
      accessor: "action",
    },
  ];
  const renderRow = (item: Class) => (
    <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-scholera-purple-light">
      {/* Name */}
      <td className="flex items-center gap-4 p-4">{item.name}</td>
      {/* Capacity */}
      <td className="hidden md:table-cell">{item.capacity}</td>
      {/* Grade */}
      <td className="hidden md:table-cell">{item.grade}</td>
      {/* Supervisor */}
      <td className="hidden md:table-cell">{item.supervisor}</td>
      {/* Actions */}
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <FormModal table="class" type="update" data={item} />
              <FormModal table="class" type="delete" id={item.id} />
            </>
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
        <h1 className="hidden md:block text-lg font-semibold">All Classes</h1>

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
              // <button className="action-btn">
              //   <Plus size={14} />
              // </button>
              <FormModal table="class" type="create" />
            )}
          </div>
        </div>
      </div>

      {/* Middle - Table */}
      <Table columns={columns} data={classesData} renderRow={renderRow} />

      {/* Bottom - Pagination */}
      <Pagination />
    </section>
  );
};

export default ClassListPage;

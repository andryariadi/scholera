import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { parentsData } from "@/libs/constants";
import { Filter, SortDesc } from "lucide-react";

const ParentList = () => {
  const role = "admin";

  const columns = [
    {
      header: "Info",
      accessor: "info",
    },
    {
      header: "Student Names",
      accessor: "students",
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

  const renderRow = (item: Parent) => (
    <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-scholera-purple-light">
      {/* Info */}
      <td className="flex items-center gap-4 p-4">
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-xs text-gray-500">{item?.email}</p>
        </div>
      </td>
      {/* Students */}
      <td className="hidden md:table-cell">{item.students.join(",")}</td>
      {/* Phone */}
      <td className="hidden md:table-cell">{item.phone}</td>
      {/* Address */}
      <td className="hidden md:table-cell">{item.address}</td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <FormModal table="parent" type="update" data={item} />
              <FormModal table="parent" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <section className="bg-white shadow-xs p-4 rounded-lg space-y-5">
      {/* Top - Header */}
      <div className="flex items-center justify-between">
        {/* Title */}
        <h1 className="hidden md:block text-lg font-semibold">All Parents</h1>

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
              <FormModal table="parent" type="create" />
            )}
          </div>
        </div>
      </div>

      {/* Middle - Table */}
      <Table columns={columns} data={parentsData} renderRow={renderRow} />

      {/* Bottom - Pagination */}
      <Pagination />
    </section>
  );
};

export default ParentList;

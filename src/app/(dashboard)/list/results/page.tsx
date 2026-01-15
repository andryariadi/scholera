import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { resultsData } from "@/libs/constants";
import { Filter, Plus, SortDesc } from "lucide-react";

const ResultListPage = () => {
  const role = "admin";

  const columns = [
    {
      header: "Subject Name",
      accessor: "name",
    },
    {
      header: "Student",
      accessor: "student",
    },
    {
      header: "Score",
      accessor: "score",
      className: "hidden md:table-cell",
    },
    {
      header: "Teacher",
      accessor: "teacher",
      className: "hidden md:table-cell",
    },
    {
      header: "Class",
      accessor: "class",
      className: "hidden md:table-cell",
    },
    {
      header: "Date",
      accessor: "date",
      className: "hidden md:table-cell",
    },
    {
      header: "Actions",
      accessor: "action",
    },
  ];

  const renderRow = (item: Result) => (
    <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-scholera-purple-light">
      {/* Subject */}
      <td className="flex items-center gap-4 p-4">{item.subject}</td>
      {/* Student */}
      <td>{item.student}</td>
      {/* Score */}
      <td className="hidden md:table-cell">{item.score}</td>
      {/* Teacher */}
      <td className="hidden md:table-cell">{item.teacher}</td>
      {/* Class */}
      <td className="hidden md:table-cell">{item.class}</td>
      {/* Date */}
      <td className="hidden md:table-cell">{item.date}</td>
      {/* Actions */}
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" ||
            (role === "teacher" && (
              <>
                {/* <FormModal table="result" type="update" data={item} />
              <FormModal table="result" type="delete" id={item.id} /> */}
              </>
            ))}
        </div>
      </td>
    </tr>
  );

  return (
    <section className="bg-white p-4 rounded-lg space-y-5 shadow-sm">
      {/* Top - Header */}
      <div className="b-rose-500 flex items-center justify-between">
        {/* Title */}
        <h1 className="hidden md:block text-lg font-semibold">All Results</h1>

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
      <Table columns={columns} data={resultsData} renderRow={renderRow} />

      {/* Bottom - Pagination */}
      <Pagination />
    </section>
  );
};

export default ResultListPage;

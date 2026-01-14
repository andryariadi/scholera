import Pagination from "@/components/Pagination";
import TableSearch from "@/components/TableSearch";
import { Filter, Plus, SortDesc } from "lucide-react";

const TeacherList = () => {
  const role = "admin";

  return (
    <section className="bg-white p-4 rounded-md space-y-5 shadow-sm">
      {/* Top - Header */}
      <div className="bg-rose-500 flex items-center justify-between">
        {/* Title */}
        <h1 className="hidden md:block text-lg font-semibold">All Teachers</h1>

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
      <div className="bg-sky-500">andry</div>

      {/* Bottom - Pagination */}
      <Pagination />
    </section>
  );
};

export default TeacherList;

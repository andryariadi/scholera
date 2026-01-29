import { ClassListPageProps } from "@/app/(dashboard)/list/classes/page";
import { ClassList } from "@/libs/types/prisma-schema";
import FormModal from "./FormModal";
import Table from "./Table";
import Pagination from "./Pagination";
import { getClasses } from "@/libs/data/fetch-classes";

const ClassListContent = async ({ searchParams }: ClassListPageProps) => {
  const params = await searchParams;

  const queryParams = {
    page: params.page ? parseInt(params.page) : 1,
    limit: params.limit ? parseInt(params.limit) : 10,
    search: params.search || "",
    capacity: params.capacity,
    grade: params.grade,
    supervisor: params.supervisor,
    sortBy: params.sortBy || "name",
    sortOrder: params.sortOrder || "asc",
  };
  const classesRes = await getClasses(queryParams);

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

  const renderRow = (item: ClassList) => (
    <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-scholera-purple-light">
      {/* Name */}
      <td className="flex items-center gap-4 p-4">{item.name}</td>
      {/* Capacity */}
      <td className="hidden md:table-cell">{item.capacity}</td>
      {/* Grade */}
      <td className="hidden md:table-cell">{item.grade.level}</td>
      {/* Supervisor */}
      <td className="hidden md:table-cell">{item.supervisor.name}</td>
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
    <>
      {/* Middle - Table */}
      <Table columns={columns} data={classesRes.data} renderRow={renderRow} />

      {/* Bottom - Pagination */}
      <Pagination
        total={classesRes.pagination.total}
        page={classesRes.pagination.page}
        limit={classesRes.pagination.limit}
        totalPages={classesRes.pagination.totalPages}
        hasNext={classesRes.pagination.hasNext}
        hasPrev={classesRes.pagination.hasPrev}
      />
    </>
  );
};

export default ClassListContent;

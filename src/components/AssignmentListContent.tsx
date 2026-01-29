import { AssignmentList } from "@/libs/types/prisma-schema";
import FormModal from "./FormModal";
import Table from "./Table";
import Pagination from "./Pagination";
import { AssignmentListPageProps } from "@/app/(dashboard)/list/assignments/page";
import { getAssignments } from "@/libs/data/fetch.assignment";
import { formatDateISO } from "@/libs/utils";

const AssignmentListContent = async ({ searchParams }: AssignmentListPageProps) => {
  const params = await searchParams;

  const queryParams = {
    page: params.page ? parseInt(params.page) : 1,
    limit: params.limit ? parseInt(params.limit) : 10,
    search: params.search || "",
    lesson: params.lesson,
    subject: params.subject,
    class: params.class,
    classId: params.classId,
    teacher: params.teacher,
    result: params.result,
    sortBy: params.sortBy || "subject",
    sortOrder: params.sortOrder || "asc",
  };

  const assignmentsRes = await getAssignments(queryParams);

  const role = "admin";

  const columns = [
    {
      header: "Subject Name",
      accessor: "name",
    },
    {
      header: "Class",
      accessor: "class",
    },
    {
      header: "Teacher",
      accessor: "teacher",
      className: "hidden md:table-cell",
    },
    {
      header: "Due Date",
      accessor: "dueDate",
      className: "hidden md:table-cell",
    },
    {
      header: "Actions",
      accessor: "action",
    },
  ];

  const renderRow = (item: AssignmentList) => (
    <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-scholera-purple-light">
      {/* Subject */}
      <td className="flex items-center gap-4 p-4">{item.lesson.subject.name}</td>
      {/* Class */}
      <td>{item.lesson.class.name}</td>
      {/* Teacher */}
      <td className="hidden md:table-cell">{item.lesson.teacher.name}</td>
      {/* Due Date */}
      <td className="hidden md:table-cell">{formatDateISO(item.dueDate)}</td>
      {/* Actions */}
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <FormModal table="assignment" type="update" data={item} />
              <FormModal table="assignment" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <>
      {/* Middle - Table */}
      <Table columns={columns} data={assignmentsRes.data} renderRow={renderRow} />

      {/* Bottom - Pagination */}
      <Pagination
        total={assignmentsRes.pagination.total}
        page={assignmentsRes.pagination.page}
        limit={assignmentsRes.pagination.limit}
        totalPages={assignmentsRes.pagination.totalPages}
        hasNext={assignmentsRes.pagination.hasNext}
        hasPrev={assignmentsRes.pagination.hasPrev}
      />
    </>
  );
};

export default AssignmentListContent;

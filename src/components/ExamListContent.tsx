import { ExamList } from "@/libs/types/prisma-schema";
import FormModal from "./FormModal";
import Table from "./Table";
import Pagination from "./Pagination";
import { ExamListPageProps } from "@/app/(dashboard)/list/exams/page";
import { getExams } from "@/libs/data/fetch-exams";
import { formatDateISO } from "@/libs/utils";

const ExamListContent = async ({ searchParams, currentUserRole, currentUserId }: ExamListPageProps) => {
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
    currentUserRole,
    currentUserId,
  };

  const examsRes = await getExams(queryParams);

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
      header: "Date",
      accessor: "date",
      className: "hidden md:table-cell",
    },
    ...(currentUserRole === "admin" || currentUserRole === "teacher" ? [{ header: "Actions", accessor: "action" }] : []),
  ];

  const renderRow = (item: ExamList) => (
    <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-scholera-purple-light">
      {/* Subject */}
      <td className="flex items-center gap-4 p-4">{item.lesson.subject.name}</td>
      {/* Class */}
      <td>{item.lesson.class.name || "-"}</td>
      {/* Teacher */}
      <td className="hidden md:table-cell">{item.lesson.teacher.name}</td>
      {/* Date */}
      <td className="hidden md:table-cell">{formatDateISO(item.startTime)}</td>
      {/* Actions */}
      <td>
        <div className="flex items-center gap-2">
          {(currentUserRole === "admin" || currentUserRole === "teacher") && (
            <>
              <FormModal table="exam" type="update" data={item} />
              <FormModal table="exam" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <>
      {/* Middle - Table */}
      <Table columns={columns} data={examsRes.data} renderRow={renderRow} />

      {/* Bottom - Pagination */}
      <Pagination total={examsRes.pagination.total} page={examsRes.pagination.page} limit={examsRes.pagination.limit} totalPages={examsRes.pagination.totalPages} hasNext={examsRes.pagination.hasNext} hasPrev={examsRes.pagination.hasPrev} />
    </>
  );
};

export default ExamListContent;

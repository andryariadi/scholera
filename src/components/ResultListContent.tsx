import { ResultListPageProps } from "@/app/(dashboard)/list/results/page";
import FormModal from "./FormModal";
import Pagination from "./Pagination";
import Table from "./Table";
import { getResults } from "@/libs/data/fetch.results";
import { ResultList } from "@/libs/types/prisma-schema";
import { formatDateISO } from "@/libs/utils";

const ResultListContent = async ({ searchParams }: ResultListPageProps) => {
  const params = await searchParams;

  const queryParams = {
    page: params.page ? parseInt(params.page) : 1,
    limit: params.limit ? parseInt(params.limit) : 10,
    search: params.search || "",
    student: params.student,
    subject: params.subject,
    class: params.class,
    teacher: params.teacher,
    sortBy: params.sortBy || "subject",
    sortOrder: params.sortOrder || "asc",
  };

  const resultsRes = await getResults(queryParams);

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

  const renderRow = (item: ResultList) => (
    <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-scholera-purple-light">
      {/* Subject */}
      <td className="flex items-center gap-4 p-4">{item.assignment?.lesson.subject.name}</td>
      {/* Student */}
      <td>{item.student.name}</td>
      {/* Score */}
      <td className="hidden md:table-cell">{item.score}</td>
      {/* Teacher */}
      <td className="hidden md:table-cell">{item.assignment?.lesson.teacher.name}</td>
      {/* Class */}
      <td className="hidden md:table-cell">{item.assignment?.lesson.class.name}</td>
      {/* Date */}
      <td className="hidden md:table-cell">{formatDateISO(item.assignment?.dueDate)}</td>
      {/* Actions */}
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <FormModal table="result" type="update" data={item} />
              <FormModal table="result" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <>
      {/* Middle - Table */}
      <Table columns={columns} data={resultsRes.data} renderRow={renderRow} />

      {/* Bottom - Pagination */}
      <Pagination
        total={resultsRes.pagination.total}
        page={resultsRes.pagination.page}
        limit={resultsRes.pagination.limit}
        totalPages={resultsRes.pagination.totalPages}
        hasNext={resultsRes.pagination.hasNext}
        hasPrev={resultsRes.pagination.hasPrev}
      />
    </>
  );
};

export default ResultListContent;

import { LessonList } from "@/libs/types/prisma-schema";
import FormModal from "./FormModal";
import { LessonListPageProps } from "@/app/(dashboard)/list/lessons/page";
import Table from "./Table";
import Pagination from "./Pagination";
import { getLessons } from "@/libs/data/fetch.lessons";

const LessonListContent = async ({ searchParams }: LessonListPageProps) => {
  const params = await searchParams;

  const queryParams = {
    page: params.page ? parseInt(params.page) : 1,
    limit: params.limit ? parseInt(params.limit) : 10,
    search: params.search || "",
    name: params.name,
    day: params.day,
    teacher: params.teacher,
    class: params.class,
    sortBy: params.sortBy || "name",
    sortOrder: params.sortOrder || "asc",
  };

  const lessonsRes = await getLessons(queryParams);

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
      header: "Days",
      accessor: "day",
      className: "hidden md:table-cell",
    },
    {
      header: "Actions",
      accessor: "action",
    },
  ];

  const renderRow = (item: LessonList) => (
    <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-scholera-purple-light">
      {/* Subject */}
      <td className="flex items-center gap-4 p-4">{item.name}</td>
      {/* Class */}
      <td>{item.class.name}</td>
      {/* Teacher */}
      <td className="hidden md:table-cell">{item.teacher.name}</td>
      {/* Day */}
      <td className="hidden md:table-cell">{item.day.toLocaleLowerCase()}</td>
      {/* Actions */}
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <FormModal table="lesson" type="update" data={item} />
              <FormModal table="lesson" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );
  return (
    <>
      {/* Middle - Table */}
      <Table columns={columns} data={lessonsRes.data} renderRow={renderRow} />

      {/* Bottom - Pagination */}
      <Pagination
        total={lessonsRes.pagination.total}
        page={lessonsRes.pagination.page}
        limit={lessonsRes.pagination.limit}
        totalPages={lessonsRes.pagination.totalPages}
        hasNext={lessonsRes.pagination.hasNext}
        hasPrev={lessonsRes.pagination.hasPrev}
      />
    </>
  );
};

export default LessonListContent;

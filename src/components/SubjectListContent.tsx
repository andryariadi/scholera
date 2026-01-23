import { SubjectListPageProps } from "@/app/(dashboard)/list/subjects/page";
import FormModal from "./FormModal";
import Table from "./Table";
import { getSubjects } from "@/libs/data/fetch-subjects";
import { SubjectList } from "@/libs/types/prisma-schema";
import Pagination from "./Pagination";

const SubjectListContent = async ({ searchParams }: SubjectListPageProps) => {
  const params = await searchParams;

  const queryParams = {
    page: params.page ? parseInt(params.page) : 1,
    limit: params.limit ? parseInt(params.limit) : 10,
    search: params.search || "",
    teacher: params.teacher,
    lesson: params.lesson,
    sortBy: params.sortBy || "name",
    sortOrder: params.sortOrder || "asc",
  };

  const subjectsRes = await getSubjects(queryParams);

  const columns = [
    {
      header: "Subject Name",
      accessor: "name",
    },
    {
      header: "Teachers",
      accessor: "teachers",
      className: "hidden md:table-cell",
    },
    {
      header: "Lessons",
      accessor: "lessons",
      className: "hidden md:table-cell",
    },
    {
      header: "Actions",
      accessor: "action",
    },
  ];

  const role = "admin";

  console.log({ subjectsRes });

  const renderRow = (item: SubjectList) => (
    <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-scholera-purple-light">
      {/* Name */}
      <td className="flex items-center gap-4 p-4">{item.name}</td>
      {/* Teachers */}
      <td className="hidden md:table-cell">{item.teachers.map((teacher) => teacher.name).join(", ")}</td>
      {/* Lessons */}
      <td className="hidden md:table-cell">{item.lessons.map((lesson) => lesson.name).join(", ")}</td>
      {/* Actions */}
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <FormModal table="subject" type="update" data={item} />
              <FormModal table="subject" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );
  return (
    <>
      {/* Middle - Table */}
      <Table columns={columns} data={subjectsRes.data} renderRow={renderRow} />

      {/* Bottom - Pagination */}
      <Pagination
        total={subjectsRes.pagination.total}
        page={subjectsRes.pagination.page}
        limit={subjectsRes.pagination.limit}
        totalPages={subjectsRes.pagination.totalPages}
        hasNext={subjectsRes.pagination.hasNext}
        hasPrev={subjectsRes.pagination.hasPrev}
      />
    </>
  );
};

export default SubjectListContent;

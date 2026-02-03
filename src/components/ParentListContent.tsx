import { ParentListPageProps } from "@/app/(dashboard)/list/parents/page";
import { getParents } from "@/libs/data/fetch.parents";
import Table from "./Table";
import FormModal from "./FormModal";
import { ParentList } from "@/libs/types/prisma-schema";
import Pagination from "./Pagination";

const ParentListContent = async ({ searchParams, currentUserId, currentUserRole }: ParentListPageProps) => {
  const params = await searchParams;

  const queryParams = {
    page: params.page ? parseInt(params.page) : 1,
    limit: params.limit ? parseInt(params.limit) : 10,
    search: params.search || "",
    address: params.address,
    email: params.email,
    student: params.student,
    sortBy: params.sortBy || "createdAt",
    sortOrder: params.sortOrder || "desc",
    currentUserId,
    currentUserRole,
  };

  const parentsRes = await getParents(queryParams);

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
      header: "Email",
      accessor: "email",
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
    ...(currentUserRole === "admin" ? [{ header: "Actions", accessor: "action" }] : []),
  ];

  const renderRow = (item: ParentList) => (
    <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-scholera-purple-light">
      {/* Info */}
      <td className="flex items-center gap-4 p-4">
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-xs text-gray-500">{item.username}</p>
        </div>
      </td>
      {/* Students */}
      <td className="hidden md:table-cell">{item.students.map((student) => student.name).join(", ")}</td>
      {/* Email */}
      <td className="hidden md:table-cell">{item.email}</td>
      {/* Phone */}
      <td className="hidden md:table-cell">{item.phone}</td>
      {/* Address */}
      <td className="hidden md:table-cell">{item.address}</td>
      <td>
        <div className="flex items-center gap-2">
          {currentUserRole === "admin" && (
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
    <>
      {/* Middle - Table */}
      <Table columns={columns} data={parentsRes.data} renderRow={renderRow} />

      {/* Bottom - Pagination */}
      <Pagination
        total={parentsRes.pagination.total}
        page={parentsRes.pagination.page}
        limit={parentsRes.pagination.limit}
        totalPages={parentsRes.pagination.totalPages}
        hasNext={parentsRes.pagination.hasNext}
        hasPrev={parentsRes.pagination.hasPrev}
      />
    </>
  );
};

export default ParentListContent;

import { AnnouncementList } from "@/libs/types/prisma-schema";
import FormModal from "./FormModal";
import Pagination from "./Pagination";
import { AnnouncementListPageProps } from "@/app/(dashboard)/list/announcements/page";
import { getAnnouncements } from "@/libs/data/fetch-announcements";
import { formatDateISO } from "@/libs/utils";
import Table from "./Table";

const AnnouncementListContent = async ({ searchParams }: AnnouncementListPageProps) => {
  const params = await searchParams;

  const queryParams = {
    page: params.page ? parseInt(params.page) : 1,
    limit: params.limit ? parseInt(params.limit) : 10,
    search: params.search || "",
    title: params.title,
    class: params.class,
    sortBy: params.sortBy || "title",
    sortOrder: params.sortOrder || "asc",
  };

  const announcementRes = await getAnnouncements(queryParams);

  console.log({ announcementRes });

  const role = "admin";

  const columns = [
    {
      header: "Title",
      accessor: "title",
    },
    {
      header: "Class",
      accessor: "class",
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

  const renderRow = (item: AnnouncementList) => (
    <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-scholera-purple-light">
      {/* Title */}
      <td className="flex items-center gap-4 p-4">{item.title}</td>
      {/* Class */}
      <td>{item.class.name}</td>
      {/* Date */}
      <td className="hidden md:table-cell">{formatDateISO(item.date)}</td>
      {/* Actions */}
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <FormModal table="announcement" type="update" data={item} />
              <FormModal table="announcement" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );
  return (
    <>
      {/* Middle - Table */}
      <Table columns={columns} data={announcementRes.data} renderRow={renderRow} />

      {/* Bottom - Pagination */}
      <Pagination
        total={announcementRes.pagination.total}
        page={announcementRes.pagination.page}
        limit={announcementRes.pagination.limit}
        totalPages={announcementRes.pagination.totalPages}
        hasNext={announcementRes.pagination.hasNext}
        hasPrev={announcementRes.pagination.hasPrev}
      />
    </>
  );
};

export default AnnouncementListContent;

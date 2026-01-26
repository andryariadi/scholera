import { EventListPageProps } from "@/app/(dashboard)/list/events/page";
import FormModal from "./FormModal";
import Pagination from "./Pagination";
import Table from "./Table";
import { getEvents } from "@/libs/data/fetch-events";
import { EventList } from "@/libs/types/prisma-schema";
import { formatDateISO, formatTime } from "@/libs/utils";

const EventListContent = async ({ searchParams }: EventListPageProps) => {
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

  const eventRes = await getEvents(queryParams);

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
      header: "Start Time",
      accessor: "startTime",
      className: "hidden md:table-cell",
    },
    {
      header: "End Time",
      accessor: "endTime",
      className: "hidden md:table-cell",
    },
    {
      header: "Actions",
      accessor: "action",
    },
  ];

  const renderRow = (item: EventList) => (
    <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-scholera-purple-light">
      {/* Title */}
      <td className="flex items-center gap-4 p-4">{item.title}</td>
      {/* Class */}
      <td>{item.class.name}</td>
      {/* Date */}
      <td className="hidden md:table-cell">{formatDateISO(item.startTime)}</td>
      {/* Start Time */}
      <td className="hidden md:table-cell">{formatTime(item.startTime)}</td>
      {/* End Time */}
      <td className="hidden md:table-cell">{formatTime(item.endTime)}</td>
      {/* Actions */}
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <FormModal table="event" type="update" data={item} />
              <FormModal table="event" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <>
      {/* Middle - Table */}
      <Table columns={columns} data={eventRes.data} renderRow={renderRow} />

      {/* Bottom - Pagination */}
      <Pagination total={eventRes.pagination.total} page={eventRes.pagination.page} limit={eventRes.pagination.limit} totalPages={eventRes.pagination.totalPages} hasNext={eventRes.pagination.hasNext} hasPrev={eventRes.pagination.hasPrev} />
    </>
  );
};

export default EventListContent;

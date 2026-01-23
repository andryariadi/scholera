import { TableColumns } from "@/libs/types/prisma-schema";

const Table = <T,>({ columns, data, renderRow }: TableColumns<T>) => {
  return (
    <table className="w-full table-auto">
      {/* Table Header */}
      <thead>
        <tr className="text-gray-500 text-sm text-left">
          {columns.map((col) => (
            <th key={col.accessor} className={col.className}>
              {col.header}
            </th>
          ))}
        </tr>
      </thead>

      {/* Table Body */}
      <tbody>{data.map((item) => renderRow(item))}</tbody>
    </table>
  );
};

export default Table;

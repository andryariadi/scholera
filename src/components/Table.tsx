const Table = <T,>({ columns, data, renderRow }: TeacherColumns<T>) => {
  return (
    <table className="b-amber-500 w-full">
      {/* Table Header */}
      <thead className="b-fuchsia-500">
        <tr className="b-green-600 text-gray-500 text-sm text-left">
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

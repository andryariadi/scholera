const TableSearchSkeleton = () => {
  return (
    <div className="w-full md:w-auto flex items-center gap-2 rounded-full ring-[1.5px] ring-gray-300 px-2 py-2 animate-pulse">
      {/* Icon */}
      <div className="w-4 h-4 bg-gray-300 rounded" />

      {/* Input */}
      <div className="h-4 w-40 bg-gray-300 rounded" />
    </div>
  );
};

export default TableSearchSkeleton;

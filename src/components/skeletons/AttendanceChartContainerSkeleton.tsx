const AttendanceChartContainerSkeleton = () => {
  return (
    <div className="bg-white shadow-xs w-full h-full p-4 rounded-xl animate-pulse">
      {/* Title */}
      <div className="flex justify-between items-center mb-4">
        <div className="w-28 h-5 bg-gray-200 rounded" />
        <div className="w-4 h-4 bg-gray-200 rounded" />
      </div>

      {/* Chart Skeleton */}
      <div className="w-full h-[90%] flex items-end gap-4 px-4">
        {[1, 2, 3, 4, 5].map((day) => (
          <div key={day} className="flex flex-col items-center gap-2 flex-1">
            {/* Bars */}
            <div className="flex items-end gap-2 h-full w-full">
              <div className="w-4 bg-gray-200 rounded-t-md h-1/2" />
              <div className="w-4 bg-gray-200 rounded-t-md h-2/3" />
            </div>

            {/* X Axis label */}
            <div className="w-6 h-3 bg-gray-200 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttendanceChartContainerSkeleton;

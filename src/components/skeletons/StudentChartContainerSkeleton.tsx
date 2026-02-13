const StudentChartContainerSkeleton = () => {
  return (
    <div className="bg-white shadow-xs w-full h-full p-4 rounded-xl animate-pulse">
      {/* Title */}
      <div className="flex justify-between items-center mb-4">
        <div className="w-24 h-5 bg-gray-200 rounded" />
        <div className="w-4 h-4 bg-gray-200 rounded" />
      </div>

      {/* Chart Skeleton */}
      <div className="relative w-full h-[75%] flex items-center justify-center">
        <div className="w-40 h-40 rounded-full bg-gray-200" />
      </div>

      {/* Bottom Info */}
      <div className="flex justify-center gap-16 mt-4">
        {[1, 2].map((i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <div className="w-5 h-5 bg-gray-200 rounded-full" />
            <div className="w-8 h-5 bg-gray-200 rounded" />
            <div className="w-20 h-3 bg-gray-200 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentChartContainerSkeleton;

const TeacherScheduleSkeleton = () => {
  return (
    <div className="bg-white shadow-xs rounded-md p-4 h-215px animate-pulse">
      <div className="h-6 bg-gray-300 rounded w-1/4 mb-4"></div>

      <div className="flex flex-col gap-3">
        <div className="h-6 bg-gray-300 rounded w-1/4 mb-4 self-end"></div>
        <div className="space-y-2">
          {[1, 2, 3, 4, , 5, 6, 7, 8].map((i) => (
            <div key={i} className="h-12 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeacherScheduleSkeleton;

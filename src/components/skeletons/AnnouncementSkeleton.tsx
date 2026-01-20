const AnnouncementsSkeleton = () => {
  return (
    <div className="bg-white shadow-xs p-4 rounded-md space-y-4 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <div className="h-6 w-40 bg-gray-300 rounded" />
        <div className="h-3 w-16 bg-gray-300 rounded" />
      </div>

      {/* List Skeleton */}
      <div className="flex flex-col gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="rounded-md p-4 space-y-3 bg-gray-200">
            {/* Title + Date */}
            <div className="flex items-center justify-between gap-4">
              <div className="h-4 w-2/3 bg-gray-300 rounded" />
              <div className="h-4 w-20 bg-gray-300 rounded" />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <div className="h-3 w-full bg-gray-300 rounded" />
              <div className="h-3 w-5/6 bg-gray-300 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementsSkeleton;

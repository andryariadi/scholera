export default function TeacherProfileSkeleton() {
  return (
    <div className="flex flex-col lg:flex-row gap-4 animate-pulse">
      {/* Teacher Profile Card Skeleton */}
      <div className="bg-scholera-sky shadow-xs w-full p-3 rounded-md flex gap-4">
        {/* Image Skeleton */}
        <div className="2xl:w-1/3 flex justify-center">
          <div className="w-32 h-32 rounded-full bg-gray-300" />
        </div>

        {/* Details Skeleton */}
        <div className="flex-1 2xl:w-2/3 flex flex-col justify-between gap-3">
          {/* Name + Action */}
          <div className="flex items-center justify-between gap-4">
            <div className="h-5 w-40 bg-gray-300 rounded" />
            <div className="h-8 w-16 bg-gray-300 rounded-md" />
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <div className="h-3 w-full bg-gray-300 rounded" />
            <div className="h-3 w-5/6 bg-gray-300 rounded" />
          </div>

          {/* Info Row */}
          <div className="flex flex-wrap gap-4 text-xs">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-300 rounded-full" />
                <div className="h-3 w-20 bg-gray-300 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Teacher Performance Skeleton */}
      <div className="w-full flex flex-wrap 2xl:justify-between gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="user-performance">
            <div className="w-6 h-6 bg-gray-300 rounded" />
            <div className="space-y-2">
              <div className="h-5 w-12 bg-gray-300 rounded" />
              <div className="h-3 w-20 bg-gray-300 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

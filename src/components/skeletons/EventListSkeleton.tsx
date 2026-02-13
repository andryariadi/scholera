const EventListSkeleton = () => {
  return (
    <>
      {[1, 2, 3].map((item) => (
        <div key={item} className="p-5 rounded-md border-2 border-gray-100 border-t-4 animate-pulse">
          {/* Event info */}
          <div className="flex items-center justify-between">
            <div className="w-32 h-4 bg-gray-200 rounded" />
            <div className="w-10 h-3 bg-gray-200 rounded" />
          </div>

          {/* Event description */}
          <div className="mt-3 space-y-2">
            <div className="w-full h-3 bg-gray-200 rounded" />
            <div className="w-5/6 h-3 bg-gray-200 rounded" />
          </div>
        </div>
      ))}
    </>
  );
};

export default EventListSkeleton;

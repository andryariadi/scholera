const UserCardSkeleton = () => {
  return (
    <div className="min-w-32.5 flex-1 p-3 rounded-2xl space-y-3 bg-gray-100 animate-pulse shadow-xs">
      {/* Top */}
      <div className="flex justify-between items-center">
        <div className="w-14 h-4 bg-gray-200 rounded-full" />
        <div className="w-4 h-4 bg-gray-200 rounded" />
      </div>

      {/* Count */}
      <div className="w-16 h-7 bg-gray-200 rounded" />

      {/* Role */}
      <div className="w-20 h-4 bg-gray-200 rounded" />
    </div>
  );
};

export default UserCardSkeleton;

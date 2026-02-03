const SidebarSkeleton = () => {
  return (
    <aside className="space-y-5 h-full overflow-hidden animate-pulse">
      {/* Top - Logo Skeleton */}
      <div className="flex items-center justify-center lg:justify-start gap-2">
        <div className="w-8 h-8 bg-gray-200 rounded-md" />
        <div className="hidden lg:block w-24 h-4 bg-gray-200 rounded" />
      </div>

      {/* Bottom - Menu Skeleton */}
      <div className="px-1 space-y-8">
        {[1, 2, 3].map((section) => (
          <div key={section} className="space-y-4">
            {/* Section Title */}
            <div className="hidden lg:block w-20 h-3 bg-gray-200 rounded" />

            {/* Menu Items */}
            <div className="space-y-3">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-center justify-center lg:justify-start gap-4 py-2 md:px-2">
                  <div className="w-4 h-4 bg-gray-200 rounded" />
                  <div className="hidden lg:block w-28 h-3 bg-gray-200 rounded" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SidebarSkeleton;

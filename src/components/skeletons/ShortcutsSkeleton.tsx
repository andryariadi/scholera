export default function ShortcutsSkeleton() {
  return (
    <div className="bg-white shadow-xs p-4 rounded-md space-y-4 animate-pulse">
      {/* Title */}
      <div className="h-6 w-28 bg-gray-300 rounded" />

      {/* Shortcut items */}
      <div className="flex flex-wrap gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-10 w-40 rounded-md bg-gray-300" />
        ))}
      </div>
    </div>
  );
}

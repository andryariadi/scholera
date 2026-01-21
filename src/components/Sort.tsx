"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { SortDesc, Check } from "lucide-react";

function TeacherSortContent() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const currentSortBy = searchParams.get("sortBy") || "createdAt";
  const currentSortOrder = searchParams.get("sortOrder") || "desc";

  const sortOptions = [
    { value: "name", label: "Name (A-Z)", order: "asc" },
    { value: "name", label: "Name (Z-A)", order: "desc" },
    { value: "subjects", label: "First Subject (A-Z)", order: "asc" },
    { value: "subjects", label: "First Subject (Z-A)", order: "desc" },
    { value: "subjectCount", label: "Most Subjects", order: "desc" },
    { value: "subjectCount", label: "Fewest Subjects", order: "asc" },
    { value: "createdAt", label: "Newest First", order: "desc" },
    { value: "createdAt", label: "Oldest First", order: "asc" },
  ];

  const handleSort = (sortBy: string, sortOrder: string) => {
    const params = new URLSearchParams(searchParams);

    params.set("sortBy", sortBy);
    params.set("sortOrder", sortOrder);
    //  params.delete("page"); // Reset ke page 1 saat sorting

    router.replace(`${pathname}?${params.toString()}`);
    setIsOpen(false);
  };

  const currentSortLabel = sortOptions.find((opt) => opt.value === currentSortBy && opt.order === currentSortOrder)?.label || "Sort";

  return (
    <div className="relative">
      {/* Sort Button */}
      <button onClick={() => setIsOpen(!isOpen)} className="action-btn" title={currentSortLabel}>
        <SortDesc size={14} />
      </button>

      {/* Sort Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />

          {/* Sort Panel */}
          <div className="absolute right-0 top-12 z-50 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
            <div className="px-4 py-2">
              <h3 className="font-semibold text-gray-800 text-sm">Sort By</h3>
            </div>

            <div className="py-1">
              {sortOptions.map((option, index) => {
                const isActive = option.value === currentSortBy && option.order === currentSortOrder;

                return (
                  <button
                    key={index}
                    onClick={() => handleSort(option.value, option.order)}
                    className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center justify-between ${isActive ? "bg-blue-50 text-blue-600" : "text-gray-700"}`}
                  >
                    <span>{option.label}</span>
                    {isActive && <Check size={16} />}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// Export with Suspense wrapper
export default function TeacherSort() {
  return (
    <Suspense
      fallback={
        <button className="action-btn opacity-50">
          <SortDesc size={14} />
        </button>
      }
    >
      <TeacherSortContent />
    </Suspense>
  );
}

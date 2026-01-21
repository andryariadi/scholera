"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { SortDesc, Check } from "lucide-react";
import { SortOption } from "@/libs/config/sort-config";

function TableSortContent({ options, defaultSortBy = "createdAt", defaultSortOrder = "desc" }: { options: SortOption[]; defaultSortBy?: string; defaultSortOrder?: "asc" | "desc" }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const currentSortBy = searchParams.get("sortBy") || defaultSortBy;
  const currentSortOrder = searchParams.get("sortOrder") || defaultSortOrder;

  const handleSort = (sortBy: string, sortOrder: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("sortBy", sortBy);
    params.set("sortOrder", sortOrder);
    router.replace(`${pathname}?${params.toString()}`);
    setIsOpen(false);
  };

  const currentSortLabel = options.find((opt) => opt.value === currentSortBy && opt.order === currentSortOrder)?.label || "Sort";

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="action-btn" title={currentSortLabel}>
        <SortDesc size={14} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />

          <div className="absolute right-0 top-12 z-50 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
            <div className="px-4">
              <h3 className="font-semibold text-gray-800 text-sm">Sort By</h3>
            </div>

            <div className="py-1">
              {options.map((option, index) => {
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

export default function TableSort({ options, defaultSortBy, defaultSortOrder }: { options: SortOption[]; defaultSortBy?: string; defaultSortOrder?: "asc" | "desc" }) {
  return (
    <Suspense
      fallback={
        <button className="action-btn opacity-50">
          <SortDesc size={14} />
        </button>
      }
    >
      <TableSortContent options={options} defaultSortBy={defaultSortBy} defaultSortOrder={defaultSortOrder} />
    </Suspense>
  );
}

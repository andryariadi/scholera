"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { Filter, X } from "lucide-react";

export interface FilterOption {
  key: string;
  label: string;
  type: "select" | "text" | "date";
  options?: { value: string; label: string }[];
  placeholder?: string;
}

interface TableFilterContentProps {
  filters: FilterOption[];
  title?: string;
}

function TableFilterContent({ filters, title = "Filters" }: TableFilterContentProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  // Get current filter values:
  const getCurrentValue = (key: string) => searchParams.get(key)?.toString() || "";

  // Handle filter change:
  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value && value !== "all" && value !== "") {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    // Reset to page 1 when filtering:
    params.delete("page");

    router.replace(`${pathname}?${params.toString()}`);
  };

  // Clear all filters:
  const clearFilters = () => {
    const params = new URLSearchParams(searchParams);

    // Remove all filter keys but keep search
    filters.forEach((filter) => params.delete(filter.key));
    params.delete("page");

    router.replace(`${pathname}?${params.toString()}`);
    setIsOpen(false);
  };

  // Count active filters
  const activeFiltersCount = filters.filter((filter) => getCurrentValue(filter.key)).length;

  return (
    <div className="relative">
      {/* Filter Button */}
      <button onClick={() => setIsOpen(!isOpen)} className="action-btn relative" title={`${activeFiltersCount} active filter${activeFiltersCount !== 1 ? "s" : ""}`}>
        <Filter size={14} />
        {activeFiltersCount > 0 && <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">{activeFiltersCount}</span>}
      </button>

      {/* Filter Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop Close */}
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />

          {/* Filter Panel */}
          <div className="absolute right-0 top-12 z-50 w-80 bg-white rounded-lg shadow-lg border border-gray-200 p-4 space-y-4 max-h-[80vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between sticky top-0 bg-white">
              <h3 className="font-semibold text-gray-800">{title}</h3>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={18} />
              </button>
            </div>

            {/* Dynamic Filter Fields */}
            {filters.map((filter) => (
              <div key={filter.key}>
                <label className="block text-sm font-medium text-gray-700 mb-2">{filter.label}</label>

                {filter.type === "select" && filter.options && (
                  <select
                    value={getCurrentValue(filter.key)}
                    onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  >
                    <option value="">All</option>

                    {filter.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                )}

                {filter.type === "text" && (
                  <input
                    type="text"
                    value={getCurrentValue(filter.key)}
                    onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                    placeholder={filter.placeholder || `Enter ${filter.label.toLowerCase()}`}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                )}

                {filter.type === "date" && (
                  <input
                    type="date"
                    value={getCurrentValue(filter.key)}
                    onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                )}
              </div>
            ))}

            {/* Actions */}
            <div className="flex items-center gap-2 pt-3 sticky bottom-0 bg-white">
              <button onClick={clearFilters} className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                Clear All
              </button>

              <button onClick={() => setIsOpen(false)} className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors">
                Apply
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default function TableFilter({ filters, title }: { filters: FilterOption[]; title?: string }) {
  return (
    <Suspense
      fallback={
        <button className="action-btn opacity-50">
          <Filter size={14} />
        </button>
      }
    >
      <TableFilterContent filters={filters} title={title} />
    </Suspense>
  );
}

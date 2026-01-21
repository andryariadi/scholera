"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { Filter, X } from "lucide-react";

function TeacherFiltersContent() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  // Current filter values:
  const currentSex = searchParams.get("sex")?.toString() || "";
  const currentBloodType = searchParams.get("bloodType")?.toString() || "";
  const currentClassId = searchParams.get("classId")?.toString() || "";
  const currentSubjectId = searchParams.get("subjectId")?.toString() || "";

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value && value !== "all") {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    // Reset to page 1 when filtering:
    params.delete("page");

    router.replace(`${pathname}?${params.toString()}`);
  };

  const clearFilters = () => {
    const params = new URLSearchParams(searchParams);

    // Keep search but remove filters
    params.delete("sex");
    params.delete("bloodType");
    params.delete("classId");
    params.delete("subjectId");
    params.delete("page");

    router.replace(`${pathname}?${params.toString()}`);

    setIsOpen(false);
  };

  const activeFiltersCount = [currentSex, currentBloodType, currentClassId, currentSubjectId].filter(Boolean).length;

  return (
    <div className="relative">
      {/* Filter Button */}
      <button onClick={() => setIsOpen(!isOpen)} className="action-btn relative">
        <Filter size={14} />
        {activeFiltersCount > 0 && <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">{activeFiltersCount}</span>}
      </button>

      {/* Filter Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />

          {/* Filter Panel */}
          <div className="absolute right-0 top-12 z-50 w-80 bg-white rounded-lg shadow-lg border border-gray-200 p-4 space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b">
              <h3 className="font-semibold text-gray-800">Filters</h3>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={18} />
              </button>
            </div>

            {/* Gender Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
              <select value={currentSex} onChange={(e) => handleFilterChange("sex", e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                <option value="">All</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
              </select>
            </div>

            {/* Blood Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Blood Type</label>
              <select value={currentBloodType} onChange={(e) => handleFilterChange("bloodType", e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                <option value="">All</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-3 border-t">
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

// Export with Suspense wrapper
export default function TeacherFilters() {
  return (
    <Suspense
      fallback={
        <button className="action-btn opacity-50">
          <Filter size={14} />
        </button>
      }
    >
      <TeacherFiltersContent />
    </Suspense>
  );
}

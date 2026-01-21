"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

const Pagination = ({ total, page, limit, totalPages, hasNext, hasPrev }: PaginationProps) => {
  console.log({ total, page, limit, totalPages, hasNext, hasPrev });

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;

    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());

    router.replace(`${pathname}?${params.toString()}`);
  };

  // Generate page numbers to display:
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5; // Jumlah maksimal halaman yang ditampilkan

    if (totalPages <= maxVisible) {
      // Tampilkan semua halaman jika sedikit
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Logic untuk menampilkan dengan ellipsis
      if (page <= 3) {
        // Dekat dengan awal
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (page >= totalPages - 2) {
        // Dekat dengan akhir
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Di tengah
        pages.push(1);
        pages.push("...");
        pages.push(page - 1);
        pages.push(page);
        pages.push(page + 1);
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  if (total === 0 || totalPages <= 1) {
    return null; // Jangan tampilkan pagination jika tidak ada data atau hanya 1 halaman
  }

  return (
    <div className="px-4 flex items-center justify-between text-gray-500">
      {/* Info jumlah data */}
      <div className="hidden md:block text-sm">
        Showing {(page - 1) * limit + 1} to {Math.min(page * limit, total)} of {total} entries
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-2">
        {/* Previous Button */}
        <button onClick={() => handlePageChange(page - 1)} disabled={!hasPrev} className={`pagination-btn flex items-center gap-1 ${!hasPrev ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"}`}>
          <ChevronLeft size={16} />
          Prev
        </button>

        {/* Page Numbers */}
        <div className="flex items-center gap-1 text-sm">
          {getPageNumbers().map((pageNum, index) => (
            <button
              key={index}
              onClick={() => typeof pageNum === "number" && handlePageChange(pageNum)}
              className={`w-8 h-8 flex items-center justify-center rounded-md ${
                pageNum === page ? "bg-scholera-sky text-white font-medium" : typeof pageNum === "number" ? "hover:bg-gray-100" : "cursor-default"
              } ${typeof pageNum !== "number" ? "pointer-events-none" : ""}`}
              disabled={typeof pageNum !== "number" || pageNum === page}
            >
              {pageNum}
            </button>
          ))}
        </div>

        {/* Next Button */}
        <button onClick={() => handlePageChange(page + 1)} disabled={!hasNext} className={`pagination-btn flex items-center gap-1 ${!hasNext ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"}`}>
          Next
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Page Info (mobile) */}
      <div className="md:hidden text-sm">
        Page {page} of {totalPages}
      </div>
    </div>
  );
};

export default Pagination;

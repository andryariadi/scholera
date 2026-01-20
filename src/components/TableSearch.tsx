"use client";

import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

const TableSearch = () => {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();

  const currentSearch = searchParams.get("search")?.toString();

  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value !== "") {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    router.replace(`${pathName}?${params.toString()}`);
  }, 500);

  return (
    <div className="w-full md:w-auto flex items-center gap-2 rounded-full ring-[1.5px] ring-gray-300 px-2 text-xs">
      <Search size={16} className="text-gray-400 shrink-0" />

      <input type="text" placeholder="Search..." defaultValue={currentSearch} onChange={(e) => handleSearch(e.target.value)} className="w-50 p-2 bg-transparent outline-none" />
    </div>
  );
};

export default TableSearch;

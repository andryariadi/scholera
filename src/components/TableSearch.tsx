"use client";

import { Search } from "lucide-react";

const TableSearch = () => {
  return (
    <div className="w-full md:w-auto flex items-center gap-2 rounded-full ring-[1.5px] ring-gray-300 px-2 text-xs">
      <Search size={16} className="text-gray-400 shrink-0" />

      <input type="text" placeholder="Search..." className="w-50 p-2 bg-transparent outline-none" />
    </div>
  );
};

export default TableSearch;

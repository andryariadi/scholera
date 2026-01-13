import { Search, MessageSquare, Bell } from "lucide-react";
import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="b-amber-500 sticky top-0 z-40 py-2 px-5">
      <div className="bg-white flex items-center justify-between z-50 bg-clip-padding backdrop-filter backdrop-blur-xl h-14 px-3 rounded-full">
        {/* SEARCH BAR */}
        <div className="hidden md:flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2">
          <Search size={16} className="text-gray-400 shrink-0" />

          <input type="text" placeholder="Search..." className="w-50 p-2 bg-transparent outline-none" />
        </div>

        {/* ICONS AND USER */}
        <div className="w-full md:w-auto flex items-center gap-6 justify-end">
          {/* Messages */}
          <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-gray-100 transition">
            <MessageSquare size={16} className="text-gray-600" />
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center cursor-pointer relative hover:bg-gray-100 transition">
            <Bell size={16} className="text-gray-600" />
            <span className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center bg-purple-500 text-white rounded-full text-[10px]">1</span>
          </div>

          {/* User Info */}
          <div className="flex flex-col text-right">
            <span className="text-xs leading-3 font-medium">John Doe</span>
            <span className="text-[10px] text-gray-500">Admin</span>
          </div>

          {/* Avatar */}
          <Image src="/avatar.png" alt="Avatar" width={32} height={32} className="rounded-full cursor-pointer" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

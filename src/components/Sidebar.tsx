"use client";

import { menuItems } from "@/libs/constants";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";

const Sidebar = () => {
  const pathName = usePathname();

  const { user, isLoaded } = useUser();

  const role = user?.publicMetadata.role as string;

  if (!isLoaded) {
    return <SidebarSkeleton />;
  }

  // Function to check active path:
  const isActivePath = (itemHref: string) => {
    // Create regex pattern for the item
    const pattern = new RegExp(`^${itemHref}(/.*)?$`);

    return pattern.test(pathName);
  };

  return (
    <aside className="space-y-5 h-full overflow-hidden scrollbar-hide">
      {/* Top - Logo */}
      <Link href="/" className="flex items-center justify-center lg:justify-start gap-2">
        <Image src="/logo.png" alt="Logo" width={32} height={32} className="shrink-0" />

        <span className="hidden lg:block font-bold text-gray-800/80">Scholera</span>
      </Link>

      {/* Bottom - Menu */}
      <div
        className="px-1 space-y-5 text-sm max-h-[93%] overflow-y-hidden
    lg:overflow-y-scroll sidebar"
      >
        {menuItems.map((i) => (
          <div key={i.title} className="b-amber-500 text-gray-400 font-light space-y-4">
            {/* Title */}
            <p className="hidden lg:block">{i.title}</p>

            {/* Items */}
            <div>
              {i.items.map((item) => {
                const isActive = isActivePath(item.href);

                if (item.visible.includes(role)) {
                  return (
                    <Link
                      href={item.href}
                      key={item.label}
                      className={`flex items-center justify-center lg:justify-start gap-4 py-2 md:px-2 rounded-md ${isActive ? "bg-scholera-sky-light" : ""} hover:bg-scholera-sky-light text-gray-500 transition-colors`}
                    >
                      <item.icon size={16} className="shrink-0" />
                      <span className="hidden lg:block">{item.label}</span>
                    </Link>
                  );
                }
              })}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;

import { menuItems } from "@/libs/constants";
import Image from "next/image";
import Link from "next/link";

const Sidebar = () => {
  return (
    <aside className="b-teal-500 space-y-5 min-h-full">
      {/* Top - Logo */}
      <Link href="/" className="flex items-center justify-center lg:justify-start gap-2">
        <Image src="/logo.png" alt="Logo" width={32} height={32} />
        <span className="hidden lg:block font-bold text-gray-800/80">Scholera</span>
      </Link>

      {/* Bottom - Menu */}
      <div className="b-rose-500 space-y-5 text-sm">
        {menuItems.map((i) => (
          <div key={i.title} className="b-amber-500 hidden lg:block text-gray-400 font-light space-y-4">
            {/* Title */}
            <p>{i.title}</p>

            {/* Items */}
            <div>
              {i.items.map((item) => {
                if (item.visible.includes("admin")) {
                  return (
                    <Link href={item.href} key={item.label} className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 md:px-2 rounded-md hover:bg-scholera-sky-light">
                      <item.icon size={16} />
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

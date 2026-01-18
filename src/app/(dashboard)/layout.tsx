import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex">
      {/* Left sidebar */}
      <section className="bg-white shadow-xs fixed inset-y-0 left-0 w-full max-w-[14%] md:max-w-[8%] lg:max-w-[16%] xl:max-w-[14%] p-4">
        <Sidebar />
      </section>

      {/* Right content */}
      <section className="w-full ml-[14%] md:ml-[8%] lg:ml-[16%] xl:ml-[14%]">
        <Navbar />

        <main className="px-5 py-2">{children}</main>
      </section>
    </div>
  );
}

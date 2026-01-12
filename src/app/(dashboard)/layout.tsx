import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="b-rose-500 min-h-screen flex">
      {/* Left sidebar */}
      <section className="bg-blue-500 fixed inset-y-0 left-0 w-full max-w-[14%] md:max-w-[8%] lg:max-w-[16%] xl:max-w-[14%]">
        <Sidebar />
      </section>

      {/* Right content */}
      <section className="bg-green-600 w-full ml-[14%] md:ml-[8%] lg:ml-[16%] xl:ml-[14%] min-h-400">
        <Navbar />

        <main className="bg-fuchsia-500 p-5">{children}</main>
      </section>
    </div>
  );
}

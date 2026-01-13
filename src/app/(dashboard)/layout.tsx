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
      <section className="b-blue-500 fixed inset-y-0 left-0 w-full max-w-[14%] md:max-w-[8%] lg:max-w-[16%] xl:max-w-[14%] p-4">
        <Sidebar />
      </section>

      {/* Right content */}
      <section className="bg-white w-full ml-[14%] md:ml-[8%] lg:ml-[16%] xl:ml-[14%] min-h-400">
        <Navbar />

        <main className="b-fuchsia-500 p-5">{children}</main>
      </section>
    </div>
  );
}

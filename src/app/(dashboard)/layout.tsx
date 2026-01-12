import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-rose-500 min-h-screen flex">
      {/* Left sidebar */}
      <section className="bg-fuchsia-500 w-full max-w-[14%] md:max-w-[8%] lg:max-w-[16%] xl:max-w-[14%]">
        <Sidebar />
      </section>

      {/* Right content */}
      <main className="bg-green-600 w-full max-w-[86%] md:max-w-[92%] lg:max-w-[84%] xl:max-w-[86%]">
        <Navbar />
        {children}
      </main>
    </div>
  );
}

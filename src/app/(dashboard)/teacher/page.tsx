import Announcements from "@/components/Announcement";
import BigCalendar from "@/components/BigCalendar";
import EvCalendar from "@/components/EvCalendar";

const TeacherPage = () => {
  return (
    <section className="flex flex-col md:flex-row gap-4">
      {/* Left - Calendar */}
      <div className="w-full lg:max-w-2/3 rounded-xl">
        <div className="bg-white p-4 rounded-md space-y-3">
          <h1 className="text-xl font-semibold">Schedule</h1>

          <BigCalendar />
        </div>
      </div>

      {/* Right - Events & Announcements */}
      <div className="w-full lg:max-w-1/3 rounded-xl space-y-5">
        <EvCalendar />

        <Announcements />
      </div>
    </section>
  );
};

export default TeacherPage;

import Announcement from "@/components/Announcement";
import AttendanceChart from "@/components/AttendanceChart";
import EvCalendar from "@/components/EvCalendar";
import FinanceChart from "@/components/FinanceChart";
import StudentChart from "@/components/StudentChart";
import UserCard from "@/components/UserCard";

const AdminPage = () => {
  return (
    <section className="flex flex-col md:flex-row gap-4">
      {/* Left - Content */}
      <div className="w-full lg:max-w-2/3 space-y-5 ">
        {/* Users Card */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <UserCard type="student" />
          <UserCard type="teacher" />
          <UserCard type="parent" />
          <UserCard type="staff" />
        </div>

        {/* Middle Chart */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Student Chart */}
          <div className="w-full lg:w-1/3 h-112.5">
            <StudentChart />
          </div>

          {/* Attendance Chart */}
          <div className="w-full lg:w-2/3 h-112.5">
            <AttendanceChart />
          </div>
        </div>

        {/* Bottom Chart */}
        <div className="h-125">
          <FinanceChart />
        </div>
      </div>

      {/* Right - Content */}
      <div className="w-full lg:max-w-1/3 space-y-5">
        {/* Calendar */}
        <EvCalendar />

        {/* Announcement */}
        <Announcement />
      </div>
    </section>
  );
};

export default AdminPage;

import AttendanceChart from "@/components/AttendanceChart";
import FinanceChart from "@/components/FinanceChart";
import StudentChart from "@/components/StudentChart";
import UserCard from "@/components/UserCard";

const AdminPage = () => {
  return (
    <section className="bg-amber-500 flex flex-col md:flex-row gap-4">
      {/* Left - Content */}
      <div className="bg-rose-500 w-full lg:max-w-2/3 space-y-5 ">
        {/* Users Card */}
        <div className="bg-green-500 flex items-center justify-between gap-4 flex-wrap">
          <UserCard type="student" />
          <UserCard type="teacher" />
          <UserCard type="parent" />
          <UserCard type="staff" />
        </div>

        {/* Middle Chart */}
        <div className="bg-blue-500 flex flex-col md:flex-row gap-4">
          {/* Student Chart */}
          <div className="bg-teal-600 w-full lg:w-1/3 h-112.5">
            <StudentChart />
          </div>

          {/* Attendance Chart */}
          <div className="bg-violet-600 w-full lg:w-2/3 h-112.5">
            <AttendanceChart />
          </div>
        </div>

        {/* Bottom Chart */}
        <div className="bg-pink-500 h-125">
          <FinanceChart />
        </div>
      </div>

      {/* Right - Content */}
      <div className="bg-fuchsia-500 w-full lg:max-w-1/3">andry</div>
    </section>
  );
};

export default AdminPage;

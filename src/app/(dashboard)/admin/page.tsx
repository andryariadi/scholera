import Announcement from "@/components/Announcement";
import AttendanceChartContainer from "@/components/AttendanceChartContainer";
import EvCalendarContainer from "@/components/EvCalendarContainer";
import FinanceChart from "@/components/FinanceChart";
import AttendanceChartContainerSkeleton from "@/components/skeletons/AttendanceChartContainerSkeleton";
import StudentChartContainerSkeleton from "@/components/skeletons/StudentChartContainerSkeleton";
import UserCardSkeleton from "@/components/skeletons/UserCardSkeleton";
import StudentChartContainer from "@/components/StudentChartContainer";
import UserCard from "@/components/UserCard";
import { Suspense } from "react";

const AdminPage = ({ searchParams }: { searchParams: Promise<{ date?: undefined }> }) => {
  return (
    <section className="flex flex-col md:flex-row gap-4">
      {/* Left - Content */}
      <div className="w-full lg:max-w-2/3 space-y-5">
        {/* Users Card */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <Suspense fallback={<UserCardSkeleton />}>
            <UserCard type="admin" />
          </Suspense>
          <Suspense fallback={<UserCardSkeleton />}>
            <UserCard type="teacher" />
          </Suspense>
          <Suspense fallback={<UserCardSkeleton />}>
            <UserCard type="student" />
          </Suspense>
          <Suspense fallback={<UserCardSkeleton />}>
            <UserCard type="parent" />
          </Suspense>
        </div>

        {/* Middle Chart */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Student Chart */}
          <div className="w-full lg:w-1/3 h-112.5">
            <Suspense fallback={<StudentChartContainerSkeleton />}>
              <StudentChartContainer />
            </Suspense>
          </div>

          {/* Attendance Chart */}
          <div className="w-full lg:w-2/3 h-112.5">
            <Suspense fallback={<AttendanceChartContainerSkeleton />}>
              <AttendanceChartContainer />
            </Suspense>
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
        <EvCalendarContainer searchParams={searchParams} />

        {/* Announcement */}
        <Announcement />
      </div>
    </section>
  );
};

export default AdminPage;

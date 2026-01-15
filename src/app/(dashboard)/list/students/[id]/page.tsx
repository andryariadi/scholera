import Announcements from "@/components/Announcement";
import BigCalendar from "@/components/BigCalendar";
import PerformanceChart from "@/components/PerformanceChart";
import { CalendarDays, Mail, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const StudentDetailPage = () => {
  const role = "admin";

  return (
    <section className="b-amber-500 flex flex-col xl:flex-row gap-4">
      {/* Left - Content */}
      <div className="b-rose-500 w-full xl:w-2/3 space-y-4">
        {/* Top - Student Info */}
        <div className="b-green-600 flex flex-col lg:flex-row gap-4">
          {/* Student Profile Card */}
          <div className="bg-scholera-sky w-full p-3 rounded-md flex gap-4">
            {/* Image */}
            <div className="b-cyan-500 2xl:w-1/3">
              <Image src="https://images.pexels.com/photos/5414817/pexels-photo-5414817.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="Student" width={144} height={144} className="w-32 h-32 rounded-full object-cover" />
            </div>

            {/* Details */}
            <div className="b-cyan-500 flex-1 2xl:w-2/3 flex flex-col justify-between gap-3">
              {/* Name */}
              <div className="b-red-500 flex items-center justify-between gap-4">
                <h1 className="text-xl font-semibold">Cameron Moran</h1>

                {role === "admin" && <span>Modal</span>}
              </div>

              {/* Bio */}
              <p className="b-green-500 text-sm text-gray-500 text-wrap">Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>

              {/* More Info */}
              <div className="b-amber-500 flex items-start justify-between flex-wrap gap-2 text-xs font-medium">
                <div className="b-rose-500 user-info">
                  <Image src="/blood.png" alt="" width={14} height={14} />
                  <span>A+</span>
                </div>

                <div className="b-rose-500 user-info">
                  <CalendarDays size={14} />
                  <span>January 2025</span>
                </div>

                <div className="b-rose-500 user-info">
                  <Mail size={14} />
                  <span>user@gm ail.com</span>
                </div>

                <div className="b-rose-500 user-info">
                  <Phone size={14} />
                  <span>+1 234 567</span>
                </div>
              </div>
            </div>
          </div>

          {/* Student Performance Card */}
          <div className="b-yellow-600 w-full flex flex-wrap 2xl:justify-between gap-4">
            {/* Attendance Card */}
            <div className="user-performance">
              <Image src="/singleAttendance.png" alt="" width={24} height={24} className="w-6 h-6" />
              <div>
                <h1 className="text-xl font-semibold">90%</h1>
                <span className="text-sm text-gray-400">Attendance</span>
              </div>
            </div>

            {/* Branches Card */}
            <div className="user-performance">
              <Image src="/singleBranch.png" alt="" width={24} height={24} className="w-6 h-6" />
              <div>
                <h1 className="text-xl font-semibold">2</h1>
                <span className="text-sm text-gray-400">Branches</span>
              </div>
            </div>

            {/* Lessons Card */}
            <div className="user-performance">
              <Image src="/singleLesson.png" alt="" width={24} height={24} className="w-6 h-6" />
              <div>
                <h1 className="text-xl font-semibold">12</h1>
                <span className="text-sm text-gray-400">Lessons</span>
              </div>
            </div>

            {/* Classes Card */}
            <div className="user-performance">
              <Image src="/singleClass.png" alt="" width={24} height={24} className="w-6 h-6" />
              <div>
                <h1 className="text-xl font-semibold">6</h1>
                <span className="text-sm text-gray-400">Classes</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom - Student Schedule */}
        <div className="bg-white shadow-sm rounded-md p-4 h-215">
          <h1>Student&apos;s Schedule</h1>
          <BigCalendar />
        </div>
      </div>

      {/* Right - Content */}
      <div className="b-sky-500 w-full xl:w-1/3 space-y-4">
        {/* Shortcuts */}
        <div className="bg-white p-4 rounded-md space-y-4">
          <h1 className="text-xl font-semibold">Shortcuts</h1>

          <div className="flex flex-wrap gap-4 text-xs text-gray-500">
            <Link href="/" className="p-3 rounded-md bg-lamaSkyLight">
              Student&apos;s Lessons
            </Link>
            <Link href="/" className="p-3 rounded-md bg-lamaPurpleLight">
              Student&apos;s Teachers
            </Link>
            <Link href="/" className="p-3 rounded-md bg-pink-50">
              Student&apos;s Exams
            </Link>
            <Link href="/" className="p-3 rounded-md bg-lamaSkyLight">
              Student&apos;s Assignments
            </Link>
            <Link href="/" className="p-3 rounded-md bg-lamaYellowLight">
              Student&apos;s Results
            </Link>
          </div>
        </div>

        {/* Performance */}
        <PerformanceChart />

        {/* Announcements */}
        <Announcements />
      </div>
    </section>
  );
};

export default StudentDetailPage;

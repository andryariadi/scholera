import Announcements from "@/components/Announcement";
import BigCalendar from "@/components/BigCalendar";
import BigCalendarContainer from "@/components/BigCalendarContainer";
import PerformanceChart from "@/components/PerformanceChart";
import AnnouncementsSkeleton from "@/components/skeletons/AnnouncementSkeleton";
import ShortcutsSkeleton from "@/components/skeletons/ShortcutsSkeleton";
import TeacherProfileSkeleton from "@/components/skeletons/TeacherProfileSkeleton";
import TeacherScheduleSkeleton from "@/components/skeletons/TeacherScheduleSkeleton";
import { getStudent } from "@/libs/data/fetch-students";
import { formatDate } from "@/libs/utils";
import { CalendarDays, Mail, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

const getStudentCache = async (id: string) => {
  return await getStudent(id);
};

async function StudentProfileSection({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const student = await getStudentCache(id);

  if (!student) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <p className="text-red-800">Student not found</p>
      </div>
    );
  }

  const role = "admin";

  return (
    <div className="flex flex-col lg:flex-row gap-4">
      {/* Student Profile Card */}
      <div className="bg-scholera-sky shadow-xs w-full p-3 rounded-md flex gap-4">
        {/* Image */}
        <div className="2xl:w-1/3">
          <Image src={student.img || "/avatar.png"} alt={student.username} width={144} height={144} className="w-32 h-32 rounded-full object-cover" />
        </div>

        {/* Details */}
        <div className="flex-1 2xl:w-2/3 flex flex-col justify-between gap-3">
          {/* Name */}
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-xl font-semibold">{student.name}</h1>

            {role === "admin" && <span>Modal</span>}
          </div>

          {/* Bio */}
          <p className="text-sm text-gray-500 text-wrap">{student.address}</p>

          {/* More Info */}
          <div className="flex items-start justify-between flex-wrap gap-2 text-xs font-medium">
            <div className="user-info">
              <Image src="/blood.png" alt="" width={14} height={14} />
              <span>{student.bloodType}</span>
            </div>

            <div className="user-info">
              <CalendarDays size={14} />
              <span>{formatDate(student.birthday)}</span>
            </div>

            <div className="user-info">
              <Mail size={14} />
              <span className="truncate">{student.email}</span>
            </div>

            <div className="user-info">
              <Phone size={14} />
              <span>{student.phone}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Student Performance Card */}
      <div className="w-full flex flex-wrap 2xl:justify-between gap-4">
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
            <h1 className="text-xl font-semibold">{student.class.capacity}</h1>
            <span className="text-sm text-gray-400">Classes</span>
          </div>
        </div>
      </div>
    </div>
  );
}

async function StudentScheduleSection(params: { params: Promise<{ id: string }> }) {
  const { id } = await params.params;

  const student = await getStudentCache(id);

  return (
    <div className="bg-white shadow-xs rounded-md p-4 h-215">
      <h1>Student&apos;s Schedule</h1>
      <BigCalendarContainer type="classId" id={student?.classId ?? ""} />
    </div>
  );
}

async function Shortcuts(params: { params: Promise<{ id: string }> }) {
  const { id } = await params.params;

  const student = await getStudentCache(id);

  return (
    <div className="bg-white shadow-xs p-4 rounded-md space-y-4">
      <h1 className="text-xl font-semibold">Shortcuts</h1>

      <div className="flex flex-wrap gap-4 text-xs text-gray-500">
        <Link href={`/list/lessons?classId=${student?.class.id}`} className="p-3 rounded-md bg-scholera-sky-light">
          Student&apos;s Lessons
        </Link>
        <Link href={`/list/teachers?classId=${student?.class.id}`} className="p-3 rounded-md bg-scholera-purple-light">
          Student&apos;s Teachers
        </Link>
        <Link href={`/list/exams?classId=${student?.class.id}`} className="p-3 rounded-md bg-pink-50">
          Student&apos;s Exams
        </Link>
        <Link href={`/list/assignments?classId=${student?.class.id}`} className="p-3 rounded-md bg-scholera-sky-light">
          Student&apos;s Assignments
        </Link>
        <Link href={`/list/results?studentId=${student?.id}`} className="p-3 rounded-md bg-scholera-yellow-light">
          Student&apos;s Results
        </Link>
      </div>
    </div>
  );
}

const StudentDetailPage = ({ params }: { params: Promise<{ id: string }> }) => {
  return (
    <section className="flex flex-col xl:flex-row gap-4">
      {/* Left - Content */}
      <div className="w-full xl:w-2/3 space-y-4">
        {/* Top - Student Info */}
        <Suspense fallback={<TeacherProfileSkeleton />}>
          <StudentProfileSection params={params} />
        </Suspense>

        {/* Bottom - Student Schedule */}
        <Suspense fallback={<TeacherScheduleSkeleton />}>
          <StudentScheduleSection params={params} />
        </Suspense>
      </div>

      {/* Right - Content */}
      <div className="b-sky-500 w-full xl:w-1/3 space-y-4">
        {/* Shortcuts */}
        <Suspense fallback={<ShortcutsSkeleton />}>
          <Shortcuts params={params} />
        </Suspense>
        {/* Performance */}
        <PerformanceChart />

        {/* Announcements */}
        <Suspense fallback={<AnnouncementsSkeleton />}>
          <Announcements />
        </Suspense>
      </div>
    </section>
  );
};

export default StudentDetailPage;

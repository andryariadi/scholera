import { Ellipsis } from "lucide-react";
import AttendanceChart from "./AttendanceChart";
import { connection } from "next/server";
import prisma from "@/libs/config/prisma";

const AttendanceChartContainer = async () => {
  await connection();

  const today = new Date();

  const dayOfWeek = today.getDay();

  const daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

  const lastMonday = new Date(today);
  lastMonday.setDate(today.getDate() - daysSinceMonday);

  const attendaceRes = await prisma.attendance.findMany({
    where: {
      date: {
        gte: lastMonday,
      },
    },
    select: {
      date: true,
      present: true,
    },
  });

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri"];

  const attendanceMap: { [key: string]: { present: number; absent: number } } = {
    Mon: { present: 0, absent: 0 },
    Tue: { present: 0, absent: 0 },
    Wed: { present: 0, absent: 0 },
    Thu: { present: 0, absent: 0 },
    Fri: { present: 0, absent: 0 },
  };

  attendaceRes.forEach((attendance) => {
    const attendaceDate = new Date(attendance.date);
    const dayOfWeek = attendaceDate.getDay();

    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
      const dayName = daysOfWeek[dayOfWeek - 1];

      console.log({ dayName });

      if (attendance.present) {
        attendanceMap[dayName].present += 1;
      } else {
        attendanceMap[dayName].absent += 1;
      }
    }
  });

  const data = daysOfWeek.map((day) => ({
    name: day,
    present: attendanceMap[day].present,
    absent: attendanceMap[day].absent,
  }));

  console.log({ today, dayOfWeek, daysSinceMonday, lastMonday, attendaceRes, data });

  return (
    <div className="bg-white shadow-xs w-full h-full p-4 rounded-xl">
      {/* Title */}
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Attendance</h1>
        <Ellipsis size={16} />
      </div>

      {/* Chart */}
      <AttendanceChart data={data} />
    </div>
  );
};

export default AttendanceChartContainer;

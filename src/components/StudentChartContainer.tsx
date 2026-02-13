import { Ellipsis } from "lucide-react";
import StudentChart from "./StudentChart";
import prisma from "@/libs/config/prisma";
import { connection } from "next/server";

const StudentChartContainer = async () => {
  await connection();

  const students = await prisma.student.groupBy({
    by: ["sex"],
    _count: {
      _all: true,
    },
  });

  const boys = students.find((student) => student.sex === "MALE")?._count._all || 0;
  const girls = students.find((student) => student.sex === "FEMALE")?._count._all || 0;

  const total = boys + girls;
  const boysPercentage = total > 0 ? Math.round((boys / total) * 100) : 0;
  const girlsPercentage = total > 0 ? Math.round((girls / total) * 100) : 0;

  return (
    <div className="bg-white shadow-xs w-full h-full p-4 rounded-xl">
      {/* Title */}
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Students</h1>
        <Ellipsis size={16} />
      </div>

      {/* Chart */}
      <StudentChart boys={boys} girls={girls} />

      {/* Bottom - Info */}
      <div className="flex justify-center gap-16">
        {/* Boys */}
        <div className="flex flex-col items-center gap-1">
          <div className="w-5 h-5 bg-scholera-sky rounded-full" />
          <h1 className="font-bold">{boys}</h1>
          <h2 className="text-xs text-gray-300">Boys {boysPercentage}%</h2>
        </div>

        {/* Girls */}
        <div className="flex flex-col items-center gap-1">
          <div className="w-5 h-5 bg-scholera-yellow rounded-full" />
          <h1 className="font-bold">{girls}</h1>
          <h2 className="text-xs text-gray-300">Girls {girlsPercentage}%</h2>
        </div>
      </div>
    </div>
  );
};

export default StudentChartContainer;

"use client";

import { studentsData } from "@/libs/constants";
import { Ellipsis } from "lucide-react";
import Image from "next/image";
import { ResponsiveContainer, RadialBarChart, RadialBar, Tooltip } from "recharts";

const StudentChart = () => {
  return (
    <div className="bg-white w-full h-full p-4 rounded-xl">
      {/* Title */}
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Students</h1>
        <Ellipsis size={16} />
      </div>

      {/* Chart */}
      <div className="b-amber-500 relative w-full h-[75%]">
        <ResponsiveContainer>
          <RadialBarChart responsive cx="50%" cy="50%" innerRadius="40%" outerRadius="100%" barSize={32} data={studentsData}>
            <RadialBar background dataKey="count" />

            <Tooltip contentStyle={{ borderRadius: "10px", borderColor: "lightgray", color: "gray" }} />
          </RadialBarChart>
        </ResponsiveContainer>

        <Image src="/maleFemale.png" alt="" width={50} height={50} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* Bottom - Info */}
      <div className="flex justify-center gap-16">
        {/* Boys */}
        <div className="flex flex-col items-center gap-1">
          <div className="w-5 h-5 bg-scholera-sky rounded-full" />
          <h1 className="font-bold">1,234</h1>
          <h2 className="text-xs text-gray-300">Boys (55%)</h2>
        </div>

        {/* Girls */}
        <div className="flex flex-col items-center gap-1">
          <div className="w-5 h-5 bg-scholera-yellow rounded-full" />
          <h1 className="font-bold">1,234</h1>
          <h2 className="text-xs text-gray-300">Girls (45%)</h2>
        </div>
      </div>
    </div>
  );
};

export default StudentChart;

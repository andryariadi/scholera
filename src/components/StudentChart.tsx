"use client";

import Image from "next/image";
import { ResponsiveContainer, RadialBarChart, RadialBar, Tooltip } from "recharts";

const StudentChart = ({ boys, girls }: { boys: number; girls: number }) => {
  const data = [
    {
      name: "Total",
      count: boys + girls,
      fill: "white",
    },
    {
      name: "Girls",
      count: girls,
      fill: "#FAE27C",
    },
    {
      name: "Boys",
      count: boys,
      fill: "#C3EBFA",
    },
  ];

  return (
    <div className="b-amber-500 relative w-full h-[75%]">
      <ResponsiveContainer>
        <RadialBarChart responsive cx="50%" cy="50%" innerRadius="40%" outerRadius="100%" barSize={32} data={data}>
          <RadialBar background dataKey="count" />

          <Tooltip contentStyle={{ borderRadius: "10px", borderColor: "lightgray", color: "gray" }} />
        </RadialBarChart>
      </ResponsiveContainer>

      <Image src="/maleFemale.png" alt="" width={50} height={50} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
    </div>
  );
};

export default StudentChart;

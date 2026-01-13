"use client";

import { attendanceData } from "@/libs/constants";
import { Ellipsis } from "lucide-react";
import { BarChart, Legend, XAxis, YAxis, CartesianGrid, Tooltip, Bar, ResponsiveContainer } from "recharts";

const AttendanceChart = () => {
  return (
    <div className="bg-white w-full h-full p-4 rounded-xl">
      {/* Title */}
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Attendance</h1>
        <Ellipsis size={16} />
      </div>

      {/* Chart */}
      <ResponsiveContainer className="b-rose-600" width="100%" height="90%">
        <BarChart responsive data={attendanceData}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ddd" />

          <XAxis dataKey="name" axisLine={false} tick={{ fill: "#d1d5db" }} tickLine={false} />

          <YAxis axisLine={false} tick={{ fill: "#d1d5db" }} tickLine={false} />

          <Tooltip contentStyle={{ borderRadius: "10px", borderColor: "lightgray", color: "gray" }} />

          <Legend align="left" verticalAlign="top" wrapperStyle={{ paddingTop: "20px", paddingBottom: "40px" }} />

          <Bar dataKey="present" fill="#FAE27C" radius={[10, 10, 0, 0]} legendType="circle" />

          <Bar dataKey="absent" fill="#C3EBFA" radius={[10, 10, 0, 0]} legendType="circle" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AttendanceChart;

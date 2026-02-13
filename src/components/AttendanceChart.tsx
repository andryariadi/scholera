"use client";

import { BarChart, Legend, XAxis, YAxis, CartesianGrid, Tooltip, Bar, ResponsiveContainer } from "recharts";

const AttendanceChart = ({ data }: { data: { name: string; present: number; absent: number }[] }) => {
  return (
    <ResponsiveContainer className="b-rose-600" width="100%" height="90%">
      <BarChart responsive data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ddd" />

        <XAxis dataKey="name" axisLine={false} tick={{ fill: "#d1d5db" }} tickLine={false} />

        <YAxis axisLine={false} tick={{ fill: "#d1d5db" }} tickLine={false} />

        <Tooltip contentStyle={{ borderRadius: "10px", borderColor: "lightgray", color: "gray" }} />

        <Legend align="left" verticalAlign="top" wrapperStyle={{ paddingTop: "20px", paddingBottom: "40px" }} />

        <Bar dataKey="present" fill="#FAE27C" radius={[10, 10, 0, 0]} legendType="circle" />

        <Bar dataKey="absent" fill="#C3EBFA" radius={[10, 10, 0, 0]} legendType="circle" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default AttendanceChart;

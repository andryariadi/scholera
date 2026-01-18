"use client";

import { financeData } from "@/libs/constants";
import { Ellipsis } from "lucide-react";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const FinanceChart = () => {
  return (
    <div className="bg-white shadow-xs w-full h-full p-4 rounded-xl">
      {/* Title */}
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Finance</h1>
        <Ellipsis size={16} />
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          responsive
          data={financeData}
          width={500}
          height={300}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />

          <XAxis dataKey="name" axisLine={false} tick={{ fill: "#d1d5db" }} tickLine={false} tickMargin={10} />

          <YAxis axisLine={false} tick={{ fill: "#d1d5db" }} tickLine={false} tickMargin={20} />

          <Tooltip contentStyle={{ borderRadius: "10px", borderColor: "lightgray", color: "gray" }} />

          <Legend align="center" verticalAlign="top" wrapperStyle={{ paddingTop: "10px", paddingBottom: "30px" }} />

          <Line type="monotone" dataKey="income" stroke="#FAE27C" strokeWidth={5} />

          <Line type="monotone" dataKey="expense" stroke="#CFCEFF" strokeWidth={5} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FinanceChart;

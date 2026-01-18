"use client";

import { eventsData } from "@/libs/constants";
import { Ellipsis } from "lucide-react";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const EvCalendar = () => {
  const [value, onChange] = useState<Value>(new Date());

  return (
    <div className="bg-white shadow-xs w-fulll p-4 rounded-xl space-y-3">
      {/* Calendar */}
      <Calendar onChange={onChange} value={value} className="w-full! border-none!" />

      {/* Title */}
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Events</h1>
        <Ellipsis size={16} />
      </div>

      {/* List of events */}
      <div className="flex flex-col gap-4">
        {eventsData.map((event) => (
          <div className="p-5 rounded-md border-2 border-gray-100 border-t-4 odd:border-t-scholera-sky even:border-t-scholera-purple" key={event.id}>
            {/* Event info */}
            <div className="flex items-center justify-between">
              <h1 className="font-semibold text-gray-600 text-sm md:text-base">{event.title}</h1>
              <span className="text-gray-300 text-[10px] md:text-xs">{event.time}</span>
            </div>

            {/* Event description */}
            <p className="mt-2 text-gray-400 text-xs md:text-sm">{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EvCalendar;

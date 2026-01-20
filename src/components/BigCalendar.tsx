"use client";

import { Calendar, momentLocalizer, View, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";

const localizer = momentLocalizer(moment);

const BigCalendar = ({ data }: { data: { title: string; start: Date; end: Date }[] }) => {
  const [view, setView] = useState<View>(Views.WORK_WEEK);

  const handleOnChangeView = (selectedView: View) => {
    setView(selectedView);
  };

  return (
    <Calendar
      localizer={localizer}
      events={data}
      startAccessor="start"
      endAccessor="end"
      views={["work_week", "day"]}
      view={view}
      date={new Date()}
      onView={handleOnChangeView}
      min={new Date(2026, 0, 12, 8, 0)}
      max={new Date(2026, 0, 12, 17, 0)}
      style={{ height: 800 }}
    />
  );
};

export default BigCalendar;

import prisma from "@/libs/config/prisma";
import { adjustScheduleToCurrentWeek } from "@/libs/utils";
import BigCalendar from "./BigCalendar";

const BigCalendarContainer = async ({ type, id }: { type: "teacherId" | "classId"; id: string }) => {
  const dataRes = await prisma.lesson.findMany({
    where: {
      ...(type === "teacherId" ? { teacherId: id as string } : { classId: id as string }),
    },
  });

  const data = dataRes.map((lesson) => ({
    title: lesson.name,
    start: lesson.startTime,
    end: lesson.endTime,
  }));

  const schedule = adjustScheduleToCurrentWeek(data);

  return <BigCalendar data={schedule} />;
};

export default BigCalendarContainer;

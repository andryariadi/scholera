import prisma from "@/libs/config/prisma";
import { adjustScheduleToCurrentWeek, getCurrentUserRole } from "@/libs/utils";
import BigCalendar from "./BigCalendar";

const BigCalendarContainer = async ({ type }: { type: "teacherId" | "classId" }) => {
  const userRes = await getCurrentUserRole();

  const roleClass = await prisma.class.findFirst({
    where: {
      students: { some: { id: userRes?.userId } },
    },
  });

  const dataRes = await prisma.lesson.findMany({
    where: {
      ...(type === "teacherId" ? { teacherId: roleClass?.id as string } : { classId: roleClass?.id as string }),
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

import { Announcement } from "@/generated/prisma/client";
import prisma from "../config/prisma";
import { cacheLife, cacheTag } from "next/cache";

export const getAnnouncements = async (): Promise<Announcement[]> => {
  "use cache";
  cacheLife("max");
  cacheTag("announcements");

  try {
    const announcements = await prisma.announcement.findMany({
      orderBy: { date: "desc" },
    });

    return announcements;
  } catch (error) {
    console.log("Error in fetching announcements:", error);
    return [];
  }
};

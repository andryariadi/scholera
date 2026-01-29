import { Prisma } from "@/generated/prisma/client";
import { AnnouncementList } from "../types/prisma-schema";
import prisma from "../config/prisma";
import { cacheLife, cacheTag } from "next/cache";
import { calculatePagination, emptyPaginationResponse, handlePrismaError, validatePagination } from "../utils";

export interface GetAnnouncementsParams {
  // Pagination
  page?: number;
  limit?: number;

  // Search
  search?: string;

  // Filter
  title?: string;
  class?: string;

  // Sorting
  sortBy?: "title" | "class" | "date";
  sortOrder?: "asc" | "desc";
}

export interface GetAnnouncementsResponse {
  data: AnnouncementList[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  error?: string;
}

export const getAnnouncements = async (params: GetAnnouncementsParams = {}): Promise<GetAnnouncementsResponse> => {
  "use cache";
  cacheLife("hours");
  cacheTag("announcements", `announcements-page-${params.page || 1}`);

  try {
    // Default values for params:
    const { page = 1, limit = 10, search = "", title, class: className, sortBy = "title", sortOrder = "asc" } = params;

    // Validate pagination:
    const { validPage, validLimit, skip } = validatePagination({ page, limit });

    // andConditions for WHERE clause:
    const andConditions: Prisma.AnnouncementWhereInput[] = [];

    // Search with OR:
    if (search) {
      const searchAsNumber = Number(search);
      const isNumeric = !isNaN(searchAsNumber) && search.trim() !== "";

      andConditions.push({
        OR: [{ title: { contains: search, mode: "insensitive" } }, { class: { name: { contains: search, mode: "insensitive" } } }],
      });
    }

    // Filter by title:
    if (title) {
      andConditions.push({ title: { contains: title, mode: "insensitive" } });
    }

    // Filter by class:
    if (className) {
      andConditions.push({ class: { name: { contains: className, mode: "insensitive" } } });
    }

    // Final WHERE clause:
    const where: Prisma.AnnouncementWhereInput = andConditions.length > 0 ? { AND: andConditions } : {};

    // Sorting:
    let orderBy: Prisma.AnnouncementOrderByWithRelationInput = {};

    if (sortBy === "class") {
      // sort based on many to one relation:
      orderBy = { class: { name: sortOrder } };
    } else {
      // sort based on column:
      orderBy = { [sortBy]: sortOrder };
    }

    // Execute query:
    const [announcements, total] = await Promise.all([
      prisma.announcement.findMany({
        where,
        orderBy,
        skip,
        take: validLimit,
        include: {
          class: true,
        },
      }),
      prisma.announcement.count({ where }),
    ]);

    //  Calculate pagination:
    const pagination = calculatePagination(total, validPage, validLimit);

    return {
      data: announcements as AnnouncementList[],
      pagination,
    };
  } catch (error) {
    console.log("Error in getAnnouncements:", error);

    return emptyPaginationResponse(handlePrismaError(error));
  }
};

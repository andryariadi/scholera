import { Prisma } from "@/generated/prisma/client";
import { EventList, UserRole } from "../types/prisma-schema";
import prisma from "../config/prisma";
import { cacheLife, cacheTag } from "next/cache";
import { calculatePagination, emptyPaginationResponse, handlePrismaError, validatePagination } from "../utils";

export interface GetEventsParams {
  // Pagination
  page?: number;
  limit?: number;

  // Search
  search?: string;

  // Filter
  title?: string;
  class?: string;

  // Sorting
  sortBy?: "title" | "class" | "date" | "startTime" | "endTime";
  sortOrder?: "asc" | "desc";

  // Current User
  currentUserId?: string | null;
  currentUserRole?: UserRole | null;
}

export interface GetEventsResponse {
  data: EventList[];
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

export const getEvents = async (params: GetEventsParams = {}): Promise<GetEventsResponse> => {
  "use cache";
  cacheLife("hours");
  cacheTag("events", `events-page-${params.page || 1}`);

  try {
    // Default values for params:
    const { page = 1, limit = 10, search = "", title, class: className, sortBy = "title", sortOrder = "asc", currentUserId, currentUserRole } = params;

    // Validate pagination:
    const { validPage, validLimit, skip } = validatePagination({ page, limit });

    // andConditions for WHERE clause:
    const andConditions: Prisma.EventWhereInput[] = [];

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

    // Filter events by current user:
    if (currentUserId && currentUserRole) {
      if (currentUserRole === "student") {
        andConditions.push({ class: { students: { some: { id: currentUserId } } } });
      } else if (currentUserRole === "teacher") {
        andConditions.push({
          class: {
            lessons: {
              some: { teacherId: currentUserId },
            },
          },
        });
      } else if (currentUserRole === "parent") {
        andConditions.push({
          class: {
            students: {
              some: { parentId: currentUserId },
            },
          },
        });
      } else {
        andConditions.push({
          class: {
            id: "",
          },
        });
      }
    }

    // Final WHERE clause:
    const where: Prisma.EventWhereInput = andConditions.length > 0 ? { AND: andConditions } : {};

    // Sorting:
    let orderBy: Prisma.EventOrderByWithRelationInput = {};

    if (sortBy === "class") {
      // sort based on many to one relation:
      orderBy = { class: { name: sortOrder } };
    } else {
      // sort based on column:
      orderBy = { [sortBy]: sortOrder };
    }

    // Execute query:
    const [events, total] = await Promise.all([
      prisma.event.findMany({
        where,
        orderBy,
        skip,
        take: validLimit,
        include: {
          class: true,
        },
      }),
      prisma.event.count({ where }),
    ]);

    //  Calculate pagination:
    const pagination = calculatePagination(total, validPage, validLimit);

    return {
      data: events as EventList[],
      pagination,
    };
  } catch (error) {
    console.log("Error in getEvents:", error);

    return emptyPaginationResponse(handlePrismaError(error));
  }
};

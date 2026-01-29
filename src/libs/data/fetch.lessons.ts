import { Day, Prisma } from "@/generated/prisma/client";
import { LessonList } from "../types/prisma-schema";
import prisma from "../config/prisma";

export interface GetLessonsParams {
  // Pagination
  page?: number;
  limit?: number;

  // Search
  search?: string;

  // Filter
  name?: string;
  day?: string;
  teacher?: string;
  class?: string;
  classId?: string;

  // Sorting
  sortBy?: "name" | "day" | "class" | "teacher";
  sortOrder?: "asc" | "desc";
}

export interface GetLessonsResponse {
  data: LessonList[];
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

export const getLessons = async (params: GetLessonsParams = {}): Promise<GetLessonsResponse> => {
  try {
    // Default values for params:
    const { page = 1, limit = 10, search = "", name, teacher, class: className, classId, day, sortBy = "name", sortOrder = "asc" } = params;

    // Validasi:
    const validPage = Math.max(1, page);
    const validLimit = Math.min(Math.max(1, limit), 100);
    const skip = (validPage - 1) * validLimit;

    // andConditions for WHERE clause:
    const andConditions: Prisma.LessonWhereInput[] = [];

    const validDays: Day[] = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"];

    // Search in multiple fields:
    if (search) {
      const searchUpper = search.toUpperCase();
      const isValidDay = validDays.includes(searchUpper as Day);

      andConditions.push({
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { teacher: { name: { contains: search, mode: "insensitive" } } },
          { class: { name: { contains: search, mode: "insensitive" } } },
          ...(isValidDay ? [{ day: { equals: searchUpper as Day } }] : []),
        ],
      });
    }

    // Filter by name:
    if (name) {
      andConditions.push({
        name: { contains: name, mode: "insensitive" },
      });
    }

    // Filter by teacher:
    if (teacher) {
      andConditions.push({
        teacher: {
          id: teacher,
        },
      });
    }

    // Filter by class:
    if (className) {
      andConditions.push({
        class: {
          name: { contains: className, mode: "insensitive" },
        },
      });
    }

    // Filter by classId:
    if (classId) {
      andConditions.push({
        class: {
          id: { contains: classId, mode: "insensitive" },
        },
      });
    }

    // Filter by day:
    if (day) {
      andConditions.push({
        day: { equals: day.toUpperCase() as Day },
      });
    }

    // Final WHERE clause:
    const where: Prisma.LessonWhereInput = andConditions.length > 0 ? { AND: andConditions } : {};

    // Sorting
    let orderBy: Prisma.LessonOrderByWithRelationInput = {};

    if (sortBy === "teacher") {
      // sort based on many to one relation:
      orderBy.teacher = { name: sortOrder };
    } else if (sortBy === "class") {
      // sort based on many to one relation:
      orderBy.class = { name: sortOrder };
    } else {
      // sort based on column:
      orderBy = {
        [sortBy]: sortOrder,
      };
    }

    // Execute query:
    const [lessons, total] = await Promise.all([
      prisma.lesson.findMany({
        where,
        orderBy,
        skip,
        take: validLimit,
        include: {
          subject: true,
          class: {
            include: {
              students: true,
            },
          },
          teacher: true,
          exams: true,
          assignments: true,
          attendances: true,
        },
      }),
      prisma.lesson.count({ where }),
    ]);

    const totalPages = Math.ceil(total / validLimit);

    return {
      data: lessons as LessonList[],
      pagination: {
        total,
        page: validPage,
        limit: validLimit,
        totalPages,
        hasNext: validPage < totalPages,
        hasPrev: validPage > 1,
      },
    };
  } catch (error) {
    console.log("Error in getLessons:", error);

    let errorMessage = "An unexpected error occurred";

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      errorMessage = `Database error: ${error.code} - ${error.message}`;
    } else if (error instanceof Prisma.PrismaClientValidationError) {
      errorMessage = "Invalid query parameters";
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    return {
      data: [],
      pagination: {
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 1,
        hasNext: false,
        hasPrev: false,
      },
      error: errorMessage,
    };
  }
};

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
}

export const getLessons = async (params: GetLessonsParams = {}): Promise<GetLessonsResponse> => {
  try {
    // Default values for params:
    const { page = 1, limit = 10, search = "", name, teacher, class: className, day, sortBy = "name", sortOrder = "asc" } = params;

    console.log({ search, day, sortBy });

    // Validasi:
    const validPage = Math.max(1, page);
    const validLimit = Math.min(Math.max(1, limit), 100);
    const skip = (validPage - 1) * validLimit;

    // WHERE clause:
    const where: Prisma.LessonWhereInput = {};

    // Search in multiple fields:
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { teacher: { name: { contains: search, mode: "insensitive" } } },
        { class: { name: { contains: search, mode: "insensitive" } } },
        { day: { equals: search.toUpperCase() as Day } },
      ];
    }

    // Filter by name:
    if (name) {
      where.name = { contains: name, mode: "insensitive" };
    }

    // Filter by teacher:
    if (teacher) {
      where.teacher = {
        name: { contains: teacher, mode: "insensitive" },
      };
    }

    // Filter by class:
    if (className) {
      where.class = {
        name: { contains: className, mode: "insensitive" },
      };
    }

    // Filter by day:
    if (day) {
      where.day = { equals: day as Day };
    }

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
          class: true,
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
    };
  }
};

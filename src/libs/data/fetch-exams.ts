import { Prisma } from "@/generated/prisma/client";
import { ExamList } from "../types/prisma-schema";
import prisma from "../config/prisma";

export interface GetExamsParams {
  // Pagination
  page?: number;
  limit?: number;

  // Search
  search?: string;

  // Filter
  lesson?: string;
  subject?: string;
  class?: string;
  teacher?: string;
  result?: string;

  // Sorting
  sortBy?: "title" | "lesson" | "subject" | "class" | "teacher" | "startTime";
  sortOrder?: "asc" | "desc";
}

export interface GetExamsResponse {
  data: ExamList[];
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

export const getExams = async (params: GetExamsParams = {}): Promise<GetExamsResponse> => {
  try {
    // Default values for params:
    const { page = 1, limit = 10, search = "", lesson, subject, class: className, teacher, result, sortBy = "subject", sortOrder = "asc" } = params;

    console.log({ search, subject, sortBy });

    // Validasi:
    const validPage = Math.max(1, page);
    const validLimit = Math.min(Math.max(1, limit), 100);
    const skip = (validPage - 1) * validLimit;

    // andConditions for WHERE clause:
    const andConditions: Prisma.ExamWhereInput[] = [];

    // Search dengan OR
    if (search) {
      const searchAsNumber = Number(search);
      const isNumeric = !isNaN(searchAsNumber) && search.trim() !== "";

      andConditions.push({
        OR: [
          { title: { contains: search, mode: "insensitive" } },
          { lesson: { name: { contains: search, mode: "insensitive" } } },
          {
            lesson: {
              subject: { name: { contains: search, mode: "insensitive" } },
            },
          },
          {
            lesson: {
              class: { name: { contains: search, mode: "insensitive" } },
            },
          },
          {
            lesson: {
              teacher: { name: { contains: search, mode: "insensitive" } },
            },
          },
          ...(isNumeric ? [{ results: { some: { score: searchAsNumber } } }] : []),
        ],
      });
    }

    // Filter lesson
    if (lesson) {
      andConditions.push({
        lesson: {
          name: { contains: lesson, mode: "insensitive" },
        },
      });
    }

    // Filter subject
    if (subject) {
      andConditions.push({
        lesson: {
          subject: {
            name: { contains: subject, mode: "insensitive" },
          },
        },
      });
    }

    // Filter class
    if (className) {
      andConditions.push({
        lesson: {
          class: {
            name: { contains: className, mode: "insensitive" },
          },
        },
      });
    }

    // Filter teacher
    if (teacher) {
      andConditions.push({
        lesson: {
          teacher: {
            name: { contains: teacher, mode: "insensitive" },
          },
        },
      });
    }

    // Filter by result:
    if (result) {
      andConditions.push({
        results: { some: { score: Number(result) || undefined } },
      });
    }

    // Build final WHERE clause:
    const where: Prisma.ExamWhereInput = andConditions.length > 0 ? { AND: andConditions } : {};

    // Sorting:
    let orderBy: Prisma.ExamOrderByWithRelationInput = {};

    if (sortBy === "lesson") {
      // sort based on many to one relation:
      orderBy.lesson = { name: sortOrder };
    } else if (sortBy === "subject") {
      // sort based on many to one relation:
      orderBy.lesson = { subject: { name: sortOrder } };
    } else if (sortBy === "class") {
      // sort based on many to one relation:
      orderBy.lesson = { class: { name: sortOrder } };
    } else if (sortBy === "teacher") {
      // sort based on many to one relation:
      orderBy.lesson = { teacher: { name: sortOrder } };
    } else {
      // sort based on column:
      orderBy = {
        [sortBy]: sortOrder,
      };
    }

    // Execute query:
    const [exams, total] = await Promise.all([
      prisma.exam.findMany({
        where,
        orderBy,
        skip,
        take: validLimit,
        include: {
          lesson: {
            include: {
              class: true,
              teacher: true,
              subject: true,
            },
          },
          results: true,
        },
      }),
      prisma.exam.count({ where }),
    ]);

    const totalPages = Math.ceil(total / validLimit);

    return {
      data: exams as ExamList[],
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
    console.log("Error in getExams:", error);

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

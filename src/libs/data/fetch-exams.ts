import { Prisma } from "@/generated/prisma/client";
import { ExamList, UserRole } from "../types/prisma-schema";
import prisma from "../config/prisma";
import { cacheLife, cacheTag } from "next/cache";
import { calculatePagination, emptyPaginationResponse, handlePrismaError, validatePagination } from "../utils";

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
  classId?: string;
  teacher?: string;
  result?: string;

  // Sorting
  sortBy?: "title" | "lesson" | "subject" | "class" | "teacher" | "startTime";
  sortOrder?: "asc" | "desc";

  currentUserId?: string | null;
  currentUserRole?: UserRole | null;
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
  "use cache";
  cacheLife("hours");
  cacheTag("exams", `exams-page-${params.page || 1}`);

  try {
    // Default values for params:
    const { page = 1, limit = 10, search = "", lesson, subject, class: className, classId, teacher, result, sortBy = "subject", sortOrder = "asc", currentUserId, currentUserRole } = params;

    // Validate pagination:
    const { validPage, validLimit, skip } = validatePagination({ page, limit });

    // andConditions for WHERE clause:
    const andConditions: Prisma.ExamWhereInput[] = [];

    // Search with OR:
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

    // Filter classId
    if (classId) {
      andConditions.push({
        lesson: {
          class: {
            id: { contains: classId, mode: "insensitive" },
          },
        },
      });
    }

    // Filter teacher
    if (teacher) {
      andConditions.push({
        lesson: {
          teacher: {
            id: { contains: teacher, mode: "insensitive" },
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

    // Filter exams by current user:
    if (currentUserId && currentUserRole) {
      if (currentUserRole === "student") {
        andConditions.push({
          lesson: {
            class: {
              students: {
                some: { id: currentUserId },
              },
            },
          },
        });
      } else if (currentUserRole === "teacher") {
        andConditions.push({
          lesson: { teacherId: currentUserId },
        });
      } else if (currentUserRole === "parent") {
        andConditions.push({
          lesson: {
            class: {
              students: {
                some: { parentId: currentUserId },
              },
            },
          },
        });
      }
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

    //  Calculate pagination:
    const pagination = calculatePagination(total, validPage, validLimit);

    return {
      data: exams as ExamList[],
      pagination,
    };
  } catch (error) {
    console.log("Error in getExams:", error);

    return emptyPaginationResponse(handlePrismaError(error));
  }
};

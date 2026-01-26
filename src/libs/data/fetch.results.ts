import { Prisma } from "@/generated/prisma/client";
import { ResultList } from "../types/prisma-schema";
import prisma from "../config/prisma";
import { cacheLife, cacheTag } from "next/cache";

export interface GetResultsParams {
  // Pagination
  page?: number;
  limit?: number;

  // Search
  search?: string;

  // Filter
  subject?: string;
  class?: string;
  teacher?: string;
  student?: string;

  // Sorting
  sortBy?: "score" | "student" | "subject" | "class" | "teacher";
  sortOrder?: "asc" | "desc";
}

export interface GetResultsResponse {
  data: ResultList[];
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

export const getResults = async (params: GetResultsParams = {}): Promise<GetResultsResponse> => {
  "use cache";
  cacheLife("hours");
  cacheTag("results", `results-page-${params.page || 1}`);

  try {
    // Default values for params:
    const { page = 1, limit = 10, search = "", subject, class: className, teacher, student, sortBy = "student", sortOrder = "asc" } = params;

    // Validasi:
    const validPage = Math.max(1, page);
    const validLimit = Math.min(Math.max(1, limit), 100);
    const skip = (validPage - 1) * validLimit;

    // andConditions for WHERE clause:
    const andConditions: Prisma.ResultWhereInput[] = [];

    // Search with OR:
    if (search) {
      const searchAsNumber = Number(search);
      const isNumeric = !isNaN(searchAsNumber) && search.trim() !== "";

      andConditions.push({
        OR: [
          { score: isNumeric ? searchAsNumber : undefined },
          { student: { name: { contains: search, mode: "insensitive" } } },
          { assignment: { lesson: { subject: { name: { contains: search, mode: "insensitive" } } } } },
          { assignment: { lesson: { class: { name: { contains: search, mode: "insensitive" } } } } },
          { assignment: { lesson: { teacher: { name: { contains: search, mode: "insensitive" } } } } },
        ],
      });
    }

    // Filter student
    if (student) {
      andConditions.push({
        student: {
          name: { contains: student, mode: "insensitive" },
        },
      });
    }

    // Filter subject
    if (subject) {
      andConditions.push({
        assignment: {
          lesson: {
            subject: {
              name: { contains: subject, mode: "insensitive" },
            },
          },
        },
      });
    }

    // Filter class
    if (className) {
      andConditions.push({
        assignment: {
          lesson: {
            class: {
              name: { contains: className, mode: "insensitive" },
            },
          },
        },
      });
    }

    // Filter teacher
    if (teacher) {
      andConditions.push({
        assignment: {
          lesson: {
            teacher: {
              name: { contains: teacher, mode: "insensitive" },
            },
          },
        },
      });
    }

    // Build final WHERE clause:
    const where: Prisma.ResultWhereInput = andConditions.length > 0 ? { AND: andConditions } : {};

    // Sorting:
    let orderBy: Prisma.ResultOrderByWithRelationInput = {};

    if (sortBy === "student") {
      // sort based on many to one relation:
      orderBy.student = { name: sortOrder };
    } else if (sortBy === "subject") {
      // sort based on many to one relation:
      orderBy.assignment = {
        lesson: {
          subject: { name: sortOrder },
        },
      };
    } else if (sortBy === "class") {
      // sort based on many to one relation:
      orderBy.assignment = {
        lesson: {
          class: { name: sortOrder },
        },
      };
    } else if (sortBy === "teacher") {
      // sort based on many to one relation:
      orderBy.assignment = {
        lesson: {
          teacher: { name: sortOrder },
        },
      };
    } else {
      // sort based on column:
      orderBy = {
        [sortBy]: sortOrder,
      };
    }

    // Execute query:
    const [results, total] = await Promise.all([
      prisma.result.findMany({
        where,
        orderBy,
        skip,
        take: validLimit,
        include: {
          student: true,
          assignment: {
            include: {
              lesson: {
                include: {
                  subject: true,
                  class: true,
                  teacher: true,
                },
              },
            },
          },
        },
      }),
      prisma.result.count({ where }),
    ]);
    const totalPages = Math.ceil(total / validLimit);

    return {
      data: results as ResultList[],
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
    console.log("Error in getResults:", error);

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

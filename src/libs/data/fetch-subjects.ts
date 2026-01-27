import { Prisma } from "@/generated/prisma/client";
import { SubjectList } from "../types/prisma-schema";
import prisma from "../config/prisma";
import { cacheLife, cacheTag } from "next/cache";

export interface GetSubjectsParams {
  // Pagination
  page?: number;
  limit?: number;

  // Search
  search?: string;

  // Filter
  name?: string;
  teacher?: string;
  lesson?: string;

  // Sorting
  sortBy?: "name";
  sortOrder?: "asc" | "desc";
}

export interface GetSubjectsResponse {
  data: SubjectList[];
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

export const getSubjects = async (params: GetSubjectsParams = {}): Promise<GetSubjectsResponse> => {
  "use cache";
  cacheLife("hours");
  cacheTag("subjects", `subjects-page-${params.page || 1}`);

  try {
    // Default values for params:
    const { page = 1, limit = 10, search = "", name, teacher, lesson, sortBy = "name", sortOrder = "asc" } = params;

    // Validasi:
    const validPage = Math.max(1, page);
    const validLimit = Math.min(Math.max(1, limit), 100);
    const skip = (validPage - 1) * validLimit;

    // andConditions for WHERE clause:
    const andConditions: Prisma.SubjectWhereInput[] = [];

    // Search in multiple fields:
    if (search) {
      const searchAsNumber = Number(search);
      const isNumeric = !isNaN(searchAsNumber) && search.trim() !== "";

      andConditions.push({
        OR: [{ name: { contains: search, mode: "insensitive" } }, { teachers: { some: { name: { contains: search, mode: "insensitive" } } } }, { lessons: { some: { name: { contains: search, mode: "insensitive" } } } }],
      });
    }

    // Filter by name:
    if (name) {
      andConditions.push({ name: { contains: name, mode: "insensitive" } });
    }

    // Filter by teacher:
    if (teacher) {
      andConditions.push({
        teachers: {
          some: {
            name: { contains: teacher, mode: "insensitive" },
          },
        },
      });
    }

    // Filter by lesson:
    if (lesson) {
      andConditions.push({
        lessons: {
          some: {
            name: { contains: lesson, mode: "insensitive" },
          },
        },
      });
    }

    // Final WHERE clause:
    const where: Prisma.SubjectWhereInput = andConditions.length > 0 ? { AND: andConditions } : {};

    // Sorting:
    const orderBy: Prisma.SubjectOrderByWithRelationInput = {};

    orderBy[sortBy] = sortOrder;

    // Execute queries:
    const [subjects, total] = await Promise.all([
      prisma.subject.findMany({
        where,
        orderBy,
        skip,
        take: validLimit,
        include: {
          teachers: true,
          lessons: true,
          _count: {
            select: {
              teachers: true,
              lessons: true,
            },
          },
        },
      }),
      prisma.subject.count({ where }),
    ]);

    const totalPages = Math.ceil(total / validLimit);

    return {
      data: subjects as SubjectList[],
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
    console.log("Error in getSubjects:", error);

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

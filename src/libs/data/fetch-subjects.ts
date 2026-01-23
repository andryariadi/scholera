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
}

export const getSubjects = async (params: GetSubjectsParams = {}): Promise<GetSubjectsResponse> => {
  "use cache";
  cacheLife("hours");
  cacheTag("subjects", `subjects-page-${params.page || 1}`);

  try {
    // Default values for params:
    const { page = 1, limit = 10, search = "", teacher, lesson, sortBy = "name", sortOrder = "asc" } = params;

    // Validasi:
    const validPage = Math.max(1, page);
    const validLimit = Math.min(Math.max(1, limit), 100);
    const skip = (validPage - 1) * validLimit;

    // WHERE clause: Ganti StudentWhereInput dengan SubjectWhereInput
    const where: Prisma.SubjectWhereInput = {};

    // Search in multiple fields:
    if (search) {
      where.OR = [{ name: { contains: search, mode: "insensitive" } }, { teachers: { some: { name: { contains: search, mode: "insensitive" } } } }, { lessons: { some: { name: { contains: search, mode: "insensitive" } } } }];
    }

    // Filter by teacher:
    if (teacher) {
      where.teachers = {
        some: {
          OR: [{ name: { contains: teacher, mode: "insensitive" } }, { surname: { contains: teacher, mode: "insensitive" } }],
        },
      };
    }

    // Filter by lesson:
    if (lesson) {
      where.lessons = {
        some: {
          name: { contains: lesson, mode: "insensitive" },
        },
      };
    }

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

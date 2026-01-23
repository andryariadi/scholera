import { Prisma } from "@/generated/prisma/client";
import { ClassList } from "../types/prisma-schema";
import prisma from "../config/prisma";
import { cacheLife, cacheTag } from "next/cache";

export interface GetClassesParams {
  // Pagination
  page?: number;
  limit?: number;

  // Search
  search?: string;

  // Filter
  capacity?: number;
  grade?: string;

  // Sorting
  sortBy?: "name" | "grade" | "capacity";
  sortOrder?: "asc" | "desc";
}

export interface GetClassesResponse {
  data: ClassList[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export const getClasses = async (params: GetClassesParams = {}): Promise<GetClassesResponse> => {
  "use cache";
  cacheLife("hours");
  cacheTag("classes", `classes-page-${params.page || 1}`);

  try {
    // Default values for params:
    const { page = 1, limit = 10, search = "", capacity, grade, sortBy = "name", sortOrder = "asc" } = params;

    // Validasi:
    const validPage = Math.max(1, page);
    const validLimit = Math.min(Math.max(1, limit), 100);
    const skip = (validPage - 1) * validLimit;

    // WHERE clause:
    const where: Prisma.ClassWhereInput = {};

    // Search in multiple fields:
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { capacity: { equals: Number(search) || 0 } },
        { supervisor: { name: { contains: search, mode: "insensitive" } } },
        { grade: { level: { equals: Number(search) || 0 } } },
      ];
    }

    // Filter by capacity:
    if (capacity) {
      where.capacity = { equals: Number(capacity) || 0 };
    }

    // Filter by grade:
    if (grade) {
      where.grade = {
        level: parseInt(grade),
      };
    }

    // Sorting: Default sorting by name
    const orderBy: Prisma.ClassOrderByWithRelationInput = {};

    if (sortBy === "grade") {
      // sort based on many to one relation:
      orderBy.grade = {
        level: sortOrder,
      };
    } else if (sortBy === "capacity") {
      // sort based on many to one relation:
      orderBy.capacity = sortOrder;
    } else {
      // sort based on column:
      orderBy.name = sortOrder;
    }

    // Execute query:
    const [classes, total] = await Promise.all([
      prisma.class.findMany({
        where,
        orderBy,
        skip,
        take: validLimit,
        include: {
          supervisor: true,
          grade: true,
          students: true,
          lessons: true,
          events: true,
          announcements: true,
          _count: {
            select: { students: true, lessons: true },
          },
        },
      }),
      prisma.class.count({ where }),
    ]);

    const totalPages = Math.ceil(total / validLimit);

    return {
      data: classes as ClassList[],
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
    console.log("Error in getClasses:", error);
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

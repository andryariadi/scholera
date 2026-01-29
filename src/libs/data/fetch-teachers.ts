import { Prisma } from "@/generated/prisma/client";
import prisma from "../config/prisma";
import { TeacherList } from "../types/prisma-schema";
import { cacheLife, cacheTag } from "next/cache";
import { calculatePagination, emptyPaginationResponse, handlePrismaError, validatePagination } from "../utils";

export interface GetTeachersParams {
  // Pagination
  page?: number;
  limit?: number;

  // Search
  search?: string;

  // Filter
  sex?: "MALE" | "FEMALE";
  bloodType?: string;
  subject?: string;
  class?: string;
  classId?: string;

  // Sorting
  sortBy?: "name" | "surname" | "class" | "createdAt";
  sortOrder?: "asc" | "desc";
}

// Interface untuk response:
export interface GetTeachersResponse {
  data: TeacherList[];
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

export const getTeachers = async (params: GetTeachersParams = {}): Promise<GetTeachersResponse> => {
  "use cache";
  cacheLife("hours");
  cacheTag("teachers", `teachers-page-${params.page || 1}`);

  try {
    // Default values for params:
    const { page = 1, limit = 10, search = "", subject, class: className, classId, sex: rawSex, bloodType, sortBy = "createdAt", sortOrder = "desc" } = params;

    let sex: "MALE" | "FEMALE" | undefined;
    if (rawSex) {
      const normalizedSex = rawSex.toUpperCase();

      if (normalizedSex === "MALE" || normalizedSex === "FEMALE") {
        sex = normalizedSex as "MALE" | "FEMALE";
      }
    }

    // Validate pagination:
    const { validPage, validLimit, skip } = validatePagination({ page, limit });

    // andConditions for WHERE clause:
    const andConditions: Prisma.TeacherWhereInput[] = [];

    // Search in multiple fields:
    if (search) {
      const searchAsNumber = Number(search);
      const isNumeric = !isNaN(searchAsNumber) && search.trim() !== "";

      andConditions.push({
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { surname: { contains: search, mode: "insensitive" } },
          { username: { contains: search, mode: "insensitive" } },
          { address: { contains: search, mode: "insensitive" } },
          { subjects: { some: { name: { contains: search, mode: "insensitive" } } } },
          { classes: { some: { name: { contains: search, mode: "insensitive" } } } },
        ],
      });
    }

    // Filter by sex:
    if (sex) {
      andConditions.push({ sex });
    }

    // Filter by blood type:
    if (bloodType) {
      andConditions.push({ bloodType });
    }

    // Filter by subject:
    if (subject) {
      andConditions.push({ subjects: { some: { name: { contains: subject, mode: "insensitive" } } } });
    }

    // Filter by class:
    if (className) {
      andConditions.push({ classes: { some: { name: { contains: className, mode: "insensitive" } } } });
    }

    // Filter by classId:
    if (classId) {
      andConditions.push({ classes: { some: { id: classId } } });
    }

    // Final WHERE clause:
    const where: Prisma.TeacherWhereInput = andConditions.length > 0 ? { AND: andConditions } : {};

    // ORDER By:
    let orderBy: Prisma.TeacherOrderByWithRelationInput = {};

    if (sortBy === "class") {
      // sort based on one to many relation:
      orderBy = { classes: { _count: sortOrder } };
    } else {
      // sort based on column:
      orderBy = {
        [sortBy]: sortOrder,
      };
    }

    // Execute queries:
    const [teachers, total] = await Promise.all([
      prisma.teacher.findMany({
        where,
        orderBy,
        skip,
        take: validLimit,
        include: {
          subjects: true,
          classes: {
            orderBy: { name: "asc" },
          },
          lessons: {
            include: {
              subject: true,
              class: true,
            },
          },
          _count: {
            select: {
              subjects: true,
              classes: true,
              lessons: true,
            },
          },
        },
      }),
      prisma.teacher.count({ where }),
    ]);

    // Calculate pagination:
    const pagination = calculatePagination(total, validPage, validLimit);

    return {
      data: teachers as TeacherList[],
      pagination,
    };
  } catch (error) {
    console.log("Error in getTeachers:", error);

    return emptyPaginationResponse(handlePrismaError(error));
  }
};

export const getTeacher = async (id: string): Promise<TeacherList | null> => {
  try {
    const teacher = await prisma.teacher.findUnique({
      where: { id },
      include: {
        subjects: true,
        classes: true,
        lessons: {
          include: {
            subject: true,
            class: true,
            exams: true,
            assignments: true,
          },
        },
        _count: {
          select: {
            subjects: true,
            classes: true,
            lessons: true,
          },
        },
      },
    });

    return teacher as TeacherList | null;
  } catch (error) {
    console.error("Error in getTeacherById:", error);
    return null;
  }
};

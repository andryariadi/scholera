import { Prisma } from "@/generated/prisma/client";
import prisma from "../config/prisma";
import { TeacherList } from "../types/prisma-schema";

export interface GetTeachersParams {
  // Pagination
  page?: number;
  limit?: number;

  // Search
  search?: string;

  // Filter
  classId?: string;
  subjectId?: string;
  sex?: "MALE" | "FEMALE";
  bloodType?: string;

  // Sorting
  sortBy?: "name" | "surname" | "email" | "createdAt";
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
}

export const getTeachers = async (params: GetTeachersParams = {}): Promise<GetTeachersResponse> => {
  try {
    // Default values for params:
    const { page = 1, limit = 10, search = "", classId, subjectId, sex, bloodType, sortBy = "createdAt", sortOrder = "desc" } = params;

    // Validasi:
    const validPage = Math.max(1, page);
    const validLimit = Math.min(Math.max(1, limit), 100);
    const skip = (validPage - 1) * validLimit;

    // WHERE clause:
    const where: Prisma.TeacherWhereInput = {};

    // Search di multiple fields:
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { surname: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { username: { contains: search, mode: "insensitive" } },
        { address: { contains: search, mode: "insensitive" } },
      ];
    }

    // Filter by class:
    if (classId) {
      where.classes = {
        some: { id: classId },
      };
    }

    // Filter by subject:
    if (subjectId) {
      where.subjects = {
        some: { id: subjectId },
      };
    }

    // Filter by gender:
    if (sex) {
      where.sex = sex;
    }

    // Filter by blood type:
    if (bloodType) {
      where.bloodType = bloodType;
    }

    // ORDER By:
    const orderBy: Prisma.TeacherOrderByWithRelationInput = {
      [sortBy]: sortOrder,
    };

    // Execute queries:
    const [teachers, total] = await Promise.all([
      prisma.teacher.findMany({
        where,
        include: {
          subjects: true,
          classes: true,
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
        orderBy,
        skip,
        take: validLimit,
      }),
      prisma.teacher.count({ where }),
    ]);

    // Pagination info:
    const totalPages = Math.ceil(total / validLimit);

    return {
      data: teachers as TeacherList[],
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
    console.error("Error in getTeachers:", error);
    return {
      data: [],
      pagination: {
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 0,
        hasNext: false,
        hasPrev: false,
      },
    };
  }
};

export const getTeacherById = async (id: string): Promise<TeacherList | null> => {
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

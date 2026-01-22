import { Prisma } from "@/generated/prisma/browser";
import { StudentList } from "../types/prisma-schema";
import prisma from "../config/prisma";

export interface GetStudentParams {
  // Pagination
  page?: number;
  limit?: number;

  // Search
  search?: string;

  // Filter
  studentId?: string;
  grade?: string;
  sex?: "MALE" | "FEMALE";

  // Sorting
  sortBy?: "name" | "surname" | "grade" | "createdAt";
  sortOrder?: "asc" | "desc";
}

export interface GetStudentsResponse {
  data: StudentList[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export const getStudents = async (params: GetStudentParams): Promise<GetStudentsResponse> => {
  try {
    const { page = 1, limit = 10, search = "", grade, sex: rawSex, sortBy = "createdAt", sortOrder = "desc" } = params;

    let sex: "MALE" | "FEMALE" | undefined;
    if (rawSex) {
      const normalizedSex = rawSex.toUpperCase();

      if (normalizedSex === "MALE" || normalizedSex === "FEMALE") {
        sex = normalizedSex as "MALE" | "FEMALE";
      }
    }

    const validPage = Math.max(1, page);
    const validLimit = Math.min(Math.max(1, limit), 100);
    const skip = (validPage - 1) * validLimit;

    // WHERE clause:
    const where: Prisma.StudentWhereInput = {};

    // Search in multiple fields:
    if (search) {
      where.OR = [{ name: { contains: search, mode: "insensitive" } }, { surname: { contains: search, mode: "insensitive" } }, { address: { contains: search, mode: "insensitive" } }, { phone: { contains: search, mode: "insensitive" } }];
    }

    // Filter by grade:
    if (grade) {
      where.grade = {
        level: parseInt(grade),
      };
    }

    // Filter by sex:
    if (sex) {
      where.sex = sex;
    }

    // Order By:
    const orderBy: Prisma.StudentOrderByWithRelationInput = {};

    if (sortBy === "grade") {
      // sort based on many to one relation:
      orderBy.grade = {
        level: sortOrder,
      };
    } else {
      // sort based on direct fields:
      orderBy[sortBy] = sortOrder;
    }

    // Execute queries:
    const [students, total] = await Promise.all([
      prisma.student.findMany({
        where,
        orderBy,
        skip,
        take: validLimit,
        include: {
          parent: true,
          class: true,
          grade: true,
          attendances: true,
          results: true,
        },
      }),
      prisma.student.count({ where }),
    ]);

    const totalPages = Math.ceil(total / validLimit);

    return {
      data: students as StudentList[],
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
    console.log("Error in fetching students:", error);
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

export const getStudent = async (id: string): Promise<StudentList | null> => {
  try {
    const student = await prisma.student.findUnique({
      where: { id },
      include: {
        parent: true,
        class: true,
        grade: true,
        attendances: true,
        results: true,
        _count: {
          select: {
            attendances: true,
            results: true,
          },
        },
      },
    });

    return student as StudentList | null;
  } catch (error) {
    console.log("Error in getTeacher:", error);
    return null;
  }
};

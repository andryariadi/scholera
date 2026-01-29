import { StudentList } from "../types/prisma-schema";
import prisma from "../config/prisma";
import { cacheLife, cacheTag } from "next/cache";
import { Prisma } from "@/generated/prisma/client";
import { calculatePagination, emptyPaginationResponse, handlePrismaError, validatePagination } from "../utils";

export interface GetStudentParams {
  // Pagination
  page?: number;
  limit?: number;

  // Search
  search?: string;

  // Filter
  sex?: "MALE" | "FEMALE";
  class?: string;
  grade?: string;
  teacher?: string;

  // Sorting
  sortBy?: "name" | "grade" | "createdAt";
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
  error?: string;
}

export const getStudents = async (params: GetStudentParams = {}): Promise<GetStudentsResponse> => {
  "use cache";
  cacheLife("hours");
  cacheTag("students", `students-page-${params.page || 1}`);

  try {
    const { page = 1, limit = 10, search = "", teacher, grade, class: className, sex: rawSex, sortBy = "createdAt", sortOrder = "desc" } = params;

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
    const andConditions: Prisma.StudentWhereInput[] = [];

    // Search in multiple fields:
    if (search) {
      const searchAsNumber = Number(search);
      const isNumeric = !isNaN(searchAsNumber) && search.trim() !== "";

      andConditions.push({
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { address: { contains: search, mode: "insensitive" } },
          { class: { name: { contains: search, mode: "insensitive" } } },
          ...(isNumeric ? [{ grade: { level: searchAsNumber } }] : []),
        ],
      });
    }

    // Filter by sex:
    if (sex) {
      andConditions.push({ sex });
    }

    // Filter by grade:
    if (grade) {
      andConditions.push({ grade: { level: parseInt(grade) } });
    }

    // Filter by class
    if (className) {
      andConditions.push({ class: { name: className } });
    }

    // Filter by teacher:
    if (teacher) {
      andConditions.push({ class: { supervisorId: teacher } });
    }

    // Final WHERE clause:
    const where: Prisma.StudentWhereInput = andConditions.length > 0 ? { AND: andConditions } : {};

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
          class: { include: { supervisor: true } },
          grade: true,
          attendances: true,
          results: true,
        },
      }),
      prisma.student.count({ where }),
    ]);

    // Calculate pagination:
    const pagination = calculatePagination(total, validPage, validLimit);

    return {
      data: students as StudentList[],
      pagination,
    };
  } catch (error) {
    console.log("Error in getTeachers:", error);

    return emptyPaginationResponse(handlePrismaError(error));
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

import { Prisma } from "@/generated/prisma/client";
import { ParentList } from "../types/prisma-schema";
import prisma from "../config/prisma";
import { cacheLife, cacheTag } from "next/cache";

export interface GetParentsParams {
  // Pagination
  page?: number;
  limit?: number;

  // Search
  search?: string;

  // Filter
  address?: string;
  email?: string;
  student?: string;

  // Sorting
  sortBy?: "name" | "username" | "phone" | "address" | "email" | "createdAt";
  sortOrder?: "asc" | "desc";
}

export interface GetParentsResponse {
  data: ParentList[];
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

export const getParents = async (params: GetParentsParams = {}): Promise<GetParentsResponse> => {
  "use cache";
  cacheLife("hours");
  cacheTag("parents", `parents-page-${params.page || 1}`);

  try {
    // Default values for params:
    const { page = 1, limit = 10, search = "", student, address, email, sortBy = "createdAt", sortOrder = "desc" } = params;

    // Validasi:
    const validPage = Math.max(1, page);
    const validLimit = Math.min(Math.max(1, limit), 100);
    const skip = (validPage - 1) * validLimit;

    // andConditions for WHERE clause:
    const andConditions: Prisma.ParentWhereInput[] = [];

    // Search in multiple fields:
    if (search) {
      const searchAsNumber = Number(search);
      const isNumeric = !isNaN(searchAsNumber) && search.trim() !== "";

      andConditions.push({
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { username: { contains: search, mode: "insensitive" } },
          { email: { contains: search, mode: "insensitive" } },
          { phone: { contains: search, mode: "insensitive" } },
          { address: { contains: search, mode: "insensitive" } },
          { students: { some: { name: { contains: search, mode: "insensitive" } } } },
        ],
      });
    }

    // Filter by address:
    if (address) {
      andConditions.push({ address: { contains: address, mode: "insensitive" } });
    }

    // Filter by phone:
    if (email) {
      andConditions.push({ email: { contains: email, mode: "insensitive" } });
    }

    // Filter by student:
    if (student) {
      andConditions.push({ students: { some: { name: { contains: student, mode: "insensitive" } } } });
    }

    // Final WHERE clause:
    const where: Prisma.ParentWhereInput = andConditions.length > 0 ? { AND: andConditions } : {};

    // Sorting
    const orderBy: Prisma.ParentOrderByWithRelationInput = {};

    orderBy[sortBy] = sortOrder;

    // Execute query:
    const [parents, total] = await Promise.all([
      prisma.parent.findMany({
        where,
        orderBy,
        skip,
        take: validLimit,
        include: {
          students: true,
        },
      }),
      prisma.parent.count({ where }),
    ]);

    const totalPages = Math.ceil(total / validLimit);

    return {
      data: parents as ParentList[],
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
    console.log("Error in getParents:", error);

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

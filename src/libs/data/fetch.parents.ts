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
  student?: string;
  address?: string;
  phone?: string;

  // Sorting
  sortBy?: "name" | "surname" | "phone" | "address" | "email" | "createdAt";
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
}

export const getParents = async (params: GetParentsParams = {}): Promise<GetParentsResponse> => {
  "use cache";
  cacheLife("hours");
  cacheTag("parents", `parents-page-${params.page || 1}`);

  try {
    // Default values for params:
    const { page = 1, limit = 10, search = "", student, address, phone, sortBy = "createdAt", sortOrder = "desc" } = params;

    // Validasi:
    const validPage = Math.max(1, page);
    const validLimit = Math.min(Math.max(1, limit), 100);
    const skip = (validPage - 1) * validLimit;

    // WHERE clause:
    const where: Prisma.ParentWhereInput = {};

    // Search in multiple fields:
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { surname: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { phone: { contains: search, mode: "insensitive" } },
        { address: { contains: search, mode: "insensitive" } },
        { students: { some: { name: { contains: search, mode: "insensitive" } } } },
      ];
    }

    // Filter by student:
    if (student) {
      where.students = {
        some: { id: student },
      };
    }

    // Filter by address:
    if (address) {
      where.address = { contains: address, mode: "insensitive" };
    }

    // Filter by phone:
    if (phone) {
      where.phone = { contains: phone, mode: "insensitive" };
    }

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

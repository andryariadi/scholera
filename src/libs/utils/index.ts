import { Prisma } from "@/generated/prisma/client";
import { auth } from "@clerk/nextjs/server";
import { UserMetadata, UserRole } from "../types/prisma-schema";

export const formatDate = (dateString: Date) => {
  const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

  const date = new Date(dateString);
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
};

export const formatDateISO = (dateInput: Date | string | undefined | null) => {
  if (!dateInput) {
    return "N/A";
  }

  if (typeof dateInput === "string") {
    return dateInput.split("T")[0];
  }

  const year = dateInput.getFullYear();
  const month = String(dateInput.getMonth() + 1).padStart(2, "0");
  const day = String(dateInput.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const formatTime = (dateInput: Date | string | undefined | null): string => {
  if (!dateInput) return "N/A";

  try {
    // Handle string atau Date
    const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;

    // Cek jika valid
    if (isNaN(date.getTime())) return "Invalid Time";

    // Format waktu menjadi HH:mm
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${hours}:${minutes}`;
  } catch (error) {
    console.error("Error formatting time:", error);
    return "Error";
  }
};

const getLatestMonday = (): Date => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  const latestMonday = today;
  latestMonday.setDate(today.getDate() - daysSinceMonday);
  return latestMonday;
};

export const adjustScheduleToCurrentWeek = (lessons: { title: string; start: Date; end: Date }[]): { title: string; start: Date; end: Date }[] => {
  const latestMonday = getLatestMonday();

  return lessons.map((lesson) => {
    const lessonDayOfWeek = lesson.start.getDay();

    const daysFromMonday = lessonDayOfWeek === 0 ? 6 : lessonDayOfWeek - 1;

    const adjustedStartDate = new Date(latestMonday);

    adjustedStartDate.setDate(latestMonday.getDate() + daysFromMonday);
    adjustedStartDate.setHours(lesson.start.getHours(), lesson.start.getMinutes(), lesson.start.getSeconds());
    const adjustedEndDate = new Date(adjustedStartDate);
    adjustedEndDate.setHours(lesson.end.getHours(), lesson.end.getMinutes(), lesson.end.getSeconds());

    return {
      title: lesson.title,
      start: adjustedStartDate,
      end: adjustedEndDate,
    };
  });
};

// Validation pagination:
export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface ValidatedPagination {
  validPage: number;
  validLimit: number;
  skip: number;
}

export const validatePagination = (params: PaginationParams): ValidatedPagination => {
  const page = params.page || 1;
  const limit = params.limit || 10;

  const validPage = Math.max(1, page);
  const validLimit = Math.min(Math.max(1, limit), 100);
  const skip = (validPage - 1) * validLimit;

  return { validPage, validLimit, skip };
};

// Calculate pagination:
export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export const calculatePagination = (total: number, page: number, limit: number): PaginationMeta => {
  const totalPages = Math.ceil(total / limit);

  return {
    total,
    page,
    limit,
    totalPages,
    hasNext: page < totalPages,
    hasPrev: page > 1,
  };
};

// Build WHERE clause:
export const buildWhereClause = <T>(conditions: T[]): T | { AND: T[] } => {
  return conditions.length > 0 ? ({ AND: conditions } as { AND: T[] }) : ({} as T);
};

// Handle Prisma errors:
export const handlePrismaError = (error: unknown): string => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return `Database error: ${error.code} - ${error.message}`;
  }

  if (error instanceof Prisma.PrismaClientValidationError) {
    return "Invalid query parameters";
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "An unexpected error occurred";
};

// Empty pagination response:
export const emptyPaginationResponse = <T>(
  errorMessage?: string,
): {
  data: T[];
  pagination: PaginationMeta;
  error?: string;
} => ({
  data: [],
  pagination: {
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
    hasNext: false,
    hasPrev: false,
  },
  error: errorMessage,
});

type CurrentUserResponse = {
  userId: string;
  role: UserRole | null;
};

// Get Current User:
export async function getCurrentUserRole(): Promise<CurrentUserResponse | null> {
  const { userId, sessionClaims } = await auth();

  if (!sessionClaims) return null;

  const userRole = (sessionClaims as UserMetadata).metadata?.role;

  return {
    userId,
    role: userRole ?? null,
  };
}

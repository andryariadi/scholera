"use server";

import { updateTag } from "next/cache";
import prisma from "../config/prisma";
import { subjectInput } from "../validations";
import { handleActionError } from "../utils";

type SubjectResponse = {
  id: string;
  name: string;
};

type ActionResult<T> = { success: true; data: T } | { success: false; error: string; code: string };

export const createSubject = async (data: subjectInput): Promise<ActionResult<SubjectResponse>> => {
  console.log({ data }, "<---actionData");

  try {
    // Validate teachers array is not empty
    if (!data.teachers || data.teachers.length === 0) {
      return {
        success: false,
        error: "At least one teacher must be selected",
        code: "VALIDATION_ERROR",
      };
    }

    const res = await prisma.subject.create({
      data: {
        name: data.name,
        teachers: {
          connect: data.teachers.map((teacherId) => ({ id: teacherId })),
        },
      },
      select: {
        id: true,
        name: true,
      },
    });

    updateTag("subjects");

    return { success: true, data: res };
  } catch (error) {
    return {
      success: false,
      ...handleActionError(error, "create", "subject"),
    };
  }
};

export const updateSubject = async (id: string, data: subjectInput): Promise<ActionResult<SubjectResponse>> => {
  console.log({ id, data }, "<---updateAction");

  try {
    const existingSubject = await prisma.subject.findUnique({
      where: { id },
    });

    if (!existingSubject) {
      return {
        success: false,
        error: "Subject not found",
        code: "NOT_FOUND_ERROR",
      };
    }

    if (!data.teachers || data.teachers.length === 0) {
      return {
        success: false,
        error: "At least one teacher must be selected",
        code: "VALIDATION_ERROR",
      };
    }

    const res = await prisma.subject.update({
      where: { id },
      data: {
        name: data.name,
        teachers: {
          set: data.teachers.map((teacherId) => ({ id: teacherId })),
        },
      },
      select: {
        id: true,
        name: true,
      },
    });

    updateTag("subjects");

    return { success: true, data: res };
  } catch (error) {
    return {
      success: false,
      ...handleActionError(error, "update", "subject"),
    };
  }
};

export const deleteSubject = async (id: string): Promise<ActionResult<{ id: string }>> => {
  try {
    const existingSubject = await prisma.subject.findUnique({
      where: { id },
    });

    if (!existingSubject) {
      return {
        success: false,
        error: "Subject not found",
        code: "NOT_FOUND_ERROR",
      };
    }

    await prisma.subject.delete({
      where: { id },
    });

    updateTag("subjects");

    return { success: true, data: { id } };
  } catch (error) {
    return {
      success: false,
      ...handleActionError(error, "delete", "subject"),
    };
  }
};

"use server";

import { updateTag } from "next/cache";
import prisma from "../config/prisma";
import { subjectInput } from "../validations";
import { handleActionError } from "../utils";

type ActionResult<T> = { success: true; data: T } | { success: false; error: string; code: string };

export const createSubject = async (data: subjectInput): Promise<ActionResult<subjectInput>> => {
  try {
    const res = await prisma.subject.create({
      data,
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

export const updateSubject = async (id: string, data: subjectInput): Promise<ActionResult<subjectInput>> => {
  try {
    const existingSubject = await prisma.subject.findUnique({
      where: {
        id,
      },
    });

    if (!existingSubject) {
      return {
        success: false,
        error: "Subject not found",
        code: "NOT_FOUND_ERROR",
      };
    }

    const res = await prisma.subject.update({
      where: {
        id,
      },
      data,
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
      where: {
        id,
      },
    });

    if (!existingSubject) {
      return {
        success: false,
        error: "Subject not found",
        code: "NOT_FOUND_ERROR",
      };
    }
    const res = await prisma.subject.delete({
      where: {
        id,
      },
    });

    updateTag("subjects");

    return { success: true, data: res };
  } catch (error) {
    return {
      success: false,
      ...handleActionError(error, "delete", "subject"),
    };
  }
};

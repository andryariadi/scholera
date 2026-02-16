"use server";

import { classInput } from "../validations";
import { handleActionError } from "../utils";
import prisma from "../config/prisma";
import { updateTag } from "next/cache";

type SubjectResponse = {
  id: string;
  name: string;
};

type ActionResult<T> = { success: true; data: T } | { success: false; error: string; code: string };

export const createClass = async (data: classInput): Promise<ActionResult<SubjectResponse>> => {
  console.log({ data }, "<---classAction");

  try {
    const res = await prisma.class.create({
      data: {
        name: data.name,
        capacity: data.capacity,
        gradeId: data.gradeId,
      },
      select: {
        id: true,
        name: true,
      },
    });

    updateTag("classes");

    return {
      success: true,
      data: res,
    };
  } catch (error) {
    return {
      success: false,
      ...handleActionError(error, "create", "class"),
    };
  }
};

export const updateClass = async (id: string, data: classInput): Promise<ActionResult<SubjectResponse>> => {
  console.log({ id, data }, "<---classAction");

  try {
    const existingClass = await prisma.class.findUnique({
      where: { id },
    });

    if (!existingClass) {
      return {
        success: false,
        error: "Class not found",
        code: "NOT_FOUND_ERROR",
      };
    }

    const res = await prisma.class.update({
      where: { id },
      data,
    });

    updateTag("classes");

    return {
      success: true,
      data: res,
    };
  } catch (error) {
    return {
      success: false,
      ...handleActionError(error, "update", "class"),
    };
  }
};

export const deleteClass = async (id: string): Promise<ActionResult<{ id: string }>> => {
  try {
    const existingClass = await prisma.class.findUnique({
      where: { id },
    });

    if (!existingClass) {
      return {
        success: false,
        error: "Class not found",
        code: "NOT_FOUND_ERROR",
      };
    }

    await prisma.class.delete({
      where: { id },
    });

    updateTag("classes");

    return { success: true, data: { id } };
  } catch (error) {
    return {
      success: false,
      ...handleActionError(error, "delete", "class"),
    };
  }
};

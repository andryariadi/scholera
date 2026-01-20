import { Class, Lesson, Subject, Teacher } from "@/generated/prisma/client";

interface columns {
  header: string;
  accessor: string;
  className?: string;
}

export interface TeacherColumns<T> {
  columns: columns[];
  renderRow: (item: T) => React.ReactNode;
  data: T[];
}

interface TableType {
  type: "teacher" | "student" | "parent" | "announcement" | "subject" | "class" | "lesson" | "result" | "exam" | "assignment" | "event" | "attendance";
}

interface FormModal<T> {
  table: TableType["type"];
  type: "create" | "update" | "delete";
  id?: string;
  data?: T;
}

export type TeacherList = Teacher & { subjects: Subject[] } & { classes: Class[] } & { lessons: Lesson[] };

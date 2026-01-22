import { Attendance, Class, Grade, Lesson, Parent, Result, Student, Subject, Teacher } from "@/generated/prisma/client";

interface columns {
  header: string;
  accessor: string;
  className?: string;
}

export interface TableColumns<T> {
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

export type TeacherList = Teacher & { subjects: Subject[] } & { classes: Class[] } & { lessons: Lesson[] } & { _count: { subjects: number; classes: number; lessons: number } };

export type StudentList = Student & { attendances: Attendance[] } & { results: Result[] } & { parent: Parent } & { class: Class } & { grade: Grade } & { _count: { attendances: number; results: number } };

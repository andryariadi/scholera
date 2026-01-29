import { Announcement, Assignment, Attendance, Class, Event, Exam, Grade, Lesson, Parent, Result, Student, Subject, Teacher } from "@/generated/prisma/client";

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

export type StudentList = Student & { attendances: Attendance[] } & { results: Result[] } & { parent: Parent } & { class: Class & { supervisor: Teacher } } & { grade: Grade } & { _count: { attendances: number; results: number } };

export type ParentList = Parent & { students: Student[] } & { _count: { students: number } };

export type SubjectList = Subject & { teachers: Teacher[] } & { lessons: Lesson[] } & { _count: { teachers: number; lessons: number } };

export type ClassList = Class & { supervisor: Teacher } & { grade: Grade } & { students: Student[] } & { lessons: Lesson[] } & { events: Event[] } & { announcements: Announcement[] } & { _count: { students: number; lessons: number } };

export type LessonList = Lesson & { subject: Subject } & { class: Class & { students: Student[] } } & { teacher: Teacher } & { exams: Exam[] } & { assignments: Assignment[] } & { attendances: Attendance[] } & {
  _count: { exams: number; assignments: number; attendances: number };
};

export type ExamList = Exam & { lesson: Lesson & { class: Class; teacher: Teacher; subject: Subject } } & { results: Result[] };

export type AssignmentList = Assignment & { lesson: Lesson & { class: Class; teacher: Teacher; subject: Subject } } & { results: Result[] };

export type ResultList = Result & { student: Student } & { exam: Exam | null } & { assignment: (Assignment & { lesson: Lesson & { class: Class; teacher: Teacher; subject: Subject } }) | null };

export type EventList = Event & { class: Class };

export type AnnouncementList = Announcement & { class: Class };

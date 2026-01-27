import { classData, gradeData, subjectData } from "../constants";

export interface FilterOption {
  key: string;
  label: string;
  type: "select" | "text" | "date";
  options?: { value: string | number; label: string }[];
  placeholder?: string;
}

export interface TableFilterContentProps {
  filters: FilterOption[];
  title?: string;
}

// Teachers Filter Configuration:
export const teacherFilterConfig: FilterOption[] = [
  {
    key: "sex",
    label: "Gender",
    type: "select",
    options: [
      { value: "male", label: "Male" },
      { value: "female", label: "Female" },
    ],
  },
  {
    key: "subject",
    label: "Subject",
    type: "select",
    options: subjectData.map((subject) => ({ value: subject.name, label: subject.name })),
  },
  {
    key: "class",
    label: "Class",
    type: "select",
    options: classData.map((clss) => ({ value: clss.name, label: clss.name })),
  },
];

// Students Filter Configuration:
export const studentFilterConfig: FilterOption[] = [
  {
    key: "sex",
    label: "Gender",
    type: "select",
    options: [
      { value: "MALE", label: "Male" },
      { value: "FEMALE", label: "Female" },
    ],
  },
  {
    key: "grade",
    label: "Grade",
    type: "select",
    options: gradeData.map((grade) => ({ value: grade.value, label: grade.label })),
  },
  {
    key: "class",
    label: "Class",
    type: "select",
    options: classData.map((clss) => ({ value: clss.name, label: clss.name })),
  },
];

// Parents Filter Configuration:
export const parentFilterConfig: FilterOption[] = [
  {
    key: "email",
    label: "Email",
    type: "text",
    placeholder: "Search by email...",
  },
  {
    key: "phone",
    label: "Phone",
    type: "text",
    placeholder: "Search by phone...",
  },
];

// Lessons Filter Configuration:
export const subjectFilterConfig: FilterOption[] = [
  {
    key: "name",
    label: "Subject Name",
    type: "select",
    options: subjectData.map((subject) => ({ value: subject.name, label: subject.name })),
  },
];

export const classFilterConfig: FilterOption[] = [
  {
    key: "capacity",
    label: "Capacity",
    type: "select",
    options: Array.from({ length: 20 }, (_, i) => ({
      value: String(i + 1),
      label: String(i + 1),
    })),
  },
  {
    key: "grade",
    label: "Grade",
    type: "select",
    options: gradeData.map((grade) => ({ value: grade.value, label: grade.label })),
  },
];

// Lessons Filter Configuration:
export const lessonFilterConfig: FilterOption[] = [
  {
    key: "class",
    label: "Class",
    type: "select",
    options: classData.map((clss) => ({ value: clss.name, label: clss.name })),
  },
  {
    key: "day",
    label: "Day",
    type: "select",
    options: [
      { value: "MONDAY", label: "Monday" },
      { value: "TUESDAY", label: "Tuesday" },
      { value: "WEDNESDAY", label: "Wednesday" },
      { value: "THURSDAY", label: "Thursday" },
      { value: "FRIDAY", label: "Friday" },
    ],
  },
];

// Exams Filter Configuration:
export const examFilterConfig: FilterOption[] = [
  {
    key: "subject",
    label: "Subject",
    type: "select",
    options: subjectData.map((subject) => ({ value: subject.name, label: subject.name })),
  },
  {
    key: "class",
    label: "Class",
    type: "select",
    options: classData.map((clss) => ({ value: clss.name, label: clss.name })),
  },
  // {
  //   key: "teacher",
  //   label: "Teacher",
  //   type: "select",
  //   options: [], // Fetch from API
  // },
];

// Assignments Filter Configuration:
export const assignmentFilterConfig: FilterOption[] = [
  {
    key: "subject",
    label: "Subject",
    type: "select",
    options: subjectData.map((subject) => ({ value: subject.name, label: subject.name })),
  },
  {
    key: "class",
    label: "Class",
    type: "select",
    options: classData.map((clss) => ({ value: clss.name, label: clss.name })),
  },
  // {
  //   key: "teacher",
  //   label: "Teacher",
  //   type: "select",
  //   options: [], // Fetch from API
  // },
];

// Results Filter Configuration:
export const resultFilterConfig: FilterOption[] = [
  {
    key: "subject",
    label: "Subject",
    type: "select",
    options: subjectData.map((subject) => ({ value: subject.name, label: subject.name })),
  },
  {
    key: "class",
    label: "Class",
    type: "select",
    options: classData.map((clss) => ({ value: clss.name, label: clss.name })),
  },
  // {
  //   key: "teacher",
  //   label: "Teacher",
  //   type: "select",
  //   options: [], // Fetch from API
  // },
];

// Events Filter Configuration:
export const eventFilterConfig: FilterOption[] = [
  {
    key: "class",
    label: "Class",
    type: "select",
    options: classData.map((clss) => ({ value: clss.name, label: clss.name })),
  },
];

// Announcements Filter Configuration:
export const announcementFilterConfig: FilterOption[] = [
  {
    key: "class",
    label: "Class",
    type: "select",
    options: classData.map((clss) => ({ value: clss.name, label: clss.name })),
  },
];

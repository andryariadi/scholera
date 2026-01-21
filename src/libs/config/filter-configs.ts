import { FilterOption } from "@/components/TableFilter";

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
    key: "bloodType",
    label: "Blood Type",
    type: "select",
    options: [
      { value: "A+", label: "A+" },
      { value: "A-", label: "A-" },
      { value: "B+", label: "B+" },
      { value: "B-", label: "B-" },
      { value: "AB+", label: "AB+" },
      { value: "AB-", label: "AB-" },
      { value: "O+", label: "O+" },
      { value: "O-", label: "O-" },
    ],
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
    key: "bloodType",
    label: "Blood Type",
    type: "select",
    options: [
      { value: "A+", label: "A+" },
      { value: "A-", label: "A-" },
      { value: "B+", label: "B+" },
      { value: "B-", label: "B-" },
      { value: "AB+", label: "AB+" },
      { value: "AB-", label: "AB-" },
      { value: "O+", label: "O+" },
      { value: "O-", label: "O-" },
    ],
  },
  {
    key: "gradeId",
    label: "Grade",
    type: "select",
    options: [
      { value: "1", label: "Grade 1" },
      { value: "2", label: "Grade 2" },
      { value: "3", label: "Grade 3" },
      { value: "4", label: "Grade 4" },
      { value: "5", label: "Grade 5" },
      { value: "6", label: "Grade 6" },
    ],
  },
  {
    key: "classId",
    label: "Class",
    type: "select",
    options: [],
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
export const lessonFilterConfig: FilterOption[] = [
  {
    key: "subjectId",
    label: "Subject",
    type: "select",
    options: [], // Fetch from API
  },
  {
    key: "classId",
    label: "Class",
    type: "select",
    options: [], // Fetch from API
  },
  {
    key: "teacherId",
    label: "Teacher",
    type: "select",
    options: [], // Fetch from API
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
      { value: "SATURDAY", label: "Saturday" },
      { value: "SUNDAY", label: "Sunday" },
    ],
  },
];

// Exams Filter Configuration:
export const examFilterConfig: FilterOption[] = [
  {
    key: "lessonId",
    label: "Lesson",
    type: "select",
    options: [], // Fetch from API
  },
  {
    key: "startDate",
    label: "Start Date",
    type: "date",
  },
  {
    key: "endDate",
    label: "End Date",
    type: "date",
  },
];

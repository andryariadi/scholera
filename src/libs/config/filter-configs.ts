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
    options: [
      { value: "Mathematics", label: "Mathematics" },
      { value: "Science", label: "Science" },
      { value: "English", label: "English" },
      { value: "History", label: "History" },
      { value: "Geography", label: "Geography" },
      { value: "Physics", label: "Physics" },
      { value: "Chemistry", label: "Chemistry" },
      { value: "Biology", label: "Biology" },
      { value: "Computer Science", label: "Computer Science" },
      { value: "Art", label: "Art" },
    ], // Much better to if options fetch from API
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
    options: [
      { value: "1", label: "Grade 1" },
      { value: "2", label: "Grade 2" },
      { value: "3", label: "Grade 3" },
      { value: "4", label: "Grade 4" },
      { value: "5", label: "Grade 5" },
      { value: "6", label: "Grade 6" },
    ],
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
    options: [], // Fetch from API
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
    options: Array.from({ length: 6 }, (_, i) => ({
      value: String(i + 1),
      label: String(i + 1),
    })),
  },
];

// Lessons Filter Configuration:
export const lessonFilterConfig: FilterOption[] = [
  {
    key: "name",
    label: "Lesson Name",
    type: "select",
    options: [],
  },
  {
    key: "class",
    label: "Class",
    type: "select",
    options: [],
  },
  {
    key: "teacher",
    label: "Teacher",
    type: "select",
    options: [],
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

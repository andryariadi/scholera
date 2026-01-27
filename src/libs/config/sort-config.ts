export interface SortOption {
  value: string;
  label: string;
  order: "asc" | "desc";
}

export const teacherSortOptions: SortOption[] = [
  { value: "name", label: "Name (A-Z)", order: "asc" },
  { value: "name", label: "Name (Z-A)", order: "desc" },
  { value: "class", label: "Class (Low to High)", order: "asc" },
  { value: "class", label: "Class (High to Low)", order: "desc" },
  { value: "createdAt", label: "Newest", order: "desc" },
  { value: "createdAt", label: "Oldest", order: "asc" },
];

export const studentSortOptions: SortOption[] = [
  { value: "name", label: "Name (A-Z)", order: "asc" },
  { value: "name", label: "Name (Z-A)", order: "desc" },
  { value: "grade", label: "Grade (Low to High)", order: "asc" },
  { value: "grade", label: "Grade (High to Low)", order: "desc" },
  { value: "createdAt", label: "Newest", order: "desc" },
  { value: "createdAt", label: "Oldest", order: "asc" },
];

export const parentSortOptions: SortOption[] = [
  { value: "name", label: "Name (A-Z)", order: "asc" },
  { value: "name", label: "Name (Z-A)", order: "desc" },
  { value: "email", label: "Email (A-Z)", order: "asc" },
  { value: "email", label: "Email (Z-A)", order: "desc" },
  { value: "createdAt", label: "Newest", order: "desc" },
  { value: "createdAt", label: "Oldest", order: "asc" },
];

export const subjectSortOptions: SortOption[] = [
  { value: "name", label: "Name (A-Z)", order: "asc" },
  { value: "name", label: "Name (Z-A)", order: "desc" },
];

export const classSortOptions: SortOption[] = [
  { value: "name", label: "Name (A-Z)", order: "asc" },
  { value: "name", label: "Name (Z-A)", order: "desc" },
  { value: "grade", label: "Grade (Low to High)", order: "asc" },
  { value: "grade", label: "Grade (High to Low)", order: "desc" },
  { value: "capacity", label: "Capacity (Low to High)", order: "asc" },
  { value: "capacity", label: "Capacity (High to Low)", order: "desc" },
];

export const lessonSortOptions: SortOption[] = [
  { value: "name", label: "Name (A-Z)", order: "asc" },
  { value: "name", label: "Name (Z-A)", order: "desc" },
  { value: "class", label: "Class (A-Z)", order: "asc" },
  { value: "class", label: "Class (Z-A)", order: "desc" },
  { value: "teacher", label: "Teacher (A-Z)", order: "asc" },
  { value: "teacher", label: "Teacher (Z-A)", order: "desc" },
  { value: "day", label: "Day (A-Z)", order: "asc" },
  { value: "day", label: "Day (Z-A)", order: "desc" },
];

export const examSortOptions: SortOption[] = [
  { value: "subject", label: "Subject (A-Z)", order: "asc" },
  { value: "subject", label: "Subject (Z-A)", order: "desc" },
  { value: "class", label: "Class (A-Z)", order: "asc" },
  { value: "class", label: "Class (Z-A)", order: "desc" },
  { value: "teacher", label: "Teacher (A-Z)", order: "asc" },
  { value: "teacher", label: "Teacher (Z-A)", order: "desc" },
];

export const assignmentSortOptions: SortOption[] = [
  { value: "subject", label: "Subject (A-Z)", order: "asc" },
  { value: "subject", label: "Subject (Z-A)", order: "desc" },
  { value: "class", label: "Class (A-Z)", order: "asc" },
  { value: "class", label: "Class (Z-A)", order: "desc" },
  { value: "teacher", label: "Teacher (A-Z)", order: "asc" },
  { value: "teacher", label: "Teacher (Z-A)", order: "desc" },
];

export const resultSortOptions: SortOption[] = [
  { value: "subject", label: "Subject (A-Z)", order: "asc" },
  { value: "subject", label: "Subject (Z-A)", order: "desc" },
  { value: "class", label: "Class (A-Z)", order: "asc" },
  { value: "class", label: "Class (Z-A)", order: "desc" },
  { value: "teacher", label: "Teacher (A-Z)", order: "asc" },
  { value: "teacher", label: "Teacher (Z-A)", order: "desc" },
  { value: "score", label: "Score (High to Low)", order: "desc" },
  { value: "score", label: "Score (Low to High)", order: "asc" },
];

export const eventSortOptions: SortOption[] = [
  { value: "title", label: "Title (A-Z)", order: "asc" },
  { value: "title", label: "Title (Z-A)", order: "desc" },
  { value: "class", label: "Class (A-Z)", order: "asc" },
  { value: "class", label: "Class (Z-A)", order: "desc" },
];

export const announcementSortOptions: SortOption[] = [
  { value: "title", label: "Title (A-Z)", order: "asc" },
  { value: "title", label: "Title (Z-A)", order: "desc" },
  { value: "class", label: "Class (A-Z)", order: "asc" },
  { value: "class", label: "Class (Z-A)", order: "desc" },
];

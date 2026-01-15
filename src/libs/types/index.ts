interface columns {
  header: string;
  accessor: string;
  className?: string;
}

interface TeacherColumns<T> {
  columns: columns[];
  renderRow: (item: T) => React.ReactNode;
  data: T[];
}

interface Teacher {
  id: number;
  teacherId: string;
  name: string;
  email?: string;
  photo: string;
  phone: string;
  subjects: string[];
  classes: string[];
  address: string;
}

type Student = {
  id: number;
  studentId: string;
  name: string;
  email?: string;
  photo: string;
  phone?: string;
  grade: number;
  class: string;
  address: string;
};

type Parent = {
  id: number;
  name: string;
  email?: string;
  students: string[];
  phone: string;
  address: string;
};

type Announcement = {
  id: number;
  title: string;
  class: string;
  date: string;
};

type Subject = {
  id: number;
  name: string;
  teachers: string[];
};

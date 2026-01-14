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

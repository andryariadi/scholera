import { Home, GraduationCap, Users, User, BookOpen, School, NotebookText, FileText, ClipboardList, BarChart3, CalendarDays, MessageSquare, Megaphone, Settings, LogOut } from "lucide-react";

export const menuItems = [
  {
    title: "MENU",
    items: [
      {
        icon: Home,
        label: "Home",
        href: "/",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: GraduationCap,
        label: "Teachers",
        href: "/teacher",
        visible: ["admin", "teacher"],
      },
      {
        icon: Users,
        label: "Students",
        href: "/student",
        visible: ["admin", "teacher"],
      },
      {
        icon: User,
        label: "Parents",
        href: "/parent",
        visible: ["admin", "teacher"],
      },
      {
        icon: BookOpen,
        label: "Subjects",
        href: "/subject",
        visible: ["admin"],
      },
      {
        icon: School,
        label: "Classes",
        href: "/classe",
        visible: ["admin", "teacher"],
      },
      {
        icon: NotebookText,
        label: "Lessons",
        href: "/lesson",
        visible: ["admin", "teacher"],
      },
      {
        icon: FileText,
        label: "Exams",
        href: "/exams",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: ClipboardList,
        label: "Assignments",
        href: "/assignment",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: BarChart3,
        label: "Results",
        href: "/result",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: ClipboardList,
        label: "Attendance",
        href: "/attendance",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: CalendarDays,
        label: "Events",
        href: "/event",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: MessageSquare,
        label: "Messages",
        href: "/message",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: Megaphone,
        label: "Announcements",
        href: "/announcement",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
  {
    title: "OTHER",
    items: [
      {
        icon: User,
        label: "Profile",
        href: "/profile",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: Settings,
        label: "Settings",
        href: "/setting",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: LogOut,
        label: "Logout",
        href: "/logout",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
];

export const studentsData = [
  {
    name: "Total",
    count: 130,
    fill: "white",
  },
  {
    name: "Girls",
    count: 73,
    fill: "#FAE27C",
  },
  {
    name: "Boys",
    count: 57,
    fill: "#C3EBFA",
  },
];

export const attendanceData = [
  {
    name: "Mon",
    present: 60,
    absent: 40,
  },
  {
    name: "Tue",
    present: 70,
    absent: 60,
  },
  {
    name: "Wed",
    present: 90,
    absent: 75,
  },
  {
    name: "Thu",
    present: 90,
    absent: 75,
  },
  {
    name: "Fri",
    present: 65,
    absent: 55,
  },
];

export const financeData = [
  {
    name: "Jan",
    income: 4000,
    expense: 2400,
  },
  {
    name: "Feb",
    income: 3000,
    expense: 1398,
  },
  {
    name: "Mar",
    income: 2000,
    expense: 9800,
  },
  {
    name: "Apr",
    income: 2780,
    expense: 3908,
  },
  {
    name: "May",
    income: 1890,
    expense: 4800,
  },
  {
    name: "Jun",
    income: 2390,
    expense: 3800,
  },
  {
    name: "Jul",
    income: 3490,
    expense: 4300,
  },
  {
    name: "Aug",
    income: 3490,
    expense: 4300,
  },
  {
    name: "Sep",
    income: 8490,
    expense: 4300,
  },
  {
    name: "Oct",
    income: 2490,
    expense: 6300,
  },
  {
    name: "Nov",
    income: 5490,
    expense: 3300,
  },
  {
    name: "Dec",
    income: 8490,
    expense: 8300,
  },
];

export const eventsData = [
  {
    id: 1,
    title: "School Orientation Day",
    date: "2025-01-08",
    time: "08:00 AM - 11:00 AM",
    location: "Main Hall",
    description: "An orientation program for new students to introduce school rules, teachers, and academic activities.",
    category: "Academic",
  },
  {
    id: 2,
    title: "Parent-Teacher Meeting",
    date: "2025-01-12",
    time: "01:00 PM - 04:00 PM",
    location: "Classrooms",
    description: "A scheduled meeting between parents and teachers to discuss students' progress and performance.",
    category: "Meeting",
  },
  {
    id: 3,
    title: "Midterm Examination",
    date: "2025-01-20",
    time: "07:30 AM - 12:00 PM",
    location: "Exam Rooms",
    description: "Midterm examinations for all grades. Students are required to arrive 30 minutes earlier.",
    category: "Exam",
  },
  {
    id: 4,
    title: "School Sports Day",
    date: "2025-01-25",
    time: "07:00 AM - 03:00 PM",
    location: "School Field",
    description: "A full-day sports event to encourage teamwork, discipline, and physical fitness among students.",
    category: "Activity",
  },
];

export const announcementsData = [
  {
    id: 1,
    title: "New Academic Year Started",
    date: "2025-01-01",
    description: "The new academic year has officially started. Please make sure all students are registered and schedules are finalized.",
    variant: "sky",
  },
  {
    id: 2,
    title: "Parent-Teacher Meeting",
    date: "2025-01-05",
    description: "A parent-teacher meeting will be held to discuss student progress and upcoming school programs.",
    variant: "purple",
  },
  {
    id: 3,
    title: "Midterm Examination Schedule",
    date: "2025-01-10",
    description: "The midterm examination schedule has been published. Students are advised to prepare accordingly.",
    variant: "yellow",
  },
];

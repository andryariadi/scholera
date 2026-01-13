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
    count: 106,
    fill: "white",
  },
  {
    name: "Girls",
    count: 53,
    fill: "#FAE27C",
  },
  {
    name: "Boys",
    count: 53,
    fill: "#C3EBFA",
  },
];

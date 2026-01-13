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
        href: "/teachers",
        visible: ["admin", "teacher"],
      },
      {
        icon: Users,
        label: "Students",
        href: "/students",
        visible: ["admin", "teacher"],
      },
      {
        icon: User,
        label: "Parents",
        href: "/parents",
        visible: ["admin", "teacher"],
      },
      {
        icon: BookOpen,
        label: "Subjects",
        href: "/subjects",
        visible: ["admin"],
      },
      {
        icon: School,
        label: "Classes",
        href: "/classes",
        visible: ["admin", "teacher"],
      },
      {
        icon: NotebookText,
        label: "Lessons",
        href: "/lessons",
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
        href: "/assignments",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: BarChart3,
        label: "Results",
        href: "/results",
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
        href: "/events",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: MessageSquare,
        label: "Messages",
        href: "/messages",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: Megaphone,
        label: "Announcements",
        href: "/announcements",
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
        href: "/settings",
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

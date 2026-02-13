import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Suspense } from "react";
import Loader from "@/components/skeletons/Loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Scholera | School Management System",
    template: "%s | Scholera",
  },
  description: "Scholera is a modern school management system designed to manage students, teachers, classes, schedules, and school administration efficiently in one centralized platform.",
  category: "education",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Suspense fallback={<Loader />}>
          <ClerkProvider>
            {children}

            <ToastContainer position="top-right" theme="dark" />
          </ClerkProvider>
        </Suspense>
      </body>
    </html>
  );
}

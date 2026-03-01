"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";
import { UserRole } from "@/lib/types";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [role, setRole] = useState<UserRole>("patient");
  const [userName, setUserName] = useState("Rachid Amrani");
  const pathname = usePathname();

  useEffect(() => {
    const storedRole = localStorage.getItem("userRole") as UserRole | null;
    const storedName = localStorage.getItem("userName");
    if (storedRole) setRole(storedRole);
    if (storedName) setUserName(storedName);
  }, []);

  // Determine role from path as fallback
  useEffect(() => {
    if (pathname.startsWith("/doctor")) {
      setRole("doctor");
      if (!localStorage.getItem("userName")) {
        setUserName("Dr. Sarah Mitchell");
      }
    } else if (pathname.startsWith("/patient")) {
      setRole("patient");
      if (!localStorage.getItem("userName")) {
        setUserName("Rachid Amrani");
      }
    }
  }, [pathname]);

  return (
    <div className="min-h-screen bg-neutral-50 flex">
      <Sidebar
        role={role}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar
          role={role}
          userName={userName}
          onMenuClick={() => setSidebarOpen(true)}
        />
        <main className="flex-1 p-4 lg:p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}

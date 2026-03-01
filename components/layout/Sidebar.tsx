"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { NAV_ITEMS_PATIENT, NAV_ITEMS_DOCTOR } from "@/lib/constants";
import {
  LayoutDashboard,
  Search,
  CalendarDays,
  Clock,
  User,
  Heart,
  X,
} from "lucide-react";
import { UserRole } from "@/lib/types";

const iconMap: Record<string, React.ReactNode> = {
  LayoutDashboard: <LayoutDashboard size={20} />,
  Search: <Search size={20} />,
  CalendarDays: <CalendarDays size={20} />,
  Clock: <Clock size={20} />,
  User: <User size={20} />,
};

interface SidebarProps {
  role: UserRole;
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ role, open, onClose }: SidebarProps) {
  const pathname = usePathname();
  const navItems = role === "patient" ? NAV_ITEMS_PATIENT : NAV_ITEMS_DOCTOR;

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-neutral-200 flex flex-col transition-transform duration-300 lg:translate-x-0 lg:static lg:z-auto",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-neutral-200">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <Heart size={18} className="text-white" />
            </div>
            <span className="text-lg font-bold text-neutral-900">
              Tabib<span className="text-primary-600">Connect</span>
            </span>
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden p-1 rounded-lg text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== `/${role}` && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150",
                  isActive
                    ? "bg-primary-50 text-primary-700"
                    : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
                )}
              >
                <span className={cn(isActive ? "text-primary-600" : "text-neutral-400")}>
                  {iconMap[item.icon]}
                </span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom section */}
        <div className="p-4 border-t border-neutral-200">
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary-50">
            <div className="w-8 h-8 bg-primary-200 rounded-full flex items-center justify-center">
              <Heart size={14} className="text-primary-700" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-primary-900 truncate">
                {role === "patient" ? "Patient Portal" : "Doctor Portal"}
              </p>
              <p className="text-xs text-primary-600">TabibConnect v1.0</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

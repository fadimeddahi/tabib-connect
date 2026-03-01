"use client";

import { Bell, Menu, LogOut } from "lucide-react";
import Avatar from "@/components/ui/Avatar";
import Link from "next/link";
import { UserRole } from "@/lib/types";

interface TopBarProps {
  role: UserRole;
  userName: string;
  onMenuClick: () => void;
}

export default function TopBar({ role, userName, onMenuClick }: TopBarProps) {
  return (
    <header className="sticky top-0 z-30 h-16 bg-white border-b border-neutral-200 flex items-center justify-between px-4 lg:px-6">
      {/* Left section */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg text-neutral-500 hover:bg-neutral-100 transition-colors"
        >
          <Menu size={20} />
        </button>
        <div className="hidden sm:block">
          <h2 className="text-sm font-medium text-neutral-500">
            Welcome back,
          </h2>
          <p className="text-sm font-semibold text-neutral-900">{userName}</p>
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-2">
        {/* Notifications */}
        <button className="relative p-2 rounded-lg text-neutral-500 hover:bg-neutral-100 transition-colors">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger rounded-full" />
        </button>

        {/* User menu */}
        <div className="flex items-center gap-3 ml-2 pl-3 border-l border-neutral-200">
          <Avatar name={userName} size="sm" />
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-neutral-900">{userName}</p>
            <p className="text-xs text-neutral-500 capitalize">{role}</p>
          </div>
          <Link
            href="/"
            className="p-2 rounded-lg text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 transition-colors"
            title="Log out"
          >
            <LogOut size={16} />
          </Link>
        </div>
      </div>
    </header>
  );
}

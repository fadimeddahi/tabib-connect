import { AppointmentStatus } from "./types";

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function formatTime(time: string): string {
  const [hours, minutes] = time.split(":").map(Number);
  const ampm = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${minutes.toString().padStart(2, "0")} ${ampm}`;
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function getStatusColor(status: AppointmentStatus): string {
  const colors: Record<AppointmentStatus, string> = {
    pending: "bg-warning-light text-warning",
    confirmed: "bg-success-light text-success",
    cancelled: "bg-danger-light text-danger",
    completed: "bg-neutral-200 text-neutral-600",
  };
  return colors[status];
}

export function getStatusDotColor(status: AppointmentStatus): string {
  const colors: Record<AppointmentStatus, string> = {
    pending: "bg-warning",
    confirmed: "bg-success",
    cancelled: "bg-danger",
    completed: "bg-neutral-400",
  };
  return colors[status];
}

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}

export function getDaysUntil(dateStr: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(dateStr);
  target.setHours(0, 0, 0, 0);
  return Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

import { cn } from "@/lib/utils";
import { AppointmentStatus } from "@/lib/types";

type BadgeVariant = "success" | "warning" | "danger" | "neutral" | "primary";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  dot?: boolean;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  success: "bg-success-light text-green-700",
  warning: "bg-warning-light text-amber-700",
  danger: "bg-danger-light text-red-700",
  neutral: "bg-neutral-100 text-neutral-600",
  primary: "bg-primary-50 text-primary-700",
};

const dotColors: Record<BadgeVariant, string> = {
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-danger",
  neutral: "bg-neutral-400",
  primary: "bg-primary-500",
};

export default function Badge({ children, variant = "neutral", dot = false, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium",
        variantStyles[variant],
        className
      )}
    >
      {dot && <span className={cn("w-1.5 h-1.5 rounded-full", dotColors[variant])} />}
      {children}
    </span>
  );
}

export function StatusBadge({ status }: { status: AppointmentStatus }) {
  const variantMap: Record<AppointmentStatus, BadgeVariant> = {
    confirmed: "success",
    pending: "warning",
    cancelled: "danger",
    completed: "neutral",
  };

  const labelMap: Record<AppointmentStatus, string> = {
    confirmed: "Confirmed",
    pending: "Pending",
    cancelled: "Cancelled",
    completed: "Completed",
  };

  return (
    <Badge variant={variantMap[status]} dot>
      {labelMap[status]}
    </Badge>
  );
}

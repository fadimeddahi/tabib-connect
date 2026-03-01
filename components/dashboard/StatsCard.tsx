import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  description?: string;
  trend?: { value: string; positive: boolean };
  className?: string;
}

export default function StatsCard({
  title,
  value,
  icon,
  description,
  trend,
  className,
}: StatsCardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-xl border border-neutral-200 p-5 shadow-sm",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-neutral-500">{title}</p>
          <p className="text-2xl font-bold text-neutral-900 mt-1">{value}</p>
          {description && (
            <p className="text-xs text-neutral-400 mt-1">{description}</p>
          )}
          {trend && (
            <p
              className={cn(
                "text-xs font-medium mt-1",
                trend.positive ? "text-success" : "text-danger"
              )}
            >
              {trend.positive ? "↑" : "↓"} {trend.value}
            </p>
          )}
        </div>
        <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center text-primary-600 shrink-0">
          {icon}
        </div>
      </div>
    </div>
  );
}

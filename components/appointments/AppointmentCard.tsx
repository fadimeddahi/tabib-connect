import Link from "next/link";
import { Clock, MapPin, Video, Building2 } from "lucide-react";
import Avatar from "@/components/ui/Avatar";
import { StatusBadge } from "@/components/ui/Badge";
import { Appointment } from "@/lib/types";
import { formatDate, formatTime } from "@/lib/utils";

interface AppointmentCardProps {
  appointment: Appointment;
  perspective: "patient" | "doctor";
  onCancel?: (id: string) => void;
  onConfirm?: (id: string) => void;
}

export default function AppointmentCard({
  appointment,
  perspective,
  onCancel,
  onConfirm,
}: AppointmentCardProps) {
  const name =
    perspective === "patient"
      ? appointment.doctorName
      : appointment.patientName;
  const subtitle =
    perspective === "patient"
      ? appointment.doctorSpecialty
      : `Patient`;

  return (
    <div className="bg-white rounded-xl border border-neutral-200 p-4 hover:border-primary-200 transition-colors">
      <div className="flex items-start gap-3">
        <Avatar name={name} size="md" />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h4 className="text-sm font-semibold text-neutral-900">{name}</h4>
              <p className="text-xs text-primary-600">{subtitle}</p>
            </div>
            <StatusBadge status={appointment.status} />
          </div>

          <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-neutral-500">
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {formatDate(appointment.date)} at {formatTime(appointment.time)}
            </span>
            <span className="flex items-center gap-1">
              {appointment.type === "video" ? (
                <Video size={12} />
              ) : (
                <Building2 size={12} />
              )}
              {appointment.type === "video" ? "Video Call" : "In-Person"}
            </span>
          </div>

          {appointment.notes && (
            <p className="text-xs text-neutral-400 mt-2 truncate">
              {appointment.notes}
            </p>
          )}

          {/* Actions */}
          {(appointment.status === "pending" || appointment.status === "confirmed") && (
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-neutral-100">
              {appointment.status === "pending" && perspective === "doctor" && onConfirm && (
                <button
                  onClick={() => onConfirm(appointment.id)}
                  className="text-xs font-medium text-success hover:text-green-700 transition-colors"
                >
                  Confirm
                </button>
              )}
              {onCancel && (
                <button
                  onClick={() => onCancel(appointment.id)}
                  className="text-xs font-medium text-danger hover:text-red-700 transition-colors"
                >
                  Cancel
                </button>
              )}
              {perspective === "patient" && (
                <Link
                  href={`/doctors/${appointment.doctorId}`}
                  className="text-xs font-medium text-primary-600 hover:text-primary-700 transition-colors ml-auto"
                >
                  View Doctor
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

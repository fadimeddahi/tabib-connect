import Link from "next/link";
import { Star, MapPin, Clock, DollarSign, Globe } from "lucide-react";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import { Doctor } from "@/lib/types";

interface DoctorCardProps {
  doctor: Doctor;
}

export default function DoctorCard({ doctor }: DoctorCardProps) {
  const availableSlots = doctor.availability.reduce(
    (count, day) => count + day.slots.filter((s) => s.available).length,
    0
  );

  return (
    <Link
      href={`/doctors/${doctor.id}`}
      className="block bg-white rounded-2xl border border-neutral-200 p-6 hover:border-primary-300 hover:shadow-lg transition-all duration-200 group"
    >
      <div className="flex items-start gap-4">
        <Avatar name={doctor.name} size="lg" />
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold text-neutral-900 group-hover:text-primary-700 transition-colors">
            {doctor.name}
          </h3>
          <p className="text-sm text-primary-600 font-medium">{doctor.specialty}</p>

          <div className="flex items-center gap-3 mt-2 text-sm text-neutral-500">
            <span className="flex items-center gap-1">
              <Star size={14} className="text-amber-400 fill-amber-400" />
              {doctor.rating}
              <span className="text-neutral-400">({doctor.reviewCount})</span>
            </span>
            <span className="flex items-center gap-1">
              <Clock size={14} />
              {doctor.experience}y exp
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-2 text-sm text-neutral-500">
          <MapPin size={14} className="shrink-0" />
          <span className="truncate">{doctor.location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-neutral-500">
          <Globe size={14} className="shrink-0" />
          <span>{doctor.languages.join(", ")}</span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between pt-4 border-t border-neutral-100">
        <div className="flex items-center gap-1 text-sm font-semibold text-neutral-900">
          <DollarSign size={14} />
          {doctor.consultationFee}
          <span className="font-normal text-neutral-400">/visit</span>
        </div>
        <Badge variant={availableSlots > 0 ? "success" : "danger"} dot>
          {availableSlots > 0 ? `${availableSlots} slots available` : "No slots"}
        </Badge>
      </div>
    </Link>
  );
}

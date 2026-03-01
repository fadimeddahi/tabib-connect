"use client";

import { use } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Star,
  MapPin,
  Clock,
  DollarSign,
  Globe,
  GraduationCap,
  Heart,
  CalendarCheck,
  CheckCircle2,
} from "lucide-react";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { mockDoctors } from "@/data/mock";
import { formatTime } from "@/lib/utils";

export default function DoctorProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const doctor = mockDoctors.find((d) => d.id === id);

  if (!doctor) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-neutral-900 mb-2">Doctor not found</h1>
          <Link href="/doctors" className="text-primary-600 hover:text-primary-700 font-medium">
            Back to doctors
          </Link>
        </div>
      </div>
    );
  }

  const availableSlots = doctor.availability.reduce(
    (count, day) => count + day.slots.filter((s) => s.available).length,
    0
  );

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/doctors"
              className="flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-primary-600 transition-colors"
            >
              <ArrowLeft size={16} />
              Back to doctors
            </Link>
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <Heart size={16} className="text-white" />
              </div>
              <span className="text-lg font-bold text-neutral-900">
                Tabib<span className="text-primary-600">Connect</span>
              </span>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Header */}
            <div className="bg-white rounded-2xl border border-neutral-200 p-6">
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <Avatar name={doctor.name} size="xl" />
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-neutral-900">{doctor.name}</h1>
                  <p className="text-primary-600 font-medium">{doctor.specialty}</p>

                  <div className="flex flex-wrap items-center gap-4 mt-3">
                    <span className="flex items-center gap-1 text-sm">
                      <Star size={16} className="text-amber-400 fill-amber-400" />
                      <span className="font-semibold">{doctor.rating}</span>
                      <span className="text-neutral-400">({doctor.reviewCount} reviews)</span>
                    </span>
                    <span className="flex items-center gap-1 text-sm text-neutral-500">
                      <Clock size={16} />
                      {doctor.experience} years experience
                    </span>
                    <span className="flex items-center gap-1 text-sm text-neutral-500">
                      <DollarSign size={16} />
                      ${doctor.consultationFee}/visit
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4">
                    <Badge variant="success" dot>
                      {availableSlots} slots available
                    </Badge>
                    <Badge variant="primary">
                      <CheckCircle2 size={12} /> Verified
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* About */}
            <div className="bg-white rounded-2xl border border-neutral-200 p-6">
              <h2 className="text-lg font-semibold text-neutral-900 mb-3">About</h2>
              <p className="text-sm text-neutral-600 leading-relaxed">{doctor.bio}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center shrink-0">
                    <MapPin size={18} className="text-primary-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-900">Location</p>
                    <p className="text-sm text-neutral-500">{doctor.location}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center shrink-0">
                    <GraduationCap size={18} className="text-primary-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-900">Education</p>
                    <p className="text-sm text-neutral-500">{doctor.education}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center shrink-0">
                    <Globe size={18} className="text-primary-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-900">Languages</p>
                    <p className="text-sm text-neutral-500">{doctor.languages.join(", ")}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center shrink-0">
                    <Clock size={18} className="text-primary-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-900">Experience</p>
                    <p className="text-sm text-neutral-500">{doctor.experience} years in practice</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Availability Schedule */}
            <div className="bg-white rounded-2xl border border-neutral-200 p-6">
              <h2 className="text-lg font-semibold text-neutral-900 mb-4">Weekly Schedule</h2>
              <div className="space-y-3">
                {doctor.availability.map((day) => (
                  <div
                    key={day.day}
                    className={`flex items-start gap-4 p-3 rounded-lg ${
                      day.enabled ? "bg-neutral-50" : "bg-neutral-50/50 opacity-50"
                    }`}
                  >
                    <span className="text-sm font-medium text-neutral-900 w-24 shrink-0">
                      {day.day}
                    </span>
                    {day.enabled ? (
                      <div className="flex flex-wrap gap-2">
                        {day.slots.map((slot) => (
                          <span
                            key={slot.id}
                            className={`px-2 py-1 rounded-md text-xs font-medium ${
                              slot.available
                                ? "bg-success-light text-green-700"
                                : "bg-neutral-200 text-neutral-500 line-through"
                            }`}
                          >
                            {formatTime(slot.startTime)}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-sm text-neutral-400">Not available</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar — Booking */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-neutral-200 p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-neutral-900 mb-1">
                Book an Appointment
              </h2>
              <p className="text-sm text-neutral-500 mb-6">
                Choose a time that works for you
              </p>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                  <span className="text-sm text-neutral-600">Consultation Fee</span>
                  <span className="text-lg font-bold text-neutral-900">
                    ${doctor.consultationFee}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-success-light rounded-lg">
                  <span className="text-sm text-green-700">Available Slots</span>
                  <span className="text-sm font-semibold text-green-700">
                    {availableSlots} this week
                  </span>
                </div>

                <Link href={`/patient/book/${doctor.id}`}>
                  <Button className="w-full" size="lg">
                    <CalendarCheck size={18} />
                    Book Appointment
                  </Button>
                </Link>

                <p className="text-xs text-neutral-400 text-center">
                  Free cancellation up to 24 hours before
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

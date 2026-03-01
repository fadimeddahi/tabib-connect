"use client";

import { use, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Clock,
  CheckCircle2,
  Heart,
  Video,
  Building2,
} from "lucide-react";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import { mockDoctors } from "@/data/mock";
import { formatTime, cn } from "@/lib/utils";

const AVAILABLE_DATES = [
  { date: "2026-03-02", dayName: "Mon", dayNum: "2" },
  { date: "2026-03-03", dayName: "Tue", dayNum: "3" },
  { date: "2026-03-04", dayName: "Wed", dayNum: "4" },
  { date: "2026-03-05", dayName: "Thu", dayNum: "5" },
  { date: "2026-03-06", dayName: "Fri", dayNum: "6" },
  { date: "2026-03-07", dayName: "Sat", dayNum: "7" },
  { date: "2026-03-09", dayName: "Mon", dayNum: "9" },
];

export default function BookingPage({
  params,
}: {
  params: Promise<{ doctorId: string }>;
}) {
  const { doctorId } = use(params);
  const doctor = mockDoctors.find((d) => d.id === doctorId);

  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [appointmentType, setAppointmentType] = useState<"in-person" | "video">("in-person");
  const [notes, setNotes] = useState("");
  const [booked, setBooked] = useState(false);

  if (!doctor) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-neutral-900 mb-2">Doctor not found</h1>
          <Link href="/doctors" className="text-primary-600 hover:text-primary-700 font-medium">
            Back to doctors
          </Link>
        </div>
      </div>
    );
  }

  // Get available time slots based on selected date
  const getDayName = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { weekday: "long" });
  };

  const availableSlots = selectedDate
    ? doctor.availability
        .find((d) => d.day === getDayName(selectedDate))
        ?.slots.filter((s) => s.available) || []
    : [];

  const handleBook = () => {
    setBooked(true);
  };

  if (booked) {
    return (
      <div className="max-w-lg mx-auto py-12">
        <div className="bg-white rounded-2xl border border-neutral-200 p-8 text-center">
          <div className="w-16 h-16 bg-success-light rounded-2xl flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 size={32} className="text-success" />
          </div>
          <h1 className="text-2xl font-bold text-neutral-900 mb-2">
            Appointment Booked!
          </h1>
          <p className="text-sm text-neutral-500 mb-6">
            Your appointment has been successfully scheduled. You will receive a
            confirmation shortly.
          </p>

          <div className="bg-neutral-50 rounded-xl p-4 text-left space-y-3 mb-6">
            <div className="flex items-center gap-3">
              <Avatar name={doctor.name} size="md" />
              <div>
                <p className="text-sm font-semibold text-neutral-900">{doctor.name}</p>
                <p className="text-xs text-primary-600">{doctor.specialty}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-neutral-600">
              <CalendarDays size={14} />
              {new Date(selectedDate).toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </div>
            <div className="flex items-center gap-2 text-sm text-neutral-600">
              <Clock size={14} />
              {formatTime(selectedTime)}
            </div>
            <div className="flex items-center gap-2 text-sm text-neutral-600">
              {appointmentType === "video" ? <Video size={14} /> : <Building2 size={14} />}
              {appointmentType === "video" ? "Video Call" : "In-Person Visit"}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Link href="/patient/appointments">
              <Button className="w-full">View My Appointments</Button>
            </Link>
            <Link href="/patient">
              <Button variant="outline" className="w-full">
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Back link */}
      <Link
        href={`/doctors/${doctor.id}`}
        className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-primary-600 transition-colors mb-6"
      >
        <ArrowLeft size={16} />
        Back to doctor profile
      </Link>

      {/* Progress Steps */}
      <div className="flex items-center gap-2 mb-8">
        {[
          { num: 1, label: "Date" },
          { num: 2, label: "Time" },
          { num: 3, label: "Confirm" },
        ].map((s, i) => (
          <div key={s.num} className="flex items-center gap-2 flex-1">
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold shrink-0",
                step >= s.num
                  ? "bg-primary-600 text-white"
                  : "bg-neutral-200 text-neutral-500"
              )}
            >
              {step > s.num ? <CheckCircle2 size={16} /> : s.num}
            </div>
            <span
              className={cn(
                "text-sm font-medium hidden sm:block",
                step >= s.num ? "text-primary-600" : "text-neutral-400"
              )}
            >
              {s.label}
            </span>
            {i < 2 && (
              <div
                className={cn(
                  "flex-1 h-0.5 rounded",
                  step > s.num ? "bg-primary-600" : "bg-neutral-200"
                )}
              />
            )}
          </div>
        ))}
      </div>

      {/* Doctor summary */}
      <div className="bg-white rounded-xl border border-neutral-200 p-4 flex items-center gap-4 mb-6">
        <Avatar name={doctor.name} size="lg" />
        <div>
          <h2 className="text-base font-semibold text-neutral-900">{doctor.name}</h2>
          <p className="text-sm text-primary-600">{doctor.specialty}</p>
          <p className="text-xs text-neutral-500 mt-0.5">${doctor.consultationFee}/visit</p>
        </div>
      </div>

      {/* Step 1: Select Date */}
      {step === 1 && (
        <div className="bg-white rounded-2xl border border-neutral-200 p-6">
          <h3 className="text-lg font-semibold text-neutral-900 mb-1">
            Select a Date
          </h3>
          <p className="text-sm text-neutral-500 mb-6">
            Choose your preferred appointment date
          </p>

          <div className="grid grid-cols-4 sm:grid-cols-7 gap-3">
            {AVAILABLE_DATES.map((d) => {
              const daySchedule = doctor.availability.find(
                (day) => day.day === getDayName(d.date)
              );
              const hasSlots =
                daySchedule?.enabled &&
                daySchedule.slots.some((s) => s.available);

              return (
                <button
                  key={d.date}
                  disabled={!hasSlots}
                  onClick={() => {
                    setSelectedDate(d.date);
                    setSelectedTime("");
                  }}
                  className={cn(
                    "flex flex-col items-center p-3 rounded-xl text-sm transition-all border",
                    selectedDate === d.date
                      ? "bg-primary-600 text-white border-primary-600 shadow-lg shadow-primary-200"
                      : hasSlots
                      ? "bg-white border-neutral-200 text-neutral-700 hover:border-primary-300 hover:bg-primary-50"
                      : "bg-neutral-50 border-neutral-100 text-neutral-300 cursor-not-allowed"
                  )}
                >
                  <span className="text-xs font-medium">{d.dayName}</span>
                  <span className="text-lg font-bold mt-1">{d.dayNum}</span>
                  <span className="text-[10px] mt-0.5">Mar</span>
                </button>
              );
            })}
          </div>

          <div className="flex justify-end mt-6">
            <Button
              disabled={!selectedDate}
              onClick={() => setStep(2)}
            >
              Continue
              <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      )}

      {/* Step 2: Select Time */}
      {step === 2 && (
        <div className="bg-white rounded-2xl border border-neutral-200 p-6">
          <h3 className="text-lg font-semibold text-neutral-900 mb-1">
            Select a Time Slot
          </h3>
          <p className="text-sm text-neutral-500 mb-6">
            Available slots for{" "}
            {new Date(selectedDate).toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </p>

          {/* Appointment type */}
          <div className="flex gap-3 mb-6">
            <button
              onClick={() => setAppointmentType("in-person")}
              className={cn(
                "flex-1 flex items-center gap-2 p-3 rounded-xl border text-sm font-medium transition-all",
                appointmentType === "in-person"
                  ? "border-primary-300 bg-primary-50 text-primary-700"
                  : "border-neutral-200 text-neutral-500 hover:border-primary-200"
              )}
            >
              <Building2 size={18} />
              In-Person
            </button>
            <button
              onClick={() => setAppointmentType("video")}
              className={cn(
                "flex-1 flex items-center gap-2 p-3 rounded-xl border text-sm font-medium transition-all",
                appointmentType === "video"
                  ? "border-primary-300 bg-primary-50 text-primary-700"
                  : "border-neutral-200 text-neutral-500 hover:border-primary-200"
              )}
            >
              <Video size={18} />
              Video Call
            </button>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {availableSlots.map((slot) => (
              <button
                key={slot.id}
                onClick={() => setSelectedTime(slot.startTime)}
                className={cn(
                  "py-3 px-2 rounded-xl text-sm font-medium border transition-all",
                  selectedTime === slot.startTime
                    ? "bg-primary-600 text-white border-primary-600 shadow-lg shadow-primary-200"
                    : "bg-white border-neutral-200 text-neutral-700 hover:border-primary-300 hover:bg-primary-50"
                )}
              >
                {formatTime(slot.startTime)}
              </button>
            ))}
          </div>

          {availableSlots.length === 0 && (
            <p className="text-center text-sm text-neutral-500 py-8">
              No available slots for this date
            </p>
          )}

          <div className="flex justify-between mt-6">
            <Button variant="outline" onClick={() => setStep(1)}>
              <ArrowLeft size={16} />
              Back
            </Button>
            <Button disabled={!selectedTime} onClick={() => setStep(3)}>
              Continue
              <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Confirm */}
      {step === 3 && (
        <div className="bg-white rounded-2xl border border-neutral-200 p-6">
          <h3 className="text-lg font-semibold text-neutral-900 mb-1">
            Confirm Your Appointment
          </h3>
          <p className="text-sm text-neutral-500 mb-6">
            Review the details and confirm your booking
          </p>

          <div className="space-y-4 bg-neutral-50 rounded-xl p-4 mb-6">
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-500">Doctor</span>
              <span className="text-sm font-medium text-neutral-900">{doctor.name}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-500">Specialty</span>
              <span className="text-sm font-medium text-neutral-900">{doctor.specialty}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-500">Date</span>
              <span className="text-sm font-medium text-neutral-900">
                {new Date(selectedDate).toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-500">Time</span>
              <span className="text-sm font-medium text-neutral-900">
                {formatTime(selectedTime)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-500">Type</span>
              <span className="text-sm font-medium text-neutral-900 flex items-center gap-1">
                {appointmentType === "video" ? <Video size={14} /> : <Building2 size={14} />}
                {appointmentType === "video" ? "Video Call" : "In-Person"}
              </span>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-neutral-200">
              <span className="text-sm font-medium text-neutral-700">Consultation Fee</span>
              <span className="text-lg font-bold text-neutral-900">
                ${doctor.consultationFee}
              </span>
            </div>
          </div>

          {/* Notes */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">
              Notes (optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Describe your symptoms or reason for visit..."
              rows={3}
              className="block w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setStep(2)}>
              <ArrowLeft size={16} />
              Back
            </Button>
            <Button onClick={handleBook} size="lg">
              <CalendarDays size={18} />
              Confirm Booking
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

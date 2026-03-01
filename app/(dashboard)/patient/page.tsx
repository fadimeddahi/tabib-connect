"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CalendarDays,
  CheckCircle2,
  Clock,
  Search,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import StatsCard from "@/components/dashboard/StatsCard";
import AppointmentCard from "@/components/appointments/AppointmentCard";
import Button from "@/components/ui/Button";
import { mockAppointments } from "@/data/mock";

export default function PatientDashboard() {
  const [appointments, setAppointments] = useState(mockAppointments);

  const upcoming = appointments.filter(
    (a) =>
      (a.status === "confirmed" || a.status === "pending") &&
      new Date(a.date) >= new Date("2026-03-01")
  );
  const completed = appointments.filter((a) => a.status === "completed");
  const pending = appointments.filter((a) => a.status === "pending");

  const handleCancel = (id: string) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "cancelled" as const } : a))
    );
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Dashboard</h1>
          <p className="text-sm text-neutral-500 mt-1">
            Here&apos;s an overview of your healthcare activity
          </p>
        </div>
        <Link href="/doctors">
          <Button>
            <Search size={16} />
            Find a Doctor
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Upcoming"
          value={upcoming.length}
          icon={<CalendarDays size={20} />}
          description="Appointments scheduled"
        />
        <StatsCard
          title="Pending"
          value={pending.length}
          icon={<Clock size={20} />}
          description="Awaiting confirmation"
        />
        <StatsCard
          title="Completed"
          value={completed.length}
          icon={<CheckCircle2 size={20} />}
          description="Past appointments"
        />
        <StatsCard
          title="Doctors Visited"
          value={new Set(completed.map((a) => a.doctorId)).size}
          icon={<TrendingUp size={20} />}
          description="Different specialists"
        />
      </div>

      {/* Upcoming Appointments */}
      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm">
        <div className="flex items-center justify-between p-5 border-b border-neutral-100">
          <div>
            <h2 className="text-lg font-semibold text-neutral-900">
              Upcoming Appointments
            </h2>
            <p className="text-sm text-neutral-500">
              Your next scheduled visits
            </p>
          </div>
          <Link
            href="/patient/appointments"
            className="flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
          >
            View all
            <ArrowRight size={14} />
          </Link>
        </div>
        <div className="p-5 space-y-3">
          {upcoming.length > 0 ? (
            upcoming.slice(0, 3).map((apt) => (
              <AppointmentCard
                key={apt.id}
                appointment={apt}
                perspective="patient"
                onCancel={handleCancel}
              />
            ))
          ) : (
            <div className="text-center py-8">
              <CalendarDays size={32} className="text-neutral-300 mx-auto mb-3" />
              <p className="text-sm text-neutral-500">No upcoming appointments</p>
              <Link href="/doctors" className="text-sm font-medium text-primary-600 hover:text-primary-700">
                Book one now
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          href="/doctors"
          className="flex items-center gap-4 bg-white rounded-xl border border-neutral-200 p-5 hover:border-primary-300 hover:shadow-md transition-all group"
        >
          <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center group-hover:bg-primary-100 transition-colors">
            <Search size={22} className="text-primary-600" />
          </div>
          <div>
            <p className="text-sm font-semibold text-neutral-900">Find a Doctor</p>
            <p className="text-xs text-neutral-500">Search by specialty</p>
          </div>
        </Link>
        <Link
          href="/patient/appointments"
          className="flex items-center gap-4 bg-white rounded-xl border border-neutral-200 p-5 hover:border-primary-300 hover:shadow-md transition-all group"
        >
          <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center group-hover:bg-green-100 transition-colors">
            <CalendarDays size={22} className="text-green-600" />
          </div>
          <div>
            <p className="text-sm font-semibold text-neutral-900">My Appointments</p>
            <p className="text-xs text-neutral-500">View all appointments</p>
          </div>
        </Link>
        <Link
          href="/patient/appointments"
          className="flex items-center gap-4 bg-white rounded-xl border border-neutral-200 p-5 hover:border-primary-300 hover:shadow-md transition-all group"
        >
          <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center group-hover:bg-purple-100 transition-colors">
            <CheckCircle2 size={22} className="text-purple-600" />
          </div>
          <div>
            <p className="text-sm font-semibold text-neutral-900">History</p>
            <p className="text-xs text-neutral-500">View past visits</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

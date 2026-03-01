"use client";

import { useState } from "react";
import {
  CalendarDays,
  Users,
  Clock,
  CheckCircle2,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import StatsCard from "@/components/dashboard/StatsCard";
import AppointmentCard from "@/components/appointments/AppointmentCard";
import { mockAppointments } from "@/data/mock";

export default function DoctorDashboard() {
  const [appointments, setAppointments] = useState(mockAppointments);

  const todayStr = "2026-03-01";
  const todaysAppointments = appointments.filter(
    (a) => a.date === todayStr && a.status !== "cancelled"
  );
  const pendingCount = appointments.filter((a) => a.status === "pending").length;
  const confirmedCount = appointments.filter((a) => a.status === "confirmed").length;
  const completedCount = appointments.filter((a) => a.status === "completed").length;
  const totalPatients = new Set(appointments.map((a) => a.patientId)).size;

  const upcoming = appointments.filter(
    (a) =>
      (a.status === "confirmed" || a.status === "pending") &&
      new Date(a.date) >= new Date(todayStr)
  );

  const handleConfirm = (id: string) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "confirmed" as const } : a))
    );
  };

  const handleCancel = (id: string) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "cancelled" as const } : a))
    );
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Dashboard</h1>
        <p className="text-sm text-neutral-500 mt-1">
          Overview of your practice and appointments
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Today's Appointments"
          value={todaysAppointments.length}
          icon={<CalendarDays size={20} />}
          description="Scheduled for today"
        />
        <StatsCard
          title="Pending Requests"
          value={pendingCount}
          icon={<Clock size={20} />}
          description="Awaiting your confirmation"
          trend={pendingCount > 0 ? { value: "Action needed", positive: false } : undefined}
        />
        <StatsCard
          title="Total Patients"
          value={totalPatients}
          icon={<Users size={20} />}
          description="Unique patients"
        />
        <StatsCard
          title="Completed"
          value={completedCount}
          icon={<CheckCircle2 size={20} />}
          description="Successfully treated"
          trend={{ value: "+12% this month", positive: true }}
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
              Manage your upcoming patient visits
            </p>
          </div>
          <Link
            href="/doctor/appointments"
            className="flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
          >
            View all
            <ArrowRight size={14} />
          </Link>
        </div>
        <div className="p-5 space-y-3">
          {upcoming.length > 0 ? (
            upcoming.slice(0, 4).map((apt) => (
              <AppointmentCard
                key={apt.id}
                appointment={apt}
                perspective="doctor"
                onConfirm={handleConfirm}
                onCancel={handleCancel}
              />
            ))
          ) : (
            <div className="text-center py-8">
              <CalendarDays size={32} className="text-neutral-300 mx-auto mb-3" />
              <p className="text-sm text-neutral-500">No upcoming appointments</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          href="/doctor/appointments"
          className="flex items-center gap-4 bg-white rounded-xl border border-neutral-200 p-5 hover:border-primary-300 hover:shadow-md transition-all group"
        >
          <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center group-hover:bg-primary-100 transition-colors">
            <CalendarDays size={22} className="text-primary-600" />
          </div>
          <div>
            <p className="text-sm font-semibold text-neutral-900">All Appointments</p>
            <p className="text-xs text-neutral-500">View & manage all</p>
          </div>
        </Link>
        <Link
          href="/doctor/schedule"
          className="flex items-center gap-4 bg-white rounded-xl border border-neutral-200 p-5 hover:border-primary-300 hover:shadow-md transition-all group"
        >
          <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center group-hover:bg-green-100 transition-colors">
            <Clock size={22} className="text-green-600" />
          </div>
          <div>
            <p className="text-sm font-semibold text-neutral-900">My Schedule</p>
            <p className="text-xs text-neutral-500">Set availability</p>
          </div>
        </Link>
        <div className="flex items-center gap-4 bg-white rounded-xl border border-neutral-200 p-5">
          <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
            <TrendingUp size={22} className="text-purple-600" />
          </div>
          <div>
            <p className="text-sm font-semibold text-neutral-900">Analytics</p>
            <p className="text-xs text-neutral-500">Coming soon</p>
          </div>
        </div>
      </div>
    </div>
  );
}

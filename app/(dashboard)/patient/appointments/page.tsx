"use client";

import { useState } from "react";
import { CalendarDays } from "lucide-react";
import AppointmentCard from "@/components/appointments/AppointmentCard";
import { mockAppointments } from "@/data/mock";
import { AppointmentStatus } from "@/lib/types";

type TabKey = "upcoming" | "past" | "cancelled";

const tabs: { key: TabKey; label: string }[] = [
  { key: "upcoming", label: "Upcoming" },
  { key: "past", label: "Past" },
  { key: "cancelled", label: "Cancelled" },
];

export default function PatientAppointmentsPage() {
  const [appointments, setAppointments] = useState(mockAppointments);
  const [activeTab, setActiveTab] = useState<TabKey>("upcoming");

  const handleCancel = (id: string) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "cancelled" as AppointmentStatus } : a))
    );
  };

  const filtered = appointments.filter((a) => {
    if (activeTab === "upcoming")
      return a.status === "confirmed" || a.status === "pending";
    if (activeTab === "past") return a.status === "completed";
    if (activeTab === "cancelled") return a.status === "cancelled";
    return true;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">My Appointments</h1>
        <p className="text-sm text-neutral-500 mt-1">
          Manage and track all your appointments
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-neutral-100 rounded-lg p-1 w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === tab.key
                ? "bg-white text-primary-700 shadow-sm"
                : "text-neutral-500 hover:text-neutral-700"
            }`}
          >
            {tab.label}
            <span className="ml-1.5 text-xs text-neutral-400">
              ({appointments.filter((a) => {
                if (tab.key === "upcoming") return a.status === "confirmed" || a.status === "pending";
                if (tab.key === "past") return a.status === "completed";
                if (tab.key === "cancelled") return a.status === "cancelled";
                return false;
              }).length})
            </span>
          </button>
        ))}
      </div>

      {/* Appointment List */}
      <div className="space-y-3">
        {filtered.length > 0 ? (
          filtered.map((apt) => (
            <AppointmentCard
              key={apt.id}
              appointment={apt}
              perspective="patient"
              onCancel={apt.status !== "cancelled" && apt.status !== "completed" ? handleCancel : undefined}
            />
          ))
        ) : (
          <div className="text-center py-16 bg-white rounded-xl border border-neutral-200">
            <CalendarDays size={40} className="text-neutral-300 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-neutral-900 mb-1">
              No appointments
            </h3>
            <p className="text-sm text-neutral-500">
              {activeTab === "upcoming"
                ? "You don't have any upcoming appointments"
                : activeTab === "past"
                ? "No past appointments to show"
                : "No cancelled appointments"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { useState, useMemo } from "react";
import { CalendarDays, Filter } from "lucide-react";
import AppointmentCard from "@/components/appointments/AppointmentCard";
import { mockAppointments } from "@/data/mock";

type TabType = "all" | "pending" | "confirmed" | "completed" | "cancelled";

export default function DoctorAppointmentsPage() {
  const [appointments, setAppointments] = useState(mockAppointments);
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = useMemo(() => {
    let result = appointments;
    if (activeTab !== "all") {
      result = result.filter((a) => a.status === activeTab);
    }
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      result = result.filter(
        (a) =>
          a.patientName.toLowerCase().includes(q) ||
          a.notes?.toLowerCase().includes(q)
      );
    }
    return result.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [appointments, activeTab, searchTerm]);

  const counts = useMemo(
    () => ({
      all: appointments.length,
      pending: appointments.filter((a) => a.status === "pending").length,
      confirmed: appointments.filter((a) => a.status === "confirmed").length,
      completed: appointments.filter((a) => a.status === "completed").length,
      cancelled: appointments.filter((a) => a.status === "cancelled").length,
    }),
    [appointments]
  );

  const tabs: { key: TabType; label: string }[] = [
    { key: "all", label: "All" },
    { key: "pending", label: "Pending" },
    { key: "confirmed", label: "Confirmed" },
    { key: "completed", label: "Completed" },
    { key: "cancelled", label: "Cancelled" },
  ];

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
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Appointments</h1>
        <p className="text-sm text-neutral-500 mt-1">
          Manage and track all your patient appointments
        </p>
      </div>

      {/* Search + Tabs */}
      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm">
        {/* Search */}
        <div className="p-4 border-b border-neutral-100">
          <div className="relative max-w-sm">
            <Filter
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
            />
            <input
              type="text"
              placeholder="Search by patient name…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 px-4 pt-3 border-b border-neutral-100 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2.5 text-sm font-medium rounded-t-lg transition-colors whitespace-nowrap ${
                activeTab === tab.key
                  ? "text-primary-600 border-b-2 border-primary-600 bg-primary-50/50"
                  : "text-neutral-500 hover:text-neutral-700 hover:bg-neutral-50"
              }`}
            >
              {tab.label}
              <span
                className={`ml-1.5 px-1.5 py-0.5 text-xs rounded-full ${
                  activeTab === tab.key
                    ? "bg-primary-100 text-primary-700"
                    : "bg-neutral-100 text-neutral-500"
                }`}
              >
                {counts[tab.key]}
              </span>
            </button>
          ))}
        </div>

        {/* Results */}
        <div className="p-4 space-y-3">
          {filtered.length > 0 ? (
            filtered.map((apt) => (
              <AppointmentCard
                key={apt.id}
                appointment={apt}
                perspective="doctor"
                onConfirm={handleConfirm}
                onCancel={handleCancel}
              />
            ))
          ) : (
            <div className="text-center py-12">
              <CalendarDays
                size={36}
                className="text-neutral-300 mx-auto mb-3"
              />
              <p className="text-sm font-medium text-neutral-600">
                No appointments found
              </p>
              <p className="text-xs text-neutral-400 mt-1">
                {searchTerm
                  ? "Try adjusting your search"
                  : "No appointments in this category yet"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

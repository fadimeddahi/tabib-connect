"use client";

import { useState, useCallback } from "react";
import { Clock, Save, RotateCcw } from "lucide-react";
import Button from "@/components/ui/Button";
import { DAYS_OF_WEEK, TIME_SLOTS } from "@/lib/constants";

type ScheduleMap = Record<string, string[]>;

const DEFAULT_SCHEDULE: ScheduleMap = {
  monday: ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "14:00", "14:30", "15:00", "15:30"],
  tuesday: ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "14:00", "14:30", "15:00", "15:30"],
  wednesday: ["09:00", "09:30", "10:00", "10:30", "11:00"],
  thursday: ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "14:00", "14:30", "15:00", "15:30"],
  friday: ["09:00", "09:30", "10:00", "10:30"],
  saturday: [],
  sunday: [],
};

export default function DoctorSchedulePage() {
  const [schedule, setSchedule] = useState<ScheduleMap>(DEFAULT_SCHEDULE);
  const [saved, setSaved] = useState(false);
  const [selectedDay, setSelectedDay] = useState("monday");

  const toggleSlot = useCallback(
    (day: string, slot: string) => {
      setSchedule((prev) => {
        const current = prev[day] || [];
        const has = current.includes(slot);
        return {
          ...prev,
          [day]: has ? current.filter((s) => s !== slot) : [...current, slot].sort(),
        };
      });
      setSaved(false);
    },
    []
  );

  const toggleAllDay = useCallback(
    (day: string) => {
      setSchedule((prev) => {
        const current = prev[day] || [];
        if (current.length === TIME_SLOTS.length) {
          return { ...prev, [day]: [] };
        }
        return { ...prev, [day]: [...TIME_SLOTS] };
      });
      setSaved(false);
    },
    []
  );

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleReset = () => {
    setSchedule(DEFAULT_SCHEDULE);
    setSaved(false);
  };

  const totalSlots = Object.values(schedule).reduce(
    (sum, slots) => sum + slots.length,
    0
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">My Schedule</h1>
          <p className="text-sm text-neutral-500 mt-1">
            Set your weekly availability for patient appointments
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleReset}>
            <RotateCcw size={14} className="mr-1.5" />
            Reset
          </Button>
          <Button size="sm" onClick={handleSave}>
            <Save size={14} className="mr-1.5" />
            {saved ? "Saved!" : "Save Schedule"}
          </Button>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white rounded-xl border border-neutral-200 p-4 text-center">
          <p className="text-2xl font-bold text-primary-600">{totalSlots}</p>
          <p className="text-xs text-neutral-500 mt-0.5">Total slots / week</p>
        </div>
        <div className="bg-white rounded-xl border border-neutral-200 p-4 text-center">
          <p className="text-2xl font-bold text-neutral-900">
            {Object.values(schedule).filter((s) => s.length > 0).length}
          </p>
          <p className="text-xs text-neutral-500 mt-0.5">Working days</p>
        </div>
        <div className="bg-white rounded-xl border border-neutral-200 p-4 text-center">
          <p className="text-2xl font-bold text-neutral-900">30</p>
          <p className="text-xs text-neutral-500 mt-0.5">Min / slot</p>
        </div>
        <div className="bg-white rounded-xl border border-neutral-200 p-4 text-center">
          <p className="text-2xl font-bold text-green-600">
            {Math.round(totalSlots * 0.5)}h
          </p>
          <p className="text-xs text-neutral-500 mt-0.5">Total hours / week</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-6">
        {/* Day Selector */}
        <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
          <div className="p-3 border-b border-neutral-100">
            <h3 className="text-sm font-semibold text-neutral-700">Days</h3>
          </div>
          <div className="p-2 space-y-0.5">
            {DAYS_OF_WEEK.map((day) => {
              const daySlots = schedule[day.toLowerCase()] || [];
              return (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day.toLowerCase())}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors ${
                    selectedDay === day.toLowerCase()
                      ? "bg-primary-50 text-primary-700 font-medium"
                      : "text-neutral-600 hover:bg-neutral-50"
                  }`}
                >
                  <span>{day}</span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      daySlots.length > 0
                        ? "bg-green-100 text-green-700"
                        : "bg-neutral-100 text-neutral-400"
                    }`}
                  >
                    {daySlots.length}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Time Slot Grid */}
        <div className="bg-white rounded-xl border border-neutral-200 shadow-sm">
          <div className="flex items-center justify-between p-4 border-b border-neutral-100">
            <div>
              <h3 className="text-sm font-semibold text-neutral-900 capitalize">
                {selectedDay}
              </h3>
              <p className="text-xs text-neutral-500">
                {(schedule[selectedDay] || []).length} of {TIME_SLOTS.length} slots
                selected
              </p>
            </div>
            <button
              onClick={() => toggleAllDay(selectedDay)}
              className="text-xs font-medium text-primary-600 hover:text-primary-700 transition-colors"
            >
              {(schedule[selectedDay] || []).length === TIME_SLOTS.length
                ? "Clear all"
                : "Select all"}
            </button>
          </div>

          <div className="p-4">
            {/* Morning */}
            <div className="mb-5">
              <p className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-2">
                Morning
              </p>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                {TIME_SLOTS.filter((t) => {
                  const h = parseInt(t.split(":")[0]);
                  return h < 12;
                }).map((slot) => {
                  const active = (schedule[selectedDay] || []).includes(slot);
                  return (
                    <button
                      key={slot}
                      onClick={() => toggleSlot(selectedDay, slot)}
                      className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        active
                          ? "bg-primary-500 text-white shadow-sm"
                          : "bg-neutral-50 text-neutral-500 hover:bg-neutral-100 border border-neutral-200"
                      }`}
                    >
                      <Clock size={12} />
                      {slot}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Afternoon */}
            <div>
              <p className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-2">
                Afternoon
              </p>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                {TIME_SLOTS.filter((t) => {
                  const h = parseInt(t.split(":")[0]);
                  return h >= 12;
                }).map((slot) => {
                  const active = (schedule[selectedDay] || []).includes(slot);
                  return (
                    <button
                      key={slot}
                      onClick={() => toggleSlot(selectedDay, slot)}
                      className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        active
                          ? "bg-primary-500 text-white shadow-sm"
                          : "bg-neutral-50 text-neutral-500 hover:bg-neutral-100 border border-neutral-200"
                      }`}
                    >
                      <Clock size={12} />
                      {slot}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Saved notification */}
      {saved && (
        <div className="fixed bottom-6 right-6 bg-green-600 text-white px-5 py-3 rounded-xl shadow-lg text-sm font-medium animate-[fadeIn_0.3s_ease-out]">
          ✓ Schedule saved successfully
        </div>
      )}
    </div>
  );
}

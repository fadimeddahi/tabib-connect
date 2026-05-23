"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Heart, User, Mail, Phone, Calendar, Flag, MapPin } from "lucide-react";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import { getPatientById } from "@/lib/api";
import { Patient } from "@/lib/types";

export default function PatientProfilePage() {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadPatient() {
      setLoading(true);
      setError("");

      const storedUser = localStorage.getItem("authUser");
      const storedPatientId = localStorage.getItem("patientId");

      if (storedUser) {
        try {
          const parsed = JSON.parse(storedUser) as Patient;
          if (active) {
            setPatient(parsed);
          }
        } catch {
          // ignore parse errors
        }
      }

      if (storedPatientId) {
        try {
          const fetched = await getPatientById(storedPatientId);
          if (active) {
            setPatient({
              ...fetched,
              role: "patient",
              dateOfBirth: fetched.dateOfBirth ?? "",
              gender: fetched.gender ?? "",
            } as Patient);
          }
        } catch (fetchError) {
          if (!active) return;
          setError(
            fetchError instanceof Error
              ? fetchError.message
              : "Unable to load patient profile from the server."
          );
        } finally {
          if (active) {
            setLoading(false);
          }
        }
      } else {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadPatient();

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">My Profile</h1>
          <p className="text-sm text-neutral-500 mt-1">
            Review your personal details and account information.
          </p>
        </div>
        <Link href="/patient">
          <Button variant="outline">
            <Heart size={16} />
            Back to Dashboard
          </Button>
        </Link>
      </div>

      {error && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[320px_minmax(0,_1fr)] gap-6">
        <div className="bg-white rounded-2xl border border-neutral-200 p-6">
          <div className="flex flex-col items-center text-center gap-4">
            <Avatar name={patient?.name ?? "Patient"} size="xl" />
            <div>
              <p className="text-lg font-semibold text-neutral-900">{patient?.name ?? "Patient"}</p>
              <p className="text-sm text-primary-600">Patient</p>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700">
                <User size={14} />
                {patient?.gender ?? "Unknown"}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600">
                <Calendar size={14} />
                {patient?.dateOfBirth ?? "DOB not set"}
              </span>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <div className="rounded-2xl bg-neutral-50 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-neutral-500">Contact</p>
              <p className="mt-2 text-sm text-neutral-700 flex items-center gap-2">
                <Mail size={16} className="text-neutral-400" />
                {patient?.email ?? "Not available"}
              </p>
              <p className="mt-2 text-sm text-neutral-700 flex items-center gap-2">
                <Phone size={16} className="text-neutral-400" />
                {patient?.phone ?? "Not available"}
              </p>
            </div>
            <div className="rounded-2xl bg-neutral-50 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-neutral-500">Location</p>
              <p className="mt-2 text-sm text-neutral-700 flex items-center gap-2">
                <MapPin size={16} className="text-neutral-400" />
                {patient?.address ?? "Not specified"}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-neutral-200 p-6 space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-neutral-900">Personal Details</h2>
            <p className="mt-2 text-sm text-neutral-500">
              This information is pulled from your account.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-2xl bg-neutral-50 p-4">
              <p className="text-xs text-neutral-500 uppercase tracking-[0.18em]">Full Name</p>
              <p className="mt-2 text-sm text-neutral-900">{patient?.name ?? "—"}</p>
            </div>
            <div className="rounded-2xl bg-neutral-50 p-4">
              <p className="text-xs text-neutral-500 uppercase tracking-[0.18em]">Email</p>
              <p className="mt-2 text-sm text-neutral-900">{patient?.email ?? "—"}</p>
            </div>
            <div className="rounded-2xl bg-neutral-50 p-4">
              <p className="text-xs text-neutral-500 uppercase tracking-[0.18em]">Phone</p>
              <p className="mt-2 text-sm text-neutral-900">{patient?.phone ?? "—"}</p>
            </div>
            <div className="rounded-2xl bg-neutral-50 p-4">
              <p className="text-xs text-neutral-500 uppercase tracking-[0.18em]">Blood Type</p>
              <p className="mt-2 text-sm text-neutral-900">{patient?.bloodType ?? "Not specified"}</p>
            </div>
            <div className="rounded-2xl bg-neutral-50 p-4 sm:col-span-2">
              <p className="text-xs text-neutral-500 uppercase tracking-[0.18em]">Allergies</p>
              <p className="mt-2 text-sm text-neutral-900">
                {patient?.allergies?.length ? patient.allergies.join(", ") : "No allergies listed"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

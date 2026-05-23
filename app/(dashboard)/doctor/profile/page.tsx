"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Heart,
  User,
  Mail,
  Phone,
  Calendar,
  Star,
  Globe,
  GraduationCap,
  Clock,
  MapPin,
} from "lucide-react";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import { getDoctorById } from "@/lib/api";
import { Doctor } from "@/lib/types";

const DEFAULT_DOCTOR_ID = "7df8a7ec-5dbf-4f2d-88cc-9e0c0f6a1d21";

export default function DoctorProfilePage() {
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadDoctor() {
      setLoading(true);
      setError("");

      const storedUser = localStorage.getItem("authUser");
      const storedDoctorId = localStorage.getItem("doctorId") || DEFAULT_DOCTOR_ID;

      if (storedUser) {
        try {
          const parsed = JSON.parse(storedUser) as Doctor;
          if (active) {
            setDoctor(parsed);
          }
        } catch {
          // ignore parse errors
        }
      }

      try {
        const fetched = await getDoctorById(storedDoctorId);
        if (!active) {
          return;
        }

        setDoctor({
          ...fetched,
          role: "doctor",
          specialty: fetched.specialty ?? "",
          bio: fetched.bio ?? "",
          location: fetched.location ?? "",
          rating: fetched.rating ?? 0,
          reviewCount: fetched.reviewCount ?? 0,
          experience: fetched.experience ?? 0,
          education: fetched.education ?? "",
          languages: fetched.languages ?? [],
          consultationFee: fetched.consultationFee ?? 0,
          availability: fetched.availability ?? [],
        } as Doctor);
      } catch (fetchError) {
        if (!active) return;
        setError(
          fetchError instanceof Error
            ? fetchError.message
            : "Unable to load doctor profile from the server."
        );
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadDoctor();

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
            Review your professional details and account information.
          </p>
        </div>
        <Link href="/doctor">
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
            <Avatar name={doctor?.name ?? "Doctor"} size="xl" />
            <div>
              <p className="text-lg font-semibold text-neutral-900">{doctor?.name ?? "Doctor"}</p>
              <p className="text-sm text-primary-600">{doctor?.specialty ?? "Doctor"}</p>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700">
                <Star size={14} />
                {doctor?.rating ?? 0} rating
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600">
                <Clock size={14} />
                {doctor?.experience ?? 0} years
              </span>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <div className="rounded-2xl bg-neutral-50 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-neutral-500">Contact</p>
              <p className="mt-2 text-sm text-neutral-700 flex items-center gap-2">
                <Mail size={16} className="text-neutral-400" />
                {doctor?.email ?? "Not available"}
              </p>
              <p className="mt-2 text-sm text-neutral-700 flex items-center gap-2">
                <Phone size={16} className="text-neutral-400" />
                {doctor?.phone ?? "Not available"}
              </p>
            </div>
            <div className="rounded-2xl bg-neutral-50 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-neutral-500">Location</p>
              <p className="mt-2 text-sm text-neutral-700 flex items-center gap-2">
                <MapPin size={16} className="text-neutral-400" />
                {doctor?.location ?? "Not specified"}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-neutral-200 p-6 space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-neutral-900">Professional Details</h2>
            <p className="mt-2 text-sm text-neutral-500">
              This information is pulled from your account.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-2xl bg-neutral-50 p-4">
              <p className="text-xs text-neutral-500 uppercase tracking-[0.18em]">Full Name</p>
              <p className="mt-2 text-sm text-neutral-900">{doctor?.name ?? "—"}</p>
            </div>
            <div className="rounded-2xl bg-neutral-50 p-4">
              <p className="text-xs text-neutral-500 uppercase tracking-[0.18em]">Email</p>
              <p className="mt-2 text-sm text-neutral-900">{doctor?.email ?? "—"}</p>
            </div>
            <div className="rounded-2xl bg-neutral-50 p-4">
              <p className="text-xs text-neutral-500 uppercase tracking-[0.18em]">Phone</p>
              <p className="mt-2 text-sm text-neutral-900">{doctor?.phone ?? "—"}</p>
            </div>
            <div className="rounded-2xl bg-neutral-50 p-4">
              <p className="text-xs text-neutral-500 uppercase tracking-[0.18em]">Specialty</p>
              <p className="mt-2 text-sm text-neutral-900">{doctor?.specialty ?? "—"}</p>
            </div>
            <div className="rounded-2xl bg-neutral-50 p-4">
              <p className="text-xs text-neutral-500 uppercase tracking-[0.18em]">Education</p>
              <p className="mt-2 text-sm text-neutral-900">{doctor?.education ?? "—"}</p>
            </div>
            <div className="rounded-2xl bg-neutral-50 p-4">
              <p className="text-xs text-neutral-500 uppercase tracking-[0.18em]">Languages</p>
              <p className="mt-2 text-sm text-neutral-900">
                {doctor?.languages?.length ? doctor.languages.join(", ") : "—"}
              </p>
            </div>
            <div className="rounded-2xl bg-neutral-50 p-4 sm:col-span-2">
              <p className="text-xs text-neutral-500 uppercase tracking-[0.18em]">About</p>
              <p className="mt-2 text-sm text-neutral-900">{doctor?.bio ?? "No bio available."}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

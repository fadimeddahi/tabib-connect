export type UserRole = "patient" | "doctor";

export type AppointmentStatus =
  | "pending"
  | "confirmed"
  | "cancelled"
  | "completed";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  role: UserRole;
}

export interface Doctor extends User {
  role: "doctor";
  specialty: string;
  bio: string;
  location: string;
  rating: number;
  reviewCount: number;
  experience: number; // years
  education: string;
  languages: string[];
  consultationFee: number;
  availability: WeeklySchedule;
}

export interface Patient extends User {
  role: "patient";
  dateOfBirth: string;
  gender: string;
  bloodType?: string;
  allergies?: string[];
  address?: string;
}

export interface TimeSlot {
  id: string;
  startTime: string; // "09:00"
  endTime: string; // "09:30"
  available: boolean;
}

export interface DaySchedule {
  day: string;
  enabled: boolean;
  slots: TimeSlot[];
}

export type WeeklySchedule = DaySchedule[];

export interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  doctorSpecialty: string;
  doctorAvatar?: string;
  patientId: string;
  patientName: string;
  patientAvatar?: string;
  date: string; // "2026-03-15"
  time: string; // "09:00"
  endTime: string; // "09:30"
  status: AppointmentStatus;
  type: "in-person" | "video";
  notes?: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "appointment" | "reminder" | "system";
  read: boolean;
  createdAt: string;
}

export const SPECIALTIES = [
  "General Practitioner",
  "Cardiologist",
  "Dermatologist",
  "Pediatrician",
  "Neurologist",
  "Orthopedist",
  "Ophthalmologist",
  "Psychiatrist",
  "Gynecologist",
  "Dentist",
  "ENT Specialist",
  "Urologist",
] as const;

export const APPOINTMENT_STATUSES = {
  pending: { label: "Pending", color: "warning" },
  confirmed: { label: "Confirmed", color: "success" },
  cancelled: { label: "Cancelled", color: "danger" },
  completed: { label: "Completed", color: "neutral" },
} as const;

export const TIME_SLOTS = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
  "11:00", "11:30", "12:00", "12:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
] as const;

export const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

export const NAV_ITEMS_PATIENT = [
  { label: "Dashboard", href: "/patient", icon: "LayoutDashboard" },
  { label: "Find Doctor", href: "/doctors", icon: "Search" },
  { label: "My Appointments", href: "/patient/appointments", icon: "CalendarDays" },
  { label: "Profile", href: "/patient/profile", icon: "User" },
] as const;

export const NAV_ITEMS_DOCTOR = [
  { label: "Dashboard", href: "/doctor", icon: "LayoutDashboard" },
  { label: "Appointments", href: "/doctor/appointments", icon: "CalendarDays" },
  { label: "My Schedule", href: "/doctor/schedule", icon: "Clock" },
  { label: "Profile", href: "/doctor/profile", icon: "User" },
] as const;

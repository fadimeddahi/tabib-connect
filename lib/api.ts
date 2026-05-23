import { Appointment, Doctor, Patient } from "@/lib/types";

const DEFAULT_API_BASE_URL = "http://localhost:3000";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? DEFAULT_API_BASE_URL;

export class ApiError extends Error {
  status: number;
  payload: unknown;

  constructor(message: string, status: number, payload: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.payload = payload;
  }
}

type RequestOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
  token?: string;
};

type ApiListResponse<T> = {
  data: T[];
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
  };
};

type RawAppointment = {
  id: string;
  doctorId: string;
  patientId: string;
  startTime: string;
  endTime: string;
  status: Appointment["status"];
  type: Appointment["type"];
  notes?: string;
  createdAt: string;
};

type RawDoctor = Partial<Doctor> & {
  id: string;
  name: string;
  specialty?: string;
};

type RawPatient = Partial<Patient> & {
  id: string;
  name: string;
};

type AppointmentLookup = {
  doctor?: RawDoctor;
  patient?: RawPatient;
};

function buildUrl(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
}

async function parseResponse<T>(response: Response): Promise<T> {
  const text = await response.text();
  const payload = text ? safeJsonParse(text) : null;

  if (!response.ok) {
    const message =
      (payload && typeof payload === "object" && "message" in payload &&
        typeof (payload as { message?: unknown }).message === "string" &&
        (payload as { message: string }).message) ||
      response.statusText ||
      "Request failed";
    throw new ApiError(message, response.status, payload);
  }

  return payload as T;
}

function safeJsonParse(text: string) {
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

export async function request<T>(path: string, options: RequestOptions = {}) {
  const { body, token, headers, ...init } = options;

  const response = await fetch(buildUrl(path), {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  return parseResponse<T>(response);
}

export async function login(email: string, password: string) {
  return request<{ user: Doctor | Patient; token: string }>("/api/auth/login", {
    method: "POST",
    body: { email, password },
  });
}

export async function register(input: {
  name: string;
  email: string;
  password: string;
  role: "patient" | "doctor";
  phone?: string;
  avatar?: string;
}) {
  return request<{ user: Doctor | Patient; token: string }>("/api/auth/register", {
    method: "POST",
    body: input,
  });
}

export async function getDoctors(params: {
  page?: number;
  limit?: number;
  specialty?: string;
} = {}) {
  const search = new URLSearchParams();
  if (params.page) search.set("page", String(params.page));
  if (params.limit) search.set("limit", String(params.limit));
  if (params.specialty) search.set("specialty", params.specialty);

  const query = search.toString();
  return request<ApiListResponse<RawDoctor>>(
    query ? `/api/doctors?${query}` : "/api/doctors"
  );
}

export async function getDoctorById(id: string) {
  return request<RawDoctor>(`/api/doctors/${id}`);
}

export async function getDoctorSchedule(id: string, date: string) {
  return request<unknown>(`/api/doctors/${id}/schedule?date=${encodeURIComponent(date)}`);
}

export async function getPatientById(id: string) {
  return request<RawPatient>(`/api/patients/${id}`);
}

export async function createAppointment(input: {
  doctorId: string;
  patientId: string;
  startTime: string;
  endTime: string;
  type: "video" | "in-person";
}) {
  return request<RawAppointment>("/api/appointments", {
    method: "POST",
    body: input,
  });
}

export async function updateAppointment(
  id: string,
  input: Partial<{
    status: RawAppointment["status"];
    startTime: string;
    endTime: string;
    notes: string;
  }>,
  token?: string
) {
  return request<RawAppointment>(`/api/appointments/${id}`, {
    method: "PATCH",
    body: input,
    token,
  });
}

export async function listAppointments(params: {
  doctorId?: string;
  patientId?: string;
  date?: string;
  status?: string;
}) {
  const search = new URLSearchParams();
  if (params.doctorId) search.set("doctorId", params.doctorId);
  if (params.patientId) search.set("patientId", params.patientId);
  if (params.date) search.set("date", params.date);
  if (params.status) search.set("status", params.status);

  const query = search.toString();
  return request<ApiListResponse<RawAppointment>>(
    query ? `/api/appointments?${query}` : "/api/appointments"
  );
}

export function normalizeDoctor(doctor: RawDoctor): Doctor {
  return {
    id: doctor.id,
    name: doctor.name,
    email: doctor.email ?? "",
    phone: doctor.phone ?? "",
    avatar: doctor.avatar ?? "",
    role: "doctor",
    specialty: doctor.specialty ?? "",
    bio: doctor.bio ?? "",
    location: doctor.location ?? "",
    rating: doctor.rating ?? 0,
    reviewCount: doctor.reviewCount ?? 0,
    experience: doctor.experience ?? 0,
    education: doctor.education ?? "",
    languages: doctor.languages ?? [],
    consultationFee: doctor.consultationFee ?? 0,
    availability: doctor.availability ?? [],
  };
}

export function normalizeAppointment(
  appointment: RawAppointment,
  lookup: AppointmentLookup = {}
): Appointment {
  const startTime = new Date(appointment.startTime);
  const endTime = new Date(appointment.endTime);
  const doctorName = lookup.doctor?.name ?? `Doctor ${appointment.doctorId.slice(0, 8)}`;
  const patientName = lookup.patient?.name ?? `Patient ${appointment.patientId.slice(0, 8)}`;

  return {
    id: appointment.id,
    doctorId: appointment.doctorId,
    doctorName,
    doctorSpecialty: lookup.doctor?.specialty ?? "",
    doctorAvatar: lookup.doctor?.avatar,
    patientId: appointment.patientId,
    patientName,
    patientAvatar: lookup.patient?.avatar,
    date: startTime.toISOString().slice(0, 10),
    time: startTime.toISOString().slice(11, 16),
    endTime: endTime.toISOString().slice(11, 16),
    status: appointment.status,
    type: appointment.type,
    notes: appointment.notes,
    createdAt: appointment.createdAt,
  };
}

export async function getAppointmentsForPatient(patientId: string) {
  const { data } = await listAppointments({ patientId });
  const doctorIds = [...new Set(data.map((appointment) => appointment.doctorId))];
  const doctors = await Promise.all(
    doctorIds.map(async (doctorId) => {
      try {
        return await getDoctorById(doctorId);
      } catch {
        return undefined;
      }
    })
  );
  const doctorMap = new Map(doctors.filter(Boolean).map((doctor) => [doctor!.id, doctor!]));

  return data.map((appointment) =>
    normalizeAppointment(appointment, {
      doctor: doctorMap.get(appointment.doctorId),
    })
  );
}

export async function getAppointmentsForDoctor(doctorId: string) {
  const { data } = await listAppointments({ doctorId });
  const patientIds = [...new Set(data.map((appointment) => appointment.patientId))];
  const patients = await Promise.all(
    patientIds.map(async (patientId) => {
      try {
        return await getPatientById(patientId);
      } catch {
        return undefined;
      }
    })
  );
  const patientMap = new Map(patients.filter(Boolean).map((patient) => [patient!.id, patient!]));

  return data.map((appointment) =>
    normalizeAppointment(appointment, {
      patient: patientMap.get(appointment.patientId),
    })
  );
}

export type { ApiListResponse, RawAppointment, RawDoctor, RawPatient };
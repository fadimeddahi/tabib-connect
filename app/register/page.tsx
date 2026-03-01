"use client";

import Link from "next/link";
import { useState } from "react";
import { Heart, Mail, Lock, User, Phone, Stethoscope, Eye, EyeOff } from "lucide-react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Select from "@/components/ui/Select";
import { SPECIALTIES } from "@/lib/constants";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<"patient" | "doctor">("patient");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    specialty: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem("userRole", role);
      localStorage.setItem("userName", form.name);
      router.push(role === "patient" ? "/patient" : "/doctor");
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center">
              <Heart size={22} className="text-white" />
            </div>
            <span className="text-2xl font-bold text-neutral-900">
              Tabib<span className="text-primary-600">Connect</span>
            </span>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-neutral-200 p-8">
          <h1 className="text-2xl font-bold text-neutral-900 text-center mb-2">
            Create your account
          </h1>
          <p className="text-sm text-neutral-500 text-center mb-8">
            Join TabibConnect and start your healthcare journey
          </p>

          {/* Role Toggle */}
          <div className="flex rounded-lg bg-neutral-100 p-1 mb-6">
            <button
              onClick={() => setRole("patient")}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors flex items-center justify-center gap-2 ${
                role === "patient"
                  ? "bg-white text-primary-700 shadow-sm"
                  : "text-neutral-500 hover:text-neutral-700"
              }`}
            >
              <User size={16} />
              Patient
            </button>
            <button
              onClick={() => setRole("doctor")}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors flex items-center justify-center gap-2 ${
                role === "doctor"
                  ? "bg-white text-primary-700 shadow-sm"
                  : "text-neutral-500 hover:text-neutral-700"
              }`}
            >
              <Stethoscope size={16} />
              Doctor
            </button>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <Input
              label="Full Name"
              name="name"
              placeholder={role === "doctor" ? "Dr. John Smith" : "John Smith"}
              icon={<User size={16} />}
              value={form.name}
              onChange={handleChange}
              required
            />
            <Input
              label="Email"
              name="email"
              type="email"
              placeholder="you@example.com"
              icon={<Mail size={16} />}
              value={form.email}
              onChange={handleChange}
              required
            />
            <Input
              label="Phone Number"
              name="phone"
              type="tel"
              placeholder="+1 555-000-0000"
              icon={<Phone size={16} />}
              value={form.phone}
              onChange={handleChange}
              required
            />

            {role === "doctor" && (
              <Select
                label="Specialty"
                name="specialty"
                placeholder="Select your specialty"
                options={SPECIALTIES.map((s) => ({ value: s, label: s }))}
                value={form.specialty}
                onChange={handleChange}
                required
              />
            )}

            <div className="relative">
              <Input
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                icon={<Lock size={16} />}
                value={form.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[38px] text-neutral-400 hover:text-neutral-600"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            <Input
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              icon={<Lock size={16} />}
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />

            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                required
                className="mt-1 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm text-neutral-600">
                I agree to the{" "}
                <a href="#" className="text-primary-600 hover:text-primary-700 font-medium">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-primary-600 hover:text-primary-700 font-medium">
                  Privacy Policy
                </a>
              </span>
            </div>

            <Button type="submit" className="w-full" size="lg" loading={loading}>
              Create Account
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-neutral-500">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-primary-600 hover:text-primary-700">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

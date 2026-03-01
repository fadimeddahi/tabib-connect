"use client";

import Link from "next/link";
import { useState } from "react";
import { Heart, Mail, Lock, Eye, EyeOff } from "lucide-react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<"patient" | "doctor">("patient");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate login — navigate to role dashboard
    setTimeout(() => {
      localStorage.setItem("userRole", role);
      localStorage.setItem("userName", role === "patient" ? "Rachid Amrani" : "Dr. Sarah Mitchell");
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
            Welcome back
          </h1>
          <p className="text-sm text-neutral-500 text-center mb-8">
            Sign in to your account to continue
          </p>

          {/* Role Toggle */}
          <div className="flex rounded-lg bg-neutral-100 p-1 mb-6">
            <button
              onClick={() => setRole("patient")}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
                role === "patient"
                  ? "bg-white text-primary-700 shadow-sm"
                  : "text-neutral-500 hover:text-neutral-700"
              }`}
            >
              Patient
            </button>
            <button
              onClick={() => setRole("doctor")}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
                role === "doctor"
                  ? "bg-white text-primary-700 shadow-sm"
                  : "text-neutral-500 hover:text-neutral-700"
              }`}
            >
              Doctor
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              icon={<Mail size={16} />}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                icon={<Lock size={16} />}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500" />
                <span className="text-sm text-neutral-600">Remember me</span>
              </label>
              <a href="#" className="text-sm font-medium text-primary-600 hover:text-primary-700">
                Forgot password?
              </a>
            </div>

            <Button type="submit" className="w-full" size="lg" loading={loading}>
              Sign In
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-neutral-500">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-medium text-primary-600 hover:text-primary-700">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

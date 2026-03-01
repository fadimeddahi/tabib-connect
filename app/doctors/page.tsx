"use client";

import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, Heart } from "lucide-react";
import Link from "next/link";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import DoctorCard from "@/components/doctors/DoctorCard";
import { mockDoctors } from "@/data/mock";
import { SPECIALTIES } from "@/lib/constants";

export default function DoctorsPage() {
  const [search, setSearch] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [sortBy, setSortBy] = useState("rating");

  const filteredDoctors = useMemo(() => {
    let docs = [...mockDoctors];

    if (search) {
      const q = search.toLowerCase();
      docs = docs.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.specialty.toLowerCase().includes(q) ||
          d.location.toLowerCase().includes(q)
      );
    }

    if (specialty) {
      docs = docs.filter((d) => d.specialty === specialty);
    }

    if (sortBy === "rating") {
      docs.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "experience") {
      docs.sort((a, b) => b.experience - a.experience);
    } else if (sortBy === "price-low") {
      docs.sort((a, b) => a.consultationFee - b.consultationFee);
    } else if (sortBy === "price-high") {
      docs.sort((a, b) => b.consultationFee - a.consultationFee);
    }

    return docs;
  }, [search, specialty, sortBy]);

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <Heart size={16} className="text-white" />
              </div>
              <span className="text-lg font-bold text-neutral-900">
                Tabib<span className="text-primary-600">Connect</span>
              </span>
            </Link>
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="text-sm font-medium text-neutral-600 hover:text-primary-600 transition-colors"
              >
                Log in
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900">Find a Doctor</h1>
          <p className="mt-2 text-neutral-500">
            Browse our verified doctors and book an appointment today
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-4 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="sm:col-span-2">
              <Input
                placeholder="Search doctors by name, specialty, or location..."
                icon={<Search size={16} />}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Select
              placeholder="All Specialties"
              options={SPECIALTIES.map((s) => ({ value: s, label: s }))}
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
            />
            <Select
              placeholder="Sort by"
              options={[
                { value: "rating", label: "Highest Rated" },
                { value: "experience", label: "Most Experienced" },
                { value: "price-low", label: "Price: Low to High" },
                { value: "price-high", label: "Price: High to Low" },
              ]}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            />
          </div>
          {(search || specialty) && (
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-neutral-100">
              <SlidersHorizontal size={14} className="text-neutral-400" />
              <span className="text-sm text-neutral-500">
                {filteredDoctors.length} doctor{filteredDoctors.length !== 1 ? "s" : ""} found
              </span>
              {(search || specialty) && (
                <button
                  onClick={() => {
                    setSearch("");
                    setSpecialty("");
                  }}
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium ml-auto"
                >
                  Clear filters
                </button>
              )}
            </div>
          )}
        </div>

        {/* Results */}
        {filteredDoctors.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-neutral-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Search size={24} className="text-neutral-400" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">
              No doctors found
            </h3>
            <p className="text-sm text-neutral-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

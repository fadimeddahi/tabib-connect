import Link from "next/link";
import {
  Heart,
  CalendarCheck,
  Search,
  ShieldCheck,
  Clock,
  Star,
  ArrowRight,
  Stethoscope,
  Users,
  Activity,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 bg-primary-600 rounded-xl flex items-center justify-center">
                <Heart size={20} className="text-white" />
              </div>
              <span className="text-xl font-bold text-neutral-900">
                Tabib<span className="text-primary-600">Connect</span>
              </span>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm font-medium text-neutral-600 hover:text-primary-600 transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-sm font-medium text-neutral-600 hover:text-primary-600 transition-colors">
                How It Works
              </a>
              <a href="#specialties" className="text-sm font-medium text-neutral-600 hover:text-primary-600 transition-colors">
                Specialties
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="text-sm font-medium text-neutral-700 hover:text-primary-600 transition-colors"
              >
                Log in
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors shadow-sm"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-blue-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-6">
              <Activity size={14} />
              Your Health, Connected
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 tracking-tight leading-tight">
              Find the right{" "}
              <span className="text-primary-600">doctor</span> and book your{" "}
              <span className="text-primary-600">appointment</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed">
              TabibConnect makes it easy to search for qualified doctors, view their availability in real-time, and book appointments — all in one place.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/doctors"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white font-medium rounded-xl hover:bg-primary-700 transition-colors shadow-lg shadow-primary-200 w-full sm:w-auto justify-center"
              >
                <Search size={18} />
                Find a Doctor
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 px-6 py-3 border border-neutral-300 text-neutral-700 font-medium rounded-xl hover:bg-neutral-50 transition-colors w-full sm:w-auto justify-center"
              >
                <Stethoscope size={18} />
                I&apos;m a Doctor
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
            {[
              { number: "500+", label: "Qualified Doctors", icon: Stethoscope },
              { number: "50k+", label: "Appointments Booked", icon: CalendarCheck },
              { number: "100k+", label: "Happy Patients", icon: Users },
              { number: "4.9", label: "Average Rating", icon: Star },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-xl mb-3">
                  <stat.icon size={22} className="text-primary-600" />
                </div>
                <p className="text-2xl font-bold text-neutral-900">{stat.number}</p>
                <p className="text-sm text-neutral-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900">
              Everything you need for your{" "}
              <span className="text-primary-600">healthcare</span>
            </h2>
            <p className="mt-4 text-lg text-neutral-600 max-w-2xl mx-auto">
              Whether you&apos;re a patient looking for the right doctor or a doctor managing your practice, TabibConnect has you covered.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Search,
                title: "Find Doctors Easily",
                description: "Search by specialty, location, language, and availability. Read reviews and compare doctors to find your perfect match.",
                color: "bg-blue-100 text-blue-600",
              },
              {
                icon: CalendarCheck,
                title: "Book Instantly",
                description: "See real-time availability and book appointments in seconds. No more phone calls or waiting on hold.",
                color: "bg-green-100 text-green-600",
              },
              {
                icon: Clock,
                title: "Manage Your Schedule",
                description: "Doctors can set their availability, manage appointments, and keep their schedule organized effortlessly.",
                color: "bg-purple-100 text-purple-600",
              },
              {
                icon: ShieldCheck,
                title: "Verified Professionals",
                description: "Every doctor on our platform is verified. Your health is in trusted, qualified hands.",
                color: "bg-amber-100 text-amber-600",
              },
              {
                icon: Star,
                title: "Patient Reviews",
                description: "Read honest reviews from real patients. Make informed decisions about your healthcare provider.",
                color: "bg-rose-100 text-rose-600",
              },
              {
                icon: Activity,
                title: "Health Dashboard",
                description: "Track your appointments, medical history, and health records all in one secure, easy-to-use dashboard.",
                color: "bg-teal-100 text-teal-600",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="bg-white rounded-2xl p-6 border border-neutral-200 hover:border-primary-200 hover:shadow-lg transition-all duration-300"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${feature.color} mb-4`}>
                  <feature.icon size={22} />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900">
              How it works
            </h2>
            <p className="mt-4 text-lg text-neutral-600">
              Three simple steps to get the care you need
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: "01",
                title: "Search",
                description: "Browse our directory of verified doctors. Filter by specialty, location, and availability.",
                icon: Search,
              },
              {
                step: "02",
                title: "Book",
                description: "Choose a convenient time slot and book your appointment online in just a few clicks.",
                icon: CalendarCheck,
              },
              {
                step: "03",
                title: "Visit",
                description: "Attend your appointment in person or via video call. Your health journey starts here.",
                icon: Heart,
              },
            ].map((item, index) => (
              <div key={item.step} className="relative text-center">
                {index < 2 && (
                  <div className="hidden md:block absolute top-12 left-[60%] w-[80%] border-t-2 border-dashed border-primary-200" />
                )}
                <div className="inline-flex items-center justify-center w-24 h-24 bg-primary-50 rounded-2xl mb-6 relative">
                  <item.icon size={32} className="text-primary-600" />
                  <span className="absolute -top-2 -right-2 w-8 h-8 bg-primary-600 text-white text-sm font-bold rounded-lg flex items-center justify-center">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialties */}
      <section id="specialties" className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900">
              Browse by specialty
            </h2>
            <p className="mt-4 text-lg text-neutral-600">
              Find the right specialist for your needs
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              "General Practitioner",
              "Cardiologist",
              "Dermatologist",
              "Pediatrician",
              "Neurologist",
              "Orthopedist",
              "Psychiatrist",
              "Dentist",
            ].map((specialty) => (
              <Link
                key={specialty}
                href={`/doctors?specialty=${encodeURIComponent(specialty)}`}
                className="flex items-center gap-3 bg-white rounded-xl p-4 border border-neutral-200 hover:border-primary-300 hover:shadow-md transition-all duration-200 group"
              >
                <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center group-hover:bg-primary-100 transition-colors">
                  <Stethoscope size={18} className="text-primary-600" />
                </div>
                <span className="text-sm font-medium text-neutral-700 group-hover:text-primary-700 transition-colors">
                  {specialty}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Ready to take control of your health?
          </h2>
          <p className="mt-4 text-lg text-primary-100 max-w-2xl mx-auto">
            Join thousands of patients and doctors who trust TabibConnect for seamless healthcare coordination.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary-600 font-medium rounded-xl hover:bg-primary-50 transition-colors w-full sm:w-auto justify-center"
            >
              Create Free Account
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/doctors"
              className="inline-flex items-center gap-2 px-6 py-3 border border-primary-400 text-white font-medium rounded-xl hover:bg-primary-700 transition-colors w-full sm:w-auto justify-center"
            >
              Browse Doctors
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                  <Heart size={16} className="text-white" />
                </div>
                <span className="text-lg font-bold text-white">
                  Tabib<span className="text-primary-400">Connect</span>
                </span>
              </div>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Making healthcare accessible and convenient for everyone.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-4">For Patients</h4>
              <ul className="space-y-2">
                <li><Link href="/doctors" className="text-sm text-neutral-400 hover:text-white transition-colors">Find a Doctor</Link></li>
                <li><Link href="/register" className="text-sm text-neutral-400 hover:text-white transition-colors">Create Account</Link></li>
                <li><Link href="/login" className="text-sm text-neutral-400 hover:text-white transition-colors">Patient Login</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-4">For Doctors</h4>
              <ul className="space-y-2">
                <li><Link href="/register" className="text-sm text-neutral-400 hover:text-white transition-colors">Join as Doctor</Link></li>
                <li><Link href="/login" className="text-sm text-neutral-400 hover:text-white transition-colors">Doctor Login</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-neutral-400 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="text-sm text-neutral-400 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-sm text-neutral-400 hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-neutral-800 text-center">
            <p className="text-sm text-neutral-500">
              &copy; 2026 TabibConnect. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

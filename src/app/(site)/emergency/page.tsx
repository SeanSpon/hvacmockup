"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Phone,
  AlertTriangle,
  Clock,
  Flame,
  Droplets,
  Wind,
  Thermometer,
  Zap,
  ShieldAlert,
  Send,
  CheckCircle2,
  MapPin,
  Siren,
} from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" as const },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

const emergencyTypes = [
  {
    icon: Thermometer,
    title: "Complete Cooling Failure",
    description:
      "Air conditioning system has stopped producing cold air entirely, creating unsafe temperatures for occupants, products, or equipment.",
  },
  {
    icon: Flame,
    title: "Heating System Failure",
    description:
      "Heating system is not functioning during cold weather, risking frozen pipes, equipment damage, or unsafe conditions for building occupants.",
  },
  {
    icon: Droplets,
    title: "Refrigerant Leak",
    description:
      "Active refrigerant leak detected, causing system performance issues and potential environmental or health hazards.",
  },
  {
    icon: Wind,
    title: "Unusual Odors or Smoke",
    description:
      "Burning smells, gas odors, or visible smoke coming from HVAC equipment indicating a potential fire or electrical hazard.",
  },
  {
    icon: Zap,
    title: "Electrical Issues",
    description:
      "Tripped breakers, sparking components, or unusual electrical behavior in HVAC equipment that could pose a fire risk.",
  },
  {
    icon: ShieldAlert,
    title: "Walk-in Cooler/Freezer Failure",
    description:
      "Commercial refrigeration equipment has stopped maintaining temperature, putting perishable inventory at risk of total loss.",
  },
];

export default function EmergencyPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    issue: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Emergency form submitted:", formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen">
      {/* Hero - Red/Orange Urgency Theme */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1a0a0a] via-[#2d1010] to-[#1a0a0a] py-20 sm:py-28">
        <div className="absolute inset-0 opacity-[0.08]">
          <Image src="/images/service-emergency.jpg" alt="Emergency HVAC Repair" fill className="object-cover" />
        </div>
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-red-500/8 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-orange-500/8 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
          <motion.div {...fadeInUp}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/15 px-5 py-2 text-sm font-bold uppercase tracking-wider text-red-400">
              <Siren className="h-5 w-5" />
              24/7/365 Emergency Service
            </div>
            <h1 className="heading-hero bg-gradient-to-b from-white via-red-100 to-red-200 bg-clip-text text-transparent">
              HVAC Emergency?
            </h1>
            <h2 className="mt-2 text-2xl font-bold text-red-300 sm:text-3xl">
              Call Now. We Are On Our Way.
            </h2>

            {/* Huge Phone Number */}
            <a
              href="tel:5029693377"
              className="group mt-10 inline-flex items-center gap-4 rounded-2xl border-2 border-red-500/40 bg-gradient-to-r from-red-500/20 to-orange-500/15 px-8 py-6 transition-all hover:border-red-500/60 hover:from-red-500/30 hover:to-orange-500/25 sm:px-12 sm:py-8"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-500/30 ring-2 ring-red-500/50 transition-all group-hover:bg-red-500/40 sm:h-16 sm:w-16">
                <Phone className="h-7 w-7 text-red-300 sm:h-8 sm:w-8" />
              </div>
              <div className="text-left">
                <div className="text-sm font-semibold uppercase tracking-wider text-red-400">
                  Emergency Hotline
                </div>
                <div className="text-3xl font-extrabold text-white sm:text-5xl">
                  (502) 969-3377
                </div>
              </div>
            </a>

            <p className="mx-auto mt-8 max-w-xl text-lg text-slate-400">
              Do not wait for business hours. Our emergency technicians are
              available around the clock, every day of the year, ready to
              respond to your HVAC or refrigeration crisis.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Response Time Promise */}
      <section className="border-b border-red-500/10 bg-gradient-to-r from-red-500/5 via-orange-500/5 to-red-500/5 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div
            {...fadeInUp}
            className="flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-center sm:gap-12 sm:text-left"
          >
            <div className="flex items-center gap-3">
              <Clock className="h-6 w-6 text-red-400" />
              <div>
                <div className="text-sm font-semibold text-red-300">
                  Rapid Response
                </div>
                <div className="text-xs text-slate-400">
                  Technician dispatched within 60 minutes
                </div>
              </div>
            </div>
            <div className="hidden h-8 w-px bg-white/10 sm:block" />
            <div className="flex items-center gap-3">
              <MapPin className="h-6 w-6 text-red-400" />
              <div>
                <div className="text-sm font-semibold text-red-300">
                  Louisville Metro Coverage
                </div>
                <div className="text-xs text-slate-400">
                  All areas within 30-mile radius
                </div>
              </div>
            </div>
            <div className="hidden h-8 w-px bg-white/10 sm:block" />
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-6 w-6 text-red-400" />
              <div>
                <div className="text-sm font-semibold text-red-300">
                  All Brands Serviced
                </div>
                <div className="text-xs text-slate-400">
                  HVAC, refrigeration, and ice machines
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What Constitutes an Emergency */}
      <section className="relative border-b border-white/5 bg-[#0f0a0a] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div {...fadeInUp} className="text-center">
            <h2 className="heading-section text-white">
              What Constitutes an Emergency?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-400">
              If you are experiencing any of these situations, do not wait.
              Call us immediately at{" "}
              <a
                href="tel:5029693377"
                className="font-bold text-red-400 hover:text-red-300"
              >
                (502) 969-3377
              </a>
              .
            </p>
          </motion.div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {emergencyTypes.map((type, index) => {
              const Icon = type.icon;
              return (
                <motion.div
                  key={type.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="rounded-2xl border border-red-500/10 bg-gradient-to-br from-red-500/5 to-transparent p-7 transition-colors hover:border-red-500/20"
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/15 ring-1 ring-red-500/25">
                    <Icon className="h-6 w-6 text-red-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    {type.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    {type.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Emergency Request Form */}
      <section className="relative border-b border-white/5 bg-[#0a0808] py-20 sm:py-28">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <motion.div {...fadeInUp} className="text-center">
            <h2 className="heading-section text-white">
              Request Emergency Service
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-slate-400">
              Prefer to submit your request online? Fill out this form and we
              will have a technician contact you within minutes. For the fastest
              response, call us directly.
            </p>
          </motion.div>

          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-12"
          >
            <div className="rounded-2xl border border-red-500/15 bg-gradient-to-br from-red-500/5 to-transparent p-8 sm:p-10">
              {submitted && (
                <div className="mb-6 flex items-center gap-3 rounded-lg border border-green-500/20 bg-green-500/10 p-4">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-green-400" />
                  <p className="text-sm text-green-300">
                    Emergency request received. A technician will contact you
                    within minutes.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="emergency-name"
                    className="mb-2 block text-sm font-medium text-slate-300"
                  >
                    Your Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="emergency-name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full name"
                    className="h-11 w-full rounded-lg border border-red-500/15 bg-white/5 px-4 text-sm text-white placeholder:text-slate-500 focus:border-red-500/40 focus:outline-none focus:ring-1 focus:ring-red-500/40"
                  />
                </div>

                <div>
                  <label
                    htmlFor="emergency-phone"
                    className="mb-2 block text-sm font-medium text-slate-300"
                  >
                    Phone Number <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="tel"
                    id="emergency-phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(502) 555-0123"
                    className="h-11 w-full rounded-lg border border-red-500/15 bg-white/5 px-4 text-sm text-white placeholder:text-slate-500 focus:border-red-500/40 focus:outline-none focus:ring-1 focus:ring-red-500/40"
                  />
                </div>

                <div>
                  <label
                    htmlFor="emergency-address"
                    className="mb-2 block text-sm font-medium text-slate-300"
                  >
                    Service Address <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="emergency-address"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Street address, City, KY ZIP"
                    className="h-11 w-full rounded-lg border border-red-500/15 bg-white/5 px-4 text-sm text-white placeholder:text-slate-500 focus:border-red-500/40 focus:outline-none focus:ring-1 focus:ring-red-500/40"
                  />
                </div>

                <div>
                  <label
                    htmlFor="emergency-issue"
                    className="mb-2 block text-sm font-medium text-slate-300"
                  >
                    Describe the Issue{" "}
                    <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="emergency-issue"
                    name="issue"
                    rows={4}
                    required
                    value={formData.issue}
                    onChange={handleChange}
                    placeholder="What is happening? Include any error codes, unusual sounds, smells, or other details..."
                    className="w-full rounded-lg border border-red-500/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-red-500/40 focus:outline-none focus:ring-1 focus:ring-red-500/40"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 px-6 py-3.5 text-base font-bold text-white shadow-lg shadow-red-500/25 transition-all hover:shadow-red-500/40 hover:brightness-110"
                >
                  <Send className="h-5 w-5" />
                  Request Emergency Service
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Available 24/7 Banner */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#1a0a0a] via-[#2d1010] to-[#1a0a0a] py-16 sm:py-20">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
          <motion.div {...fadeInUp}>
            <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-red-500/15 ring-2 ring-red-500/30">
              <Clock className="h-10 w-10 text-red-400" />
            </div>
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Available 24/7/365
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-slate-400">
              Holidays, weekends, the middle of the night. It does not matter
              when your emergency happens. FD Pierce Company is here for you
              every hour of every day.
            </p>
            <a
              href="tel:5029693377"
              className="mt-8 inline-flex items-center gap-3 rounded-xl border-2 border-red-500/30 bg-red-500/15 px-8 py-4 text-2xl font-extrabold text-white transition-all hover:border-red-500/50 hover:bg-red-500/25"
            >
              <Phone className="h-7 w-7 text-red-400" />
              (502) 969-3377
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

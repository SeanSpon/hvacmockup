"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Upload,
  AlertTriangle,
  CheckCircle2,
  MessageSquare,
  Building2,
  Shield,
} from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" as const },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

const serviceAreas = [
  "Louisville",
  "Jeffersontown",
  "Shively",
  "Okolona",
  "Hillview",
  "Shepherdsville",
  "Middletown",
  "St. Matthews",
  "Prospect",
  "Lyndon",
  "Fern Creek",
  "Pleasure Ridge Park",
  "Valley Station",
  "Newburg",
  "Fairdale",
  "Mt. Washington",
];

const serviceTypes = [
  "Commercial HVAC",
  "Commercial Refrigeration",
  "Ice Machines",
  "Preventive Maintenance",
  "New Installation",
  "Emergency Repair",
  "System Inspection",
  "Other",
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: "",
    urgency: "normal",
    description: "",
    preferredDate: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0a1628] via-[#142548] to-[#0a1628] py-24 sm:py-32">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute left-1/3 top-1/4 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div {...fadeInUp} className="text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-400">
              <MessageSquare className="h-4 w-4" />
              Contact Us
            </div>
            <h1 className="heading-hero bg-gradient-to-b from-white to-slate-300 bg-clip-text text-transparent">
              Get In Touch
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
              Have a question, need a quote, or ready to schedule service?
              We are here to help. Reach out and our team will respond promptly.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Emergency Banner */}
      <section className="border-b border-red-500/20 bg-gradient-to-r from-red-500/10 via-red-500/5 to-red-500/10">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <AlertTriangle className="h-5 w-5 text-red-400" />
            <p className="text-center text-sm font-medium text-red-300">
              For emergencies, skip the form and call us immediately:
            </p>
            <a
              href="tel:5029693377"
              className="inline-flex items-center gap-2 rounded-full bg-red-500/20 px-5 py-2 text-base font-bold text-red-300 transition-colors hover:bg-red-500/30"
            >
              <Phone className="h-5 w-5" />
              (502) 969-3377
            </a>
          </div>
        </div>
      </section>

      {/* Main Content: Form + Info */}
      <section className="relative border-b border-white/5 bg-[#0a1628] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
            {/* Contact Form (left, 3 cols) */}
            <motion.div
              {...fadeInUp}
              className="lg:col-span-3"
            >
              <div className="glass-card rounded-2xl p-8 sm:p-10">
                <h2 className="text-2xl font-bold text-white">
                  Send Us a Message
                </h2>
                <p className="mt-2 text-sm text-slate-400">
                  Fill out the form below and we will get back to you within one
                  business day.
                </p>

                {submitted && (
                  <div className="mt-6 flex items-center gap-3 rounded-lg border border-green-500/20 bg-green-500/10 p-4">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-green-400" />
                    <p className="text-sm text-green-300">
                      Thank you for reaching out. We have received your message and
                      will be in touch shortly.
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                  {/* Name & Email row */}
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="name"
                        className="mb-2 block text-sm font-medium text-slate-300"
                      >
                        Full Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Smith"
                        className="h-11 w-full rounded-lg border border-white/10 bg-white/5 px-4 text-sm text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-medium text-slate-300"
                      >
                        Email Address <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@company.com"
                        className="h-11 w-full rounded-lg border border-white/10 bg-white/5 px-4 text-sm text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {/* Phone & Service Type */}
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="phone"
                        className="mb-2 block text-sm font-medium text-slate-300"
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="(502) 555-0123"
                        className="h-11 w-full rounded-lg border border-white/10 bg-white/5 px-4 text-sm text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="serviceType"
                        className="mb-2 block text-sm font-medium text-slate-300"
                      >
                        Service Type
                      </label>
                      <select
                        id="serviceType"
                        name="serviceType"
                        value={formData.serviceType}
                        onChange={handleChange}
                        className="h-11 w-full rounded-lg border border-white/10 bg-white/5 px-4 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      >
                        <option value="" className="bg-[#0e1b36]">
                          Select a service...
                        </option>
                        {serviceTypes.map((type) => (
                          <option
                            key={type}
                            value={type}
                            className="bg-[#0e1b36]"
                          >
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Urgency & Preferred Date */}
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="urgency"
                        className="mb-2 block text-sm font-medium text-slate-300"
                      >
                        Urgency Level
                      </label>
                      <select
                        id="urgency"
                        name="urgency"
                        value={formData.urgency}
                        onChange={handleChange}
                        className="h-11 w-full rounded-lg border border-white/10 bg-white/5 px-4 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      >
                        <option value="normal" className="bg-[#0e1b36]">
                          Normal - Schedule at convenience
                        </option>
                        <option value="high" className="bg-[#0e1b36]">
                          High - Within 24-48 hours
                        </option>
                        <option value="emergency" className="bg-[#0e1b36]">
                          Emergency - Immediate assistance needed
                        </option>
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="preferredDate"
                        className="mb-2 block text-sm font-medium text-slate-300"
                      >
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        id="preferredDate"
                        name="preferredDate"
                        value={formData.preferredDate}
                        onChange={handleChange}
                        className="h-11 w-full rounded-lg border border-white/10 bg-white/5 px-4 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label
                      htmlFor="description"
                      className="mb-2 block text-sm font-medium text-slate-300"
                    >
                      Describe Your Issue or Request
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows={5}
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Tell us about your HVAC, refrigeration, or ice machine needs. Include equipment details, symptoms, or any other relevant information..."
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  {/* Photo Upload Area */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-300">
                      Upload Photos (Optional)
                    </label>
                    <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-white/10 bg-white/[0.02] px-6 py-10 transition-colors hover:border-blue-500/30 hover:bg-white/[0.04]">
                      <div className="text-center">
                        <Upload className="mx-auto h-10 w-10 text-slate-500" />
                        <p className="mt-3 text-sm text-slate-400">
                          Drag and drop photos here, or{" "}
                          <span className="cursor-pointer font-medium text-blue-400 hover:text-blue-300">
                            browse files
                          </span>
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          PNG, JPG, or HEIC up to 10MB each
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="btn-accent inline-flex w-full items-center justify-center gap-2 text-base sm:w-auto"
                  >
                    <Send className="h-5 w-5" />
                    <span>Send Message</span>
                  </button>
                </form>
              </div>
            </motion.div>

            {/* Contact Info (right, 2 cols) */}
            <motion.div
              {...fadeInUp}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6 lg:col-span-2"
            >
              {/* Address */}
              <div className="glass-card rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/10 ring-1 ring-blue-500/20">
                    <MapPin className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">
                      Our Location
                    </h3>
                    <p className="mt-1 text-sm text-slate-400">
                      917 Ulrich Ave
                      <br />
                      Louisville, KY 40219
                    </p>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="glass-card rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/10 ring-1 ring-blue-500/20">
                    <Phone className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">Phone</h3>
                    <a
                      href="tel:5029693377"
                      className="mt-1 block text-lg font-bold text-blue-400 transition-colors hover:text-blue-300"
                    >
                      (502) 969-3377
                    </a>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="glass-card rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/10 ring-1 ring-blue-500/20">
                    <Mail className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">Email</h3>
                    <a
                      href="mailto:info@fdpierce.com"
                      className="mt-1 block text-sm text-slate-400 transition-colors hover:text-white"
                    >
                      info@fdpierce.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div className="glass-card rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/10 ring-1 ring-blue-500/20">
                    <Clock className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">
                      Business Hours
                    </h3>
                    <div className="mt-2 space-y-1 text-sm text-slate-400">
                      <p>Monday - Friday: 8:00 AM - 4:30 PM</p>
                      <p>Saturday - Sunday: By appointment</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Emergency Badge */}
              <div className="rounded-2xl border border-red-500/20 bg-gradient-to-br from-red-500/10 to-orange-500/5 p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-500/20 ring-1 ring-red-500/30">
                    <AlertTriangle className="h-5 w-5 text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-red-300">
                      24/7 Emergency Service
                    </h3>
                    <p className="mt-1 text-sm text-slate-400">
                      HVAC emergencies do not wait for business hours. Call us
                      any time, day or night.
                    </p>
                    <a
                      href="tel:5029693377"
                      className="mt-2 inline-block text-lg font-bold text-red-400 transition-colors hover:text-red-300"
                    >
                      (502) 969-3377
                    </a>
                  </div>
                </div>
              </div>

              {/* Service Areas */}
              <div className="glass-card rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/10 ring-1 ring-blue-500/20">
                    <Building2 className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">
                      Service Areas
                    </h3>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {serviceAreas.map((area) => (
                        <span
                          key={area}
                          className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-400"
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* BBB Badge */}
              <div className="glass-card flex items-center gap-4 rounded-2xl p-6">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/10 ring-1 ring-blue-500/20">
                  <Shield className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">
                    BBB A+ Accredited
                  </h3>
                  <p className="mt-1 text-xs text-slate-500">
                    Maintaining our A+ rating since 1987
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

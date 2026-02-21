"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Shield,
  ChevronRight,
} from "lucide-react";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/financing", label: "Financing" },
  { href: "/memberships", label: "Memberships" },
  { href: "/reviews", label: "Reviews" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
];

const serviceLinks = [
  { href: "/services", label: "Commercial HVAC" },
  { href: "/services", label: "Refrigeration" },
  { href: "/services", label: "Ice Machines" },
  { href: "/services", label: "Preventive Maintenance" },
  { href: "/services", label: "System Installation" },
  { href: "/emergency", label: "Emergency Repair" },
];

const serviceAreas = [
  "Louisville",
  "Jeffersontown",
  "Shively",
  "Okolona",
  "Hillview",
  "Shepherdsville",
];

export default function SiteFooter() {
  return (
    <footer className="relative border-t border-white/5 bg-gradient-to-b from-[#070d1a] to-[#040810]">
      {/* Main footer grid */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Column 1: Company info + logo */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="mb-5 inline-flex items-center gap-2.5">
              <Image src="/images/logo.webp" alt="FD Pierce Company" width={40} height={40} className="h-10 w-auto" />
              <span className="text-[10px] font-medium uppercase leading-none tracking-[0.15em] text-slate-500">
                FD Pierce Company
              </span>
            </Link>
            <p className="mb-5 text-sm leading-relaxed text-slate-400">
              Serving the Louisville metro area since 1978. FD Pierce Company
              provides expert commercial HVAC, refrigeration, and ice machine
              services backed by an A+ BBB rating and a team of 16 certified
              technicians.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://facebook.com/fdpiercecompany"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-slate-400 transition-colors hover:bg-blue-500/20 hover:text-blue-400"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group flex items-center text-sm text-slate-400 transition-colors hover:text-white"
                  >
                    <ChevronRight className="mr-1.5 h-3 w-3 text-slate-600 transition-colors group-hover:text-blue-400" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Services
            </h3>
            <ul className="space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group flex items-center text-sm text-slate-400 transition-colors hover:text-white"
                  >
                    <ChevronRight className="mr-1.5 h-3 w-3 text-slate-600 transition-colors group-hover:text-blue-400" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Contact Info
            </h3>
            <ul className="space-y-3.5">
              <li>
                <a
                  href="tel:5029693377"
                  className="flex items-start gap-2.5 text-sm text-slate-400 transition-colors hover:text-white"
                >
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" />
                  (502) 969-3377
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@fdpierce.com"
                  className="flex items-start gap-2.5 text-sm text-slate-400 transition-colors hover:text-white"
                >
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" />
                  info@fdpierce.com
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-slate-400">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" />
                <span>
                  917 Ulrich Ave
                  <br />
                  Louisville, KY 40219
                </span>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-slate-400">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" />
                <span>
                  M-F 8:00 AM - 4:30 PM
                  <br />
                  Weekends by appointment
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter signup */}
        <div className="mt-12 rounded-xl border border-white/5 bg-white/[0.02] p-6 sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-base font-semibold text-white">
                Stay updated with FD Pierce
              </h3>
              <p className="mt-1 text-sm text-slate-400">
                Get seasonal tips, special offers, and company news delivered to
                your inbox.
              </p>
            </div>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex w-full gap-2 sm:w-auto"
            >
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-email"
                type="email"
                placeholder="Enter your email"
                className="h-10 w-full min-w-0 rounded-lg border border-white/10 bg-white/5 px-4 text-sm text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:w-64"
              />
              <button
                type="submit"
                className="shrink-0 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 px-5 py-2 text-sm font-semibold text-white transition-all hover:brightness-110"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Service Areas */}
        <div className="mt-8 text-center">
          <p className="text-xs text-slate-500">
            <span className="font-medium text-slate-400">
              Proudly serving:
            </span>{" "}
            {serviceAreas.join(" \u2022 ")}
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5 bg-black/20">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-4 py-5 text-xs text-slate-500 sm:flex-row sm:justify-between sm:px-6">
          <p>
            &copy; {new Date().getFullYear()} FD Pierce Company. All rights
            reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Shield className="h-3 w-3 text-blue-400" />
              BBB A+ Rated
            </span>
            <span className="text-slate-600">|</span>
            <span>KY HVAC License #M02537</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

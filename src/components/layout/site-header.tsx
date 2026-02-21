"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Phone,
  Clock,
  Menu,
  X,
  Facebook,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/financing", label: "Financing" },
  { href: "/memberships", label: "Memberships" },
  { href: "/reviews", label: "Reviews" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
];

export default function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Top info bar */}
      <div className="relative z-50 border-b border-white/5 bg-[#060e1e]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1.5 text-xs sm:px-6">
          <div className="flex items-center gap-4 text-slate-400">
            <a
              href="tel:5029693377"
              className="flex items-center gap-1.5 transition-colors hover:text-white"
            >
              <Phone className="h-3 w-3" />
              <span>(502) 969-3377</span>
            </a>
            <span className="hidden items-center gap-1.5 sm:flex">
              <Clock className="h-3 w-3" />
              <span>M-F 8:00 AM - 4:30 PM</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/emergency"
              className="flex items-center gap-1.5 rounded-full bg-red-500/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-red-400 transition-colors hover:bg-red-500/20 hover:text-red-300"
            >
              <Shield className="h-3 w-3" />
              24/7 Emergency
            </Link>
            <a
              href="https://www.facebook.com/profile.php?id=61572412371677"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 transition-colors hover:text-blue-400"
              aria-label="Facebook"
            >
              <Facebook className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Main header / nav */}
      <header
        className={cn(
          "sticky top-0 z-40 w-full border-b transition-all duration-300",
          scrolled
            ? "border-white/10 bg-[#0a1628]/90 shadow-lg shadow-black/20 backdrop-blur-xl"
            : "border-white/5 bg-[#0a1628]"
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/images/logo.webp" alt="FD Pierce Company" width={48} height={48} className="h-12 w-auto" />
            <span className="text-[10px] font-medium uppercase leading-none tracking-[0.15em] text-slate-500">
              Keeping it Cool
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-0.5 lg:flex" role="navigation" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive(link.href)
                    ? "text-white"
                    : "text-slate-400 hover:text-white"
                )}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute bottom-0 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400" />
                )}
              </Link>
            ))}
          </nav>

          {/* Right side: CTA + hamburger */}
          <div className="flex items-center gap-3">
            <Link
              href="/auth/login"
              className="hidden rounded-md px-3 py-2 text-sm font-medium text-slate-400 transition-colors hover:text-white sm:inline-flex"
            >
              Dashboard
            </Link>
            <Link
              href="/contact"
              className="hidden rounded-lg bg-gradient-to-r from-orange-500 to-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition-all hover:shadow-orange-500/30 hover:brightness-110 sm:inline-flex"
            >
              Request Service
            </Link>

            {/* Mobile hamburger */}
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-white/5 hover:text-white lg:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer overlay */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden",
          mobileOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        )}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile slide-in drawer */}
      <div
        className={cn(
          "fixed right-0 top-0 z-50 flex h-full w-72 flex-col bg-[#0b1120] shadow-2xl transition-transform duration-300 ease-out lg:hidden",
          mobileOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between border-b border-white/5 px-5 py-4">
          <Link
            href="/"
            className="flex items-center gap-2"
            onClick={() => setMobileOpen(false)}
          >
            <Image src="/images/logo.webp" alt="FD Pierce Company" width={40} height={40} className="h-10 w-auto" />
          </Link>
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Drawer nav links */}
        <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Mobile navigation">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive(link.href)
                    ? "bg-blue-500/10 text-blue-400"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>

        {/* Drawer footer */}
        <div className="border-t border-white/5 p-4">
          <Link
            href="/auth/login"
            onClick={() => setMobileOpen(false)}
            className="mb-2 flex w-full items-center justify-center rounded-lg border border-white/10 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/5"
          >
            Dashboard Login
          </Link>
          <Link
            href="/contact"
            onClick={() => setMobileOpen(false)}
            className="flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-orange-500 to-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg"
          >
            Request Service
          </Link>
          <div className="mt-3 flex flex-col gap-1.5 text-xs text-slate-500">
            <a
              href="tel:5029693377"
              className="flex items-center gap-1.5 transition-colors hover:text-white"
            >
              <Phone className="h-3 w-3" />
              (502) 969-3377
            </a>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3 w-3" />
              M-F 8:00 AM - 4:30 PM
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

"use client";

import { useState } from "react";
import { cn, formatCurrency } from "@/lib/utils";
import {
  Wrench,
  CreditCard,
  CalendarCheck,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  Phone,
  Clock,
  CheckCircle2,
  Send,
  Crown,
  Shield,
  AlertCircle,
  Star,
  Thermometer,
  Snowflake,
  ExternalLink,
  FileText,
  User,
  CalendarDays,
} from "lucide-react";

/* ---------- Types ---------- */

interface ServiceRecord {
  id: number;
  date: string;
  jobType: string;
  description: string;
  technician: string;
  cost: number;
  status: "Completed" | "Pending";
  techNotes: string;
}

interface UnitInfo {
  id: number;
  brand: string;
  model: string;
  type: string;
  installDate: string;
  lastService: string;
  condition: "Excellent" | "Good" | "Fair" | "Poor";
  warrantyStatus: string;
}

interface Invoice {
  id: string;
  amount: number;
  status: "PAID" | "SENT" | "OVERDUE";
  date: string;
  description: string;
}

/* ---------- Mock Data ---------- */

const serviceHistory: ServiceRecord[] = [
  {
    id: 1,
    date: "Jan 15, 2026",
    jobType: "Maintenance",
    description: "Annual maintenance - Carrier rooftop unit",
    technician: "Mike Johnson",
    cost: 385,
    status: "Completed",
    techNotes:
      "All readings normal. Replaced 4 filters, cleaned condenser coils. Refrigerant levels optimal. Recommended belt replacement at next visit.",
  },
  {
    id: 2,
    date: "Dec 10, 2025",
    jobType: "Ice Machine",
    description: "Ice machine deep cleaning and sanitization",
    technician: "Chris Davis",
    cost: 225,
    status: "Completed",
    techNotes:
      "Full sanitization completed. Replaced water filter. Ice production rate within spec at 950 lbs/day.",
  },
  {
    id: 3,
    date: "Nov 18, 2025",
    jobType: "AC Repair",
    description: "Split system not cooling - replaced contactor",
    technician: "Mike Johnson",
    cost: 520,
    status: "Completed",
    techNotes:
      "Faulty compressor contactor causing intermittent cooling loss. Replaced with OEM part. System running at full capacity.",
  },
  {
    id: 4,
    date: "Aug 22, 2025",
    jobType: "Maintenance",
    description: "Summer maintenance check - all units",
    technician: "Tony Martinez",
    cost: 650,
    status: "Completed",
    techNotes:
      "All 3 units inspected. Minor coil fouling on RTU. Deep clean performed. All other readings normal.",
  },
  {
    id: 5,
    date: "Jun 5, 2025",
    jobType: "Refrigeration",
    description: "Walk-in cooler temperature fluctuation",
    technician: "Mike Johnson",
    cost: 890,
    status: "Completed",
    techNotes:
      "Expansion valve sticking intermittently. Replaced TXV and charged system. Temp stable at 38F.",
  },
];

const units: UnitInfo[] = [
  {
    id: 1,
    brand: "Carrier",
    model: "50XC",
    type: "Rooftop Unit",
    installDate: "2019",
    lastService: "Jan 2026",
    condition: "Good",
    warrantyStatus: "Parts warranty until 2029",
  },
  {
    id: 2,
    brand: "Trane",
    model: "XR15",
    type: "Split System",
    installDate: "2021",
    lastService: "Nov 2025",
    condition: "Excellent",
    warrantyStatus: "Full warranty until 2031",
  },
  {
    id: 3,
    brand: "Hoshizaki",
    model: "KM-901MAJ",
    type: "Ice Machine",
    installDate: "2022",
    lastService: "Dec 2025",
    condition: "Good",
    warrantyStatus: "Parts warranty until 2027",
  },
];

const invoices: Invoice[] = [
  {
    id: "FDP-INV-045",
    amount: 1250,
    status: "PAID",
    date: "Jan 15, 2026",
    description: "Annual maintenance + parts",
  },
  {
    id: "FDP-INV-052",
    amount: 3400,
    status: "PAID",
    date: "Nov 20, 2025",
    description: "AC repair + emergency service",
  },
  {
    id: "FDP-INV-058",
    amount: 890,
    status: "SENT",
    date: "Feb 10, 2026",
    description: "Refrigeration repair",
  },
];

/* ---------- Helpers ---------- */

function ConditionBadge({ condition }: { condition: UnitInfo["condition"] }) {
  const styles: Record<string, string> = {
    Excellent: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
    Good: "bg-blue-500/15 text-blue-400 border-blue-500/25",
    Fair: "bg-amber-500/15 text-amber-400 border-amber-500/25",
    Poor: "bg-red-500/15 text-red-400 border-red-500/25",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium",
        styles[condition]
      )}
    >
      {condition}
    </span>
  );
}

function InvoiceStatusBadge({ status }: { status: Invoice["status"] }) {
  if (status === "PAID") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/25 bg-emerald-500/15 px-2 py-0.5 text-xs font-medium text-emerald-400">
        <CheckCircle2 className="h-3 w-3" />
        Paid
      </span>
    );
  }
  if (status === "SENT") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full border border-blue-500/25 bg-blue-500/15 px-2 py-0.5 text-xs font-medium text-blue-400">
        <Send className="h-3 w-3" />
        Sent
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-red-500/25 bg-red-500/15 px-2 py-0.5 text-xs font-medium text-red-400">
      <AlertCircle className="h-3 w-3" />
      Overdue
    </span>
  );
}

/* ================================================================== */
/*  MAIN PAGE                                                          */
/* ================================================================== */

export default function PortalPage() {
  const [expandedServiceId, setExpandedServiceId] = useState<number | null>(null);

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-8">
      {/* ---- Welcome ---- */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white sm:text-3xl">
          Welcome back, James
        </h1>
        <p className="mt-1 text-sm text-gray-400">
          Here is an overview of your HVAC systems and account.
        </p>
      </div>

      {/* ---- Quick Actions ---- */}
      <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          {
            icon: Wrench,
            label: "Request Service",
            color: "text-blue-400",
            bg: "bg-blue-500/10 border-blue-500/20",
          },
          {
            icon: CreditCard,
            label: "Pay Invoice",
            color: "text-emerald-400",
            bg: "bg-emerald-500/10 border-emerald-500/20",
          },
          {
            icon: CalendarCheck,
            label: "Schedule Maintenance",
            color: "text-purple-400",
            bg: "bg-purple-500/10 border-purple-500/20",
          },
          {
            icon: MessageCircle,
            label: "Chat with Us",
            color: "text-amber-400",
            bg: "bg-amber-500/10 border-amber-500/20",
          },
        ].map(({ icon: Icon, label, color, bg }) => (
          <button
            key={label}
            type="button"
            className={cn(
              "flex min-h-[72px] flex-col items-center justify-center gap-2 rounded-xl border p-3 transition-all hover:scale-[1.02] active:scale-[0.98] sm:min-h-[80px]",
              bg
            )}
          >
            <Icon className={cn("h-6 w-6", color)} />
            <span className="text-xs font-medium text-gray-300">{label}</span>
          </button>
        ))}
      </div>

      {/* ---- Upcoming Appointments ---- */}
      <section className="mb-8">
        <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold text-white">
          <CalendarDays className="h-5 w-5 text-blue-400" />
          Upcoming Appointments
        </h2>
        <div className="rounded-xl border border-blue-500/20 bg-[#0f1729] p-4 shadow-lg shadow-blue-500/5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/10">
                <CalendarCheck className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">
                  Annual Maintenance
                </p>
                <p className="mt-0.5 text-xs text-gray-400">
                  Feb 28, 2026 at 10:00 AM
                </p>
                <p className="mt-0.5 flex items-center gap-1 text-xs text-gray-500">
                  <User className="h-3 w-3" />
                  Tech: Mike Johnson
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-gray-300 transition-colors hover:bg-white/10"
              >
                Reschedule
              </button>
              <button
                type="button"
                className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-blue-500"
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ---- My Units ---- */}
      <section className="mb-8">
        <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold text-white">
          <Thermometer className="h-5 w-5 text-blue-400" />
          My Units
        </h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {units.map((unit) => {
            const icons: Record<string, React.ReactNode> = {
              "Rooftop Unit": <Thermometer className="h-5 w-5 text-blue-400" />,
              "Split System": <Snowflake className="h-5 w-5 text-cyan-400" />,
              "Ice Machine": <Snowflake className="h-5 w-5 text-purple-400" />,
            };

            return (
              <div
                key={unit.id}
                className="rounded-xl border border-white/10 bg-[#0f1729] p-4 transition-all hover:border-white/20"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5">
                    {icons[unit.type]}
                  </div>
                  <ConditionBadge condition={unit.condition} />
                </div>
                <h3 className="mt-3 text-sm font-semibold text-white">
                  {unit.brand} {unit.model}
                </h3>
                <p className="text-xs text-gray-400">{unit.type}</p>
                <div className="mt-3 space-y-1.5 border-t border-white/5 pt-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Installed</span>
                    <span className="text-gray-300">{unit.installDate}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Last Service</span>
                    <span className="text-gray-300">{unit.lastService}</span>
                  </div>
                  <div className="flex items-start justify-between text-xs">
                    <span className="text-gray-500">Warranty</span>
                    <span className="text-right text-gray-300">
                      {unit.warrantyStatus}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ---- Service History ---- */}
      <section className="mb-8">
        <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold text-white">
          <Clock className="h-5 w-5 text-blue-400" />
          Service History
        </h2>
        <div className="space-y-3">
          {serviceHistory.map((service) => {
            const isExpanded = expandedServiceId === service.id;
            return (
              <button
                key={service.id}
                type="button"
                onClick={() =>
                  setExpandedServiceId(isExpanded ? null : service.id)
                }
                className="w-full text-left rounded-xl border border-white/10 bg-[#0f1729] p-4 transition-all hover:border-white/20"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">
                        {service.date}
                      </span>
                      <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-gray-400">
                        {service.jobType}
                      </span>
                    </div>
                    <p className="mt-1 text-sm font-medium text-white">
                      {service.description}
                    </p>
                    <p className="mt-1 flex items-center gap-1 text-xs text-gray-500">
                      <User className="h-3 w-3" />
                      {service.technician}
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-1">
                    <span className="text-sm font-semibold text-white">
                      {formatCurrency(service.cost)}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-emerald-400">
                      <CheckCircle2 className="h-3 w-3" />
                      {service.status}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="mt-1 h-4 w-4 text-gray-500" />
                    ) : (
                      <ChevronDown className="mt-1 h-4 w-4 text-gray-500" />
                    )}
                  </div>
                </div>

                {isExpanded && (
                  <div className="mt-3 space-y-2 border-t border-white/5 pt-3">
                    <div className="rounded-lg bg-white/5 p-3">
                      <p className="text-xs font-medium text-gray-300">
                        Technician Notes:
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-gray-400">
                        {service.techNotes}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <FileText className="h-3.5 w-3.5" />
                      <span>Photos and documents available on request</span>
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* ---- Invoices ---- */}
      <section className="mb-8">
        <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold text-white">
          <CreditCard className="h-5 w-5 text-blue-400" />
          Invoices
        </h2>
        <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0f1729]">
          {invoices.map((inv, i) => (
            <div
              key={inv.id}
              className={cn(
                "flex items-center justify-between gap-3 p-4",
                i < invoices.length - 1 && "border-b border-white/5"
              )}
            >
              <div className="min-w-0">
                <p className="text-sm font-medium text-white">#{inv.id}</p>
                <p className="mt-0.5 text-xs text-gray-500">
                  {inv.date} - {inv.description}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <span className="text-sm font-semibold text-white">
                  {formatCurrency(inv.amount)}
                </span>
                <InvoiceStatusBadge status={inv.status} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---- Membership ---- */}
      <section className="mb-8">
        <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold text-white">
          <Crown className="h-5 w-5 text-amber-400" />
          Membership
        </h2>
        <div className="relative overflow-hidden rounded-xl border border-amber-500/20 bg-[#0f1729]">
          {/* Gold gradient strip */}
          <div className="h-1 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500" />
          <div className="p-5">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/25 bg-amber-500/15 px-3 py-1 text-sm font-semibold text-amber-400">
                <Star className="h-4 w-4" />
                Gold Member
              </span>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-lg bg-white/5 p-3">
                <p className="text-xs text-gray-500">Visits Included</p>
                <p className="mt-1 text-sm font-semibold text-white">
                  2/year{" "}
                  <span className="text-xs font-normal text-gray-400">
                    (1 used)
                  </span>
                </p>
              </div>
              <div className="rounded-lg bg-white/5 p-3">
                <p className="text-xs text-gray-500">Parts Discount</p>
                <p className="mt-1 text-sm font-semibold text-white">20% off</p>
              </div>
              <div className="rounded-lg bg-white/5 p-3">
                <p className="text-xs text-gray-500">Priority Scheduling</p>
                <p className="mt-1 flex items-center gap-1 text-sm font-semibold text-emerald-400">
                  <CheckCircle2 className="h-4 w-4" />
                  Active
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-4">
              <p className="text-xs text-gray-500">
                Next renewal:{" "}
                <span className="text-gray-300">June 2026</span>
              </p>
              <button
                type="button"
                className="text-xs font-medium text-blue-400 hover:text-blue-300"
              >
                Manage Plan
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Maintenance Reminders ---- */}
      <section className="mb-8">
        <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold text-white">
          <Shield className="h-5 w-5 text-blue-400" />
          Maintenance Reminders
        </h2>
        <div className="rounded-xl border border-amber-500/15 bg-amber-500/5 p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-500/10">
                <AlertCircle className="h-5 w-5 text-amber-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">
                  Spring Maintenance Due
                </p>
                <p className="mt-0.5 text-xs text-gray-400">
                  Your Carrier 50XC is due for spring maintenance in March 2026
                </p>
              </div>
            </div>
            <button
              type="button"
              className="flex items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-blue-500/25 transition-all hover:from-blue-500 hover:to-blue-400"
            >
              <CalendarCheck className="h-4 w-4" />
              Schedule Now
            </button>
          </div>
        </div>
      </section>

      {/* ---- Bottom Help Bar ---- */}
      <footer className="rounded-xl border border-white/10 bg-[#0f1729] p-5 text-center">
        <p className="text-sm text-gray-400">Need Help?</p>
        <div className="mt-3 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <a
            href="tel:5029693377"
            className="flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-blue-400"
          >
            <Phone className="h-4 w-4 text-blue-400" />
            (502) 969-3377
          </a>
          <span className="hidden text-gray-600 sm:inline">|</span>
          <button
            type="button"
            className="flex items-center gap-2 rounded-lg bg-blue-600/20 px-4 py-2 text-sm font-medium text-blue-400 transition-colors hover:bg-blue-600/30"
          >
            <MessageCircle className="h-4 w-4" />
            Chat
            <ExternalLink className="h-3 w-3" />
          </button>
        </div>
      </footer>
    </div>
  );
}

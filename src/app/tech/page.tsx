"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Calendar,
  ClipboardList,
  MapPin,
  MessageCircle,
  User,
  CheckCircle2,
  Clock,
  Phone,
  Navigation,
  Play,
  Camera,
  Mic,
  Package,
  FileText,
  Plus,
  ChevronDown,
  ChevronUp,
  Snowflake,
  Truck,
  Sparkles,
  AlertTriangle,
  Wrench,
  Thermometer,
  Shield,
} from "lucide-react";

/* ---------- Types ---------- */

type JobStatus = "COMPLETED" | "IN_PROGRESS" | "SCHEDULED";
type JobType = "AC Repair" | "Maintenance" | "Refrigeration" | "Ice Machine" | "Emergency";

interface Job {
  id: number;
  time: string;
  customer: string;
  address: string;
  fullAddress: string;
  phone: string;
  jobType: JobType;
  status: JobStatus;
  unitInfo: string;
  customerNotes: string;
  previousService: string;
  issue?: string;
}

/* ---------- Mock Data ---------- */

const todaysJobs: Job[] = [
  {
    id: 1,
    time: "8:00 AM",
    customer: "Louisville Grill House",
    address: "2100 Bardstown Rd",
    fullAddress: "2100 Bardstown Rd, Louisville, KY 40205",
    phone: "(502) 555-0142",
    jobType: "AC Repair",
    status: "COMPLETED",
    unitInfo: "Carrier 50XC - Rooftop Unit, 15 tons, Installed 2018",
    customerNotes: "Access through rear loading dock. Ask for manager Dave.",
    previousService: "Last service: Nov 2025 - Replaced compressor contactor",
  },
  {
    id: 2,
    time: "10:30 AM",
    customer: "Metro Office Park",
    address: "4500 Poplar Level Rd",
    fullAddress: "4500 Poplar Level Rd, Louisville, KY 40213",
    phone: "(502) 555-0298",
    jobType: "Maintenance",
    status: "IN_PROGRESS",
    unitInfo: "Trane RTU - Rooftop Unit, 20 tons",
    customerNotes: "Building B, rooftop access via stairwell C. Key with security.",
    previousService: "Last service: Aug 2025 - Annual maintenance, all readings normal",
    issue: "Annual maintenance - filter change, coil cleaning, check refrigerant",
  },
  {
    id: 3,
    time: "1:00 PM",
    customer: "Riverside Hotel",
    address: "700 W Main St",
    fullAddress: "700 W Main St, Louisville, KY 40202",
    phone: "(502) 555-0377",
    jobType: "Refrigeration",
    status: "SCHEDULED",
    unitInfo: "Carrier 50XC - Rooftop Unit, 15 tons, Installed 2018",
    customerNotes: "Walk-in cooler in kitchen basement. Chef requests morning visits preferred.",
    previousService: "Last service: Oct 2025 - Replaced evaporator fan motor",
  },
  {
    id: 4,
    time: "3:00 PM",
    customer: "Churchill Medical",
    address: "3200 Shelbyville Rd",
    fullAddress: "3200 Shelbyville Rd, Louisville, KY 40207",
    phone: "(502) 555-0451",
    jobType: "Ice Machine",
    status: "SCHEDULED",
    unitInfo: "Hoshizaki KM-901MAJ - Ice Machine, Installed 2020",
    customerNotes: "Break room, 2nd floor. Badge in at front desk.",
    previousService: "Last service: Sep 2025 - Deep cleaning and sanitization",
  },
  {
    id: 5,
    time: "5:00 PM",
    customer: "Bardstown Bistro",
    address: "1800 Bardstown Rd",
    fullAddress: "1800 Bardstown Rd, Louisville, KY 40204",
    phone: "(502) 555-0523",
    jobType: "Emergency",
    status: "SCHEDULED",
    unitInfo: "Lennox LGA - Rooftop Unit, 10 tons, Installed 2016",
    customerNotes: "AC completely down. Dining room temps reaching 85F. Owner: Sarah K.",
    previousService: "Last service: Jul 2025 - Refrigerant recharge, noted potential compressor issues",
  },
];

const partsUsed = [
  { name: '16x25x4 MERV-13 Filter', qty: 4, price: 28.50 },
  { name: 'Coil Cleaner - Nu-Calgon', qty: 1, price: 12.00 },
];

/* ---------- Status Helpers ---------- */

function StatusIndicator({ status }: { status: JobStatus }) {
  if (status === "COMPLETED") {
    return <CheckCircle2 className="h-5 w-5 text-emerald-400" />;
  }
  if (status === "IN_PROGRESS") {
    return (
      <span className="relative flex h-3 w-3">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
        <span className="relative inline-flex h-3 w-3 rounded-full bg-blue-500" />
      </span>
    );
  }
  return <span className="h-3 w-3 rounded-full bg-gray-500" />;
}

function JobTypeBadge({ type }: { type: JobType }) {
  const styles: Record<JobType, string> = {
    "AC Repair": "bg-blue-500/15 text-blue-400 border-blue-500/25",
    Maintenance: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
    Refrigeration: "bg-cyan-500/15 text-cyan-400 border-cyan-500/25",
    "Ice Machine": "bg-purple-500/15 text-purple-400 border-purple-500/25",
    Emergency: "bg-red-500/15 text-red-400 border-red-500/25",
  };

  const icons: Record<JobType, React.ReactNode> = {
    "AC Repair": <Wrench className="h-3 w-3" />,
    Maintenance: <Shield className="h-3 w-3" />,
    Refrigeration: <Thermometer className="h-3 w-3" />,
    "Ice Machine": <Snowflake className="h-3 w-3" />,
    Emergency: <AlertTriangle className="h-3 w-3" />,
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium",
        styles[type]
      )}
    >
      {icons[type]}
      {type}
    </span>
  );
}

/* ---------- Job Card ---------- */

function JobCard({
  job,
  isExpanded,
  onToggle,
}: {
  job: Job;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const isEmergency = job.jobType === "Emergency";

  return (
    <button
      type="button"
      onClick={onToggle}
      className={cn(
        "w-full text-left rounded-xl border bg-[#0f1729] p-4 transition-all duration-200",
        job.status === "COMPLETED"
          ? "border-white/5 opacity-70"
          : isEmergency
            ? "border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.08)]"
            : "border-white/10",
        isExpanded && "border-blue-500/25 shadow-lg"
      )}
    >
      {/* Header row */}
      <div className="flex items-start gap-3">
        {/* Time */}
        <div className="flex min-w-[70px] flex-col items-center pt-0.5">
          <span className="text-sm font-bold text-white">{job.time}</span>
          <StatusIndicator status={job.status} />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3 className="truncate text-sm font-semibold text-white">
              {job.customer}
            </h3>
            {isExpanded ? (
              <ChevronUp className="h-4 w-4 shrink-0 text-gray-500" />
            ) : (
              <ChevronDown className="h-4 w-4 shrink-0 text-gray-500" />
            )}
          </div>
          <p className="mt-0.5 text-xs text-gray-400">{job.address}</p>
          <div className="mt-2 flex items-center gap-2">
            <JobTypeBadge type={job.jobType} />
            {isEmergency && job.status === "SCHEDULED" && (
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Expanded details */}
      {isExpanded && (
        <div className="mt-4 space-y-3 border-t border-white/5 pt-4">
          <div className="space-y-2 text-xs">
            <div className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gray-500" />
              <span className="text-gray-300">{job.fullAddress}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-3.5 w-3.5 shrink-0 text-gray-500" />
              <span className="text-gray-300">{job.phone}</span>
            </div>
            <div className="flex items-start gap-2">
              <Package className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gray-500" />
              <span className="text-gray-300">{job.unitInfo}</span>
            </div>
          </div>

          <div className="rounded-lg bg-white/5 p-3 text-xs text-gray-400">
            <p className="font-medium text-gray-300">Customer Notes:</p>
            <p className="mt-1">{job.customerNotes}</p>
          </div>

          <p className="text-xs text-gray-500 italic">{job.previousService}</p>

          {/* Action buttons */}
          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={(e) => e.stopPropagation()}
              className="flex min-h-[44px] flex-1 items-center justify-center gap-1.5 rounded-lg bg-blue-600/20 text-xs font-medium text-blue-400 active:bg-blue-600/30"
            >
              <Navigation className="h-4 w-4" />
              Navigate
            </button>
            {job.status !== "COMPLETED" && (
              <button
                type="button"
                onClick={(e) => e.stopPropagation()}
                className="flex min-h-[44px] flex-1 items-center justify-center gap-1.5 rounded-lg bg-emerald-600/20 text-xs font-medium text-emerald-400 active:bg-emerald-600/30"
              >
                <Play className="h-4 w-4" />
                Start Job
              </button>
            )}
            <button
              type="button"
              onClick={(e) => e.stopPropagation()}
              className="flex min-h-[44px] flex-1 items-center justify-center gap-1.5 rounded-lg bg-white/5 text-xs font-medium text-gray-400 active:bg-white/10"
            >
              <Phone className="h-4 w-4" />
              Call
            </button>
          </div>
        </div>
      )}
    </button>
  );
}

/* ---------- Bottom Nav ---------- */

function BottomNav({ active }: { active: string }) {
  const items = [
    { key: "today", label: "Today", icon: Calendar },
    { key: "jobs", label: "Jobs", icon: ClipboardList },
    { key: "map", label: "Map", icon: MapPin },
    { key: "messages", label: "Messages", icon: MessageCircle },
    { key: "profile", label: "Profile", icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-[#060e1e]/95 backdrop-blur-lg">
      <div className="mx-auto flex max-w-md items-center justify-around">
        {items.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            type="button"
            className={cn(
              "flex min-h-[56px] flex-1 flex-col items-center justify-center gap-0.5 text-[10px] font-medium transition-colors",
              active === key
                ? "text-blue-400"
                : "text-gray-500 active:text-gray-300"
            )}
          >
            <Icon className="h-5 w-5" />
            {label}
            {active === key && (
              <span className="absolute bottom-1 h-0.5 w-6 rounded-full bg-blue-400" />
            )}
          </button>
        ))}
      </div>
    </nav>
  );
}

/* ================================================================== */
/*  MAIN PAGE                                                          */
/* ================================================================== */

export default function TechPage() {
  const [expandedJobId, setExpandedJobId] = useState<number | null>(2); // IN_PROGRESS expanded by default
  const [techNotes, setTechNotes] = useState("");

  const today = new Date();
  const dateStr = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const currentJob = todaysJobs.find((j) => j.status === "IN_PROGRESS")!;
  const completedCount = todaysJobs.filter((j) => j.status === "COMPLETED").length;

  return (
    <div className="mx-auto max-w-md pb-24">
      {/* ---- Top Bar ---- */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#060e1e]/95 px-4 py-3 backdrop-blur-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Snowflake className="h-5 w-5 text-blue-400" />
            <span className="text-sm font-bold text-white">FD Pierce</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-gray-300">
              <Truck className="h-3 w-3" />
              T-03
            </span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-white">Mike Johnson</span>
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* ---- Date + Summary ---- */}
      <div className="px-4 pt-4 pb-2">
        <h1 className="text-lg font-bold text-white">{dateStr}</h1>
        <p className="mt-1 text-xs text-gray-400">
          {completedCount}/{todaysJobs.length} jobs completed
        </p>
        {/* Progress bar */}
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/5">
          <div
            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-emerald-500 transition-all duration-500"
            style={{ width: `${(completedCount / todaysJobs.length) * 100}%` }}
          />
        </div>
      </div>

      {/* ---- Today's Jobs ---- */}
      <section className="px-4 pt-4">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-400">
          Today&apos;s Jobs
        </h2>
        <div className="space-y-3">
          {todaysJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              isExpanded={expandedJobId === job.id}
              onToggle={() =>
                setExpandedJobId((prev) => (prev === job.id ? null : job.id))
              }
            />
          ))}
        </div>
      </section>

      {/* ---- Current Job Detail ---- */}
      <section className="px-4 pt-8">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-400">
          Current Job
        </h2>

        <div className="space-y-4 rounded-xl border border-blue-500/20 bg-[#0f1729] p-4 shadow-lg shadow-blue-500/5">
          {/* Customer info */}
          <div>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-blue-500" />
              </span>
              <span className="text-xs font-medium uppercase tracking-wider text-blue-400">
                In Progress
              </span>
            </div>
            <h3 className="mt-2 text-lg font-bold text-white">
              {currentJob.customer}
            </h3>
            <p className="mt-1 text-sm text-gray-400">{currentJob.fullAddress}</p>
          </div>

          {/* Unit + Issue */}
          <div className="space-y-2 rounded-lg bg-white/5 p-3">
            <div className="flex items-start gap-2 text-xs">
              <Package className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gray-500" />
              <span className="text-gray-300">{currentJob.unitInfo}</span>
            </div>
            <div className="flex items-start gap-2 text-xs">
              <ClipboardList className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gray-500" />
              <span className="text-gray-300">{currentJob.issue}</span>
            </div>
          </div>

          {/* Quick action buttons */}
          <div className="grid grid-cols-4 gap-2">
            {[
              { icon: Camera, label: "Add Photo", color: "text-blue-400" },
              { icon: Mic, label: "Voice Note", color: "text-purple-400" },
              { icon: Package, label: "Add Parts", color: "text-amber-400" },
              { icon: FileText, label: "Notes", color: "text-emerald-400" },
            ].map(({ icon: Icon, label, color }) => (
              <button
                key={label}
                type="button"
                className="flex min-h-[64px] flex-col items-center justify-center gap-1.5 rounded-xl border border-white/5 bg-white/5 transition-colors active:bg-white/10"
              >
                <Icon className={cn("h-5 w-5", color)} />
                <span className="text-[10px] font-medium text-gray-400">
                  {label}
                </span>
              </button>
            ))}
          </div>

          {/* Parts Used */}
          <div>
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-white">Parts Used</h4>
              <button
                type="button"
                className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-blue-400 active:bg-white/5"
              >
                <Plus className="h-3 w-3" />
                Add Part
              </button>
            </div>
            <div className="mt-2 space-y-2">
              {partsUsed.map((part) => (
                <div
                  key={part.name}
                  className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2 text-xs"
                >
                  <div>
                    <span className="text-gray-300">{part.name}</span>
                    <span className="ml-2 text-gray-500">x{part.qty}</span>
                  </div>
                  <span className="font-medium text-gray-300">
                    ${(part.price * part.qty).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Notes */}
          <div>
            <label
              htmlFor="tech-notes"
              className="mb-1.5 block text-sm font-semibold text-white"
            >
              Tech Notes
            </label>
            <textarea
              id="tech-notes"
              value={techNotes}
              onChange={(e) => setTechNotes(e.target.value)}
              placeholder="Add notes about this service call..."
              rows={3}
              className="w-full resize-y rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>

          {/* AI Suggestion */}
          <div className="relative overflow-hidden rounded-xl p-[1px]">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500" />
            <div className="relative rounded-[11px] bg-[#0f1729] p-4">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-purple-400" />
                <span className="text-xs font-semibold text-purple-300">
                  AI Suggestion
                </span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-gray-300">
                Unit is 12 years old. Consider discussing replacement options
                with customer. Estimated remaining life: 3-5 years.
              </p>
            </div>
          </div>

          {/* Mark Complete */}
          <button
            type="button"
            className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all active:from-emerald-700 active:to-emerald-600"
          >
            <CheckCircle2 className="h-5 w-5" />
            Mark Complete
          </button>

          {/* Upsell Opportunity */}
          <div className="rounded-xl border border-amber-500/15 bg-amber-500/5 p-3">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-amber-400">
                Upsell Opportunity
              </span>
            </div>
            <p className="mt-1.5 text-xs text-gray-400">
              Maintenance membership - customer has no plan. Suggest{" "}
              <span className="font-medium text-amber-300">
                Silver ($49/mo)
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* ---- Bottom Navigation ---- */}
      <BottomNav active="today" />
    </div>
  );
}

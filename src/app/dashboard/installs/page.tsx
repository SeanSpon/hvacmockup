import { prisma } from "@/lib/db";
import { cn, formatCurrency, formatDate } from "@/lib/utils";
import {
  Plus,
  MapPin,
  Phone,
  Package,
  FileCheck,
  Calendar,
  DollarSign,
  Wrench,
  ClipboardCheck,
  Truck,
  Clock,
  CheckCircle2,
  HardHat,
  Eye,
} from "lucide-react";
/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

type InstallStatus =
  | "PLANNING"
  | "EQUIPMENT_ORDERED"
  | "PERMIT_PENDING"
  | "SCHEDULED"
  | "IN_PROGRESS"
  | "INSPECTION"
  | "COMPLETE";

interface TimelineEvent {
  date: string;
  label: string;
  description?: string;
}

interface InstallProject {
  id: string;
  projectNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string | null;
  propertyAddress: string;
  equipmentOrdered: string;
  equipmentStatus: string;
  permitNumber: string | null;
  permitStatus: string;
  scheduledDate: Date | null;
  estimatedDays: number;
  totalCost: number;
  depositPaid: number;
  balanceDue: number;
  status: InstallStatus;
  notes: string | null;
  timeline: JsonValue | null;
  createdAt: Date;
  updatedAt: Date;
}

/* ------------------------------------------------------------------ */
/*  Pipeline stage config                                              */
/* ------------------------------------------------------------------ */

const STAGES: {
  key: InstallStatus;
  label: string;
  color: string;
  bgColor: string;
  icon: React.ReactNode;
}[] = [
  {
    key: "PLANNING",
    label: "Planning",
    color: "text-slate-400",
    bgColor: "bg-slate-500",
    icon: <ClipboardCheck className="h-4 w-4" />,
  },
  {
    key: "EQUIPMENT_ORDERED",
    label: "Equipment Ordered",
    color: "text-blue-400",
    bgColor: "bg-blue-500",
    icon: <Truck className="h-4 w-4" />,
  },
  {
    key: "PERMIT_PENDING",
    label: "Permit Pending",
    color: "text-amber-400",
    bgColor: "bg-amber-500",
    icon: <FileCheck className="h-4 w-4" />,
  },
  {
    key: "SCHEDULED",
    label: "Scheduled",
    color: "text-cyan-400",
    bgColor: "bg-cyan-500",
    icon: <Calendar className="h-4 w-4" />,
  },
  {
    key: "IN_PROGRESS",
    label: "In Progress",
    color: "text-orange-400",
    bgColor: "bg-orange-500",
    icon: <Wrench className="h-4 w-4" />,
  },
  {
    key: "INSPECTION",
    label: "Inspection",
    color: "text-violet-400",
    bgColor: "bg-violet-500",
    icon: <Eye className="h-4 w-4" />,
  },
  {
    key: "COMPLETE",
    label: "Complete",
    color: "text-emerald-400",
    bgColor: "bg-emerald-500",
    icon: <CheckCircle2 className="h-4 w-4" />,
  },
];

const stageIndex: Record<InstallStatus, number> = {
  PLANNING: 0,
  EQUIPMENT_ORDERED: 1,
  PERMIT_PENDING: 2,
  SCHEDULED: 3,
  IN_PROGRESS: 4,
  INSPECTION: 5,
  COMPLETE: 6,
};

const statusBadgeStyles: Record<InstallStatus, string> = {
  PLANNING: "bg-slate-500/15 text-slate-400 border-slate-500/25",
  EQUIPMENT_ORDERED: "bg-blue-500/15 text-blue-400 border-blue-500/25",
  PERMIT_PENDING: "bg-amber-500/15 text-amber-400 border-amber-500/25",
  SCHEDULED: "bg-cyan-500/15 text-cyan-400 border-cyan-500/25",
  IN_PROGRESS: "bg-orange-500/15 text-orange-400 border-orange-500/25",
  INSPECTION: "bg-violet-500/15 text-violet-400 border-violet-500/25",
  COMPLETE: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
};

const statusCardBorder: Record<InstallStatus, string> = {
  PLANNING: "border-l-slate-500",
  EQUIPMENT_ORDERED: "border-l-blue-500",
  PERMIT_PENDING: "border-l-amber-500",
  SCHEDULED: "border-l-cyan-500",
  IN_PROGRESS: "border-l-orange-500",
  INSPECTION: "border-l-violet-500",
  COMPLETE: "border-l-emerald-500",
};

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */

export default async function InstallsPage() {
  const projects = (await prisma.installProject.findMany({
    orderBy: { createdAt: "desc" },
  })) as unknown as InstallProject[];

  /* -- Pipeline counts -- */
  const stageCounts: Record<InstallStatus, number> = {
    PLANNING: 0,
    EQUIPMENT_ORDERED: 0,
    PERMIT_PENDING: 0,
    SCHEDULED: 0,
    IN_PROGRESS: 0,
    INSPECTION: 0,
    COMPLETE: 0,
  };
  for (const p of projects) {
    stageCounts[p.status]++;
  }
  const totalProjects = projects.length || 1;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Installation Projects
          </h1>
          <p className="mt-1 text-sm text-gray-400">
            Track equipment installations from planning to completion
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-blue-500/25 transition-all hover:from-blue-500 hover:to-blue-400 hover:shadow-blue-500/40"
        >
          <Plus className="h-4 w-4" />
          New Project
        </button>
      </div>

      {/* Pipeline View */}
      <div className="rounded-xl border border-white/10 bg-[#0f1729] p-6">
        <h2 className="mb-4 text-lg font-semibold text-white">Pipeline</h2>

        {/* Stage labels with counts */}
        <div className="mb-3 grid grid-cols-7 gap-1">
          {STAGES.map((stage) => (
            <div key={stage.key} className="text-center">
              <div
                className={cn(
                  "mb-1 flex items-center justify-center gap-1.5",
                  stage.color
                )}
              >
                {stage.icon}
                <span className="hidden text-xs font-medium lg:inline">
                  {stage.label}
                </span>
              </div>
              <span
                className={cn(
                  "inline-flex h-6 min-w-6 items-center justify-center rounded-full px-2 text-xs font-bold text-white",
                  stage.bgColor
                )}
              >
                {stageCounts[stage.key]}
              </span>
            </div>
          ))}
        </div>

        {/* Visual pipeline bar */}
        <div className="flex h-3 overflow-hidden rounded-full bg-white/5">
          {STAGES.map((stage) => {
            const pct = (stageCounts[stage.key] / totalProjects) * 100;
            if (pct === 0) return null;
            return (
              <div
                key={stage.key}
                className={cn("h-full transition-all duration-500", stage.bgColor)}
                style={{ width: `${pct}%` }}
                title={`${stage.label}: ${stageCounts[stage.key]}`}
              />
            );
          })}
        </div>
      </div>

      {/* Project Cards Grid */}
      {projects.length === 0 ? (
        <div className="rounded-xl border border-white/10 bg-[#0f1729] p-12 text-center">
          <HardHat className="mx-auto mb-3 h-12 w-12 text-gray-600" />
          <p className="text-gray-500">
            No installation projects yet. Create your first project to get
            started.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Project Card                                                       */
/* ------------------------------------------------------------------ */

function ProjectCard({ project }: { project: InstallProject }) {
  const progress =
    ((stageIndex[project.status] + 1) / STAGES.length) * 100;

  const timeline = parseTimeline(project.timeline);

  return (
    <div
      className={cn(
        "rounded-xl border border-white/10 bg-[#0f1729] p-6",
        "border-l-4",
        statusCardBorder[project.status]
      )}
    >
      {/* Header: project # + status */}
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-white">
            {project.projectNumber}
          </h3>
          <p className="text-sm text-gray-400">{project.customerName}</p>
        </div>
        <span
          className={cn(
            "inline-flex shrink-0 items-center rounded-full border px-2.5 py-1 text-xs font-medium",
            statusBadgeStyles[project.status]
          )}
        >
          {project.status.replace(/_/g, " ")}
        </span>
      </div>

      {/* Details grid */}
      <div className="mb-4 space-y-2.5 text-sm">
        <div className="flex items-start gap-2 text-gray-400">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gray-500" />
          <span>{project.propertyAddress}</span>
        </div>
        {project.customerPhone && (
          <div className="flex items-center gap-2 text-gray-400">
            <Phone className="h-4 w-4 shrink-0 text-gray-500" />
            <span>{project.customerPhone}</span>
          </div>
        )}
        <div className="flex items-start gap-2 text-gray-400">
          <Package className="mt-0.5 h-4 w-4 shrink-0 text-gray-500" />
          <span>{project.equipmentOrdered}</span>
        </div>
      </div>

      {/* Equipment & Permit status */}
      <div className="mb-4 flex flex-wrap gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/5 px-3 py-1.5 text-xs text-gray-300">
          <Package className="h-3.5 w-3.5 text-gray-500" />
          Equipment: <span className="font-medium text-white">{project.equipmentStatus}</span>
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/5 px-3 py-1.5 text-xs text-gray-300">
          <FileCheck className="h-3.5 w-3.5 text-gray-500" />
          Permit: <span className="font-medium text-white">{project.permitStatus}</span>
        </span>
        {project.scheduledDate && (
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/5 px-3 py-1.5 text-xs text-gray-300">
            <Calendar className="h-3.5 w-3.5 text-gray-500" />
            Scheduled: <span className="font-medium text-white">{formatDate(project.scheduledDate)}</span>
          </span>
        )}
      </div>

      {/* Cost breakdown */}
      <div className="mb-4 grid grid-cols-3 gap-3 rounded-lg bg-white/[0.03] p-3">
        <div className="text-center">
          <p className="text-xs text-gray-500">Total Cost</p>
          <p className="text-sm font-semibold text-white">
            {formatCurrency(project.totalCost)}
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500">Deposit Paid</p>
          <p className="text-sm font-semibold text-emerald-400">
            {formatCurrency(project.depositPaid)}
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500">Balance Due</p>
          <p className="text-sm font-semibold text-orange-400">
            {formatCurrency(project.balanceDue)}
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-4">
        <div className="mb-1.5 flex items-center justify-between text-xs">
          <span className="text-gray-400">Progress</span>
          <span className="font-medium text-white">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-white/5">
          <div
            className={cn(
              "h-full rounded-full transition-all duration-500",
              project.status === "COMPLETE" ? "bg-emerald-500" : "bg-blue-500"
            )}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Timeline */}
      {timeline.length > 0 && (
        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-gray-500">
            Timeline
          </p>
          <div className="space-y-0">
            {timeline.map((event, i) => (
              <div key={i} className="flex gap-3">
                {/* Vertical line + dot */}
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      "h-2.5 w-2.5 rounded-full shrink-0 mt-1.5",
                      i === 0 ? "bg-blue-500" : "bg-white/20"
                    )}
                  />
                  {i < timeline.length - 1 && (
                    <div className="w-px flex-1 bg-white/10" />
                  )}
                </div>
                {/* Content */}
                <div className="pb-3">
                  <p className="text-sm font-medium text-gray-300">
                    {event.label}
                  </p>
                  <p className="text-xs text-gray-500">{event.date}</p>
                  {event.description && (
                    <p className="mt-0.5 text-xs text-gray-600">
                      {event.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function parseTimeline(raw: JsonValue | null): TimelineEvent[] {
  if (!raw || !Array.isArray(raw)) return [];
  const result: TimelineEvent[] = [];
  for (const entry of raw) {
    if (typeof entry === "object" && entry !== null && !Array.isArray(entry)) {
      const obj = entry as Record<string, JsonValue>;
      result.push({
        date: String(obj.date ?? ""),
        label: String(obj.label ?? ""),
        description: obj.description ? String(obj.description) : undefined,
      });
    }
  }
  return result;
}

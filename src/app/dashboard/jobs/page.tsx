import { prisma } from "@/lib/db";
import {
  Briefcase,
  Plus,
  Search,
  ArrowUpDown,
  Clock,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn, formatCurrency, formatDate } from "@/lib/utils";

export const metadata = {
  title: "Jobs | FD Pierce Company",
};

/* ------------------------------------------------------------------ */
/*  Local types for Prisma query results                               */
/* ------------------------------------------------------------------ */

interface JobRow {
  id: string;
  jobNumber: string;
  title: string;
  jobType: string;
  priority: string;
  status: string;
  scheduledDate: Date | null;
  estimatedCost: number | null;
  actualCost: number | null;
  completedAt: Date | null;
  createdAt: Date;
  customer: { id: string; name: string };
  technician: { id: string; name: string } | null;
  property: { id: string; address: string; city: string; state: string };
}

/* ------------------------------------------------------------------ */
/*  Status / Type / Priority badge configs                             */
/* ------------------------------------------------------------------ */

const STATUS_CONFIG: Record<
  string,
  { label: string; className: string }
> = {
  PENDING: {
    label: "Pending",
    className: "bg-gray-500/15 text-gray-400 border-gray-500/25",
  },
  SCHEDULED: {
    label: "Scheduled",
    className: "bg-blue-500/15 text-blue-400 border-blue-500/25",
  },
  EN_ROUTE: {
    label: "En Route",
    className: "bg-cyan-500/15 text-cyan-400 border-cyan-500/25",
  },
  IN_PROGRESS: {
    label: "In Progress",
    className: "bg-yellow-500/15 text-yellow-400 border-yellow-500/25",
  },
  ON_HOLD: {
    label: "On Hold",
    className: "bg-orange-500/15 text-orange-400 border-orange-500/25",
  },
  COMPLETED: {
    label: "Completed",
    className: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
  },
  CANCELLED: {
    label: "Cancelled",
    className: "bg-red-500/15 text-red-400 border-red-500/25",
  },
  CALLBACK: {
    label: "Callback",
    className: "bg-orange-500/15 text-orange-400 border-orange-500/25",
  },
};

const TYPE_CONFIG: Record<
  string,
  { label: string; variant: "info" | "success" | "danger" | "warning" | "default" }
> = {
  REPAIR: { label: "Repair", variant: "info" },
  MAINTENANCE: { label: "Maintenance", variant: "success" },
  INSTALLATION: { label: "Installation", variant: "default" },
  INSPECTION: { label: "Inspection", variant: "warning" },
  EMERGENCY: { label: "Emergency", variant: "danger" },
  WARRANTY: { label: "Warranty", variant: "info" },
  CALLBACK: { label: "Callback", variant: "warning" },
  ESTIMATE: { label: "Estimate", variant: "default" },
};

const PRIORITY_CONFIG: Record<
  string,
  { label: string; className: string }
> = {
  EMERGENCY: {
    label: "Emergency",
    className: "bg-red-500/20 text-red-300 border-red-500/30",
  },
  URGENT: {
    label: "Urgent",
    className: "bg-red-500/15 text-red-400 border-red-500/25",
  },
  HIGH: {
    label: "High",
    className: "bg-orange-500/15 text-orange-400 border-orange-500/25",
  },
  NORMAL: {
    label: "Normal",
    className: "bg-blue-500/15 text-blue-400 border-blue-500/25",
  },
  LOW: {
    label: "Low",
    className: "bg-gray-500/15 text-gray-400 border-gray-500/25",
  },
};

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default async function JobsPage() {
  const jobs: JobRow[] = await prisma.job.findMany({
    include: {
      customer: { select: { id: true, name: true } },
      technician: { select: { id: true, name: true } },
      property: { select: { id: true, address: true, city: true, state: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 50,
  }) as unknown as JobRow[];

  // Quick stats
  const totalJobs = jobs.length;
  const inProgressCount = jobs.filter(
    (j) => j.status === "IN_PROGRESS" || j.status === "EN_ROUTE"
  ).length;

  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const completedToday = jobs.filter(
    (j) =>
      j.status === "COMPLETED" &&
      j.completedAt &&
      new Date(j.completedAt) >= todayStart
  ).length;
  const callbackCount = jobs.filter((j) => j.status === "CALLBACK").length;

  const STAT_CARDS = [
    {
      label: "Total Jobs",
      value: totalJobs,
      icon: <Briefcase className="h-4 w-4" />,
      iconBg: "bg-blue-500/15",
      iconText: "text-blue-400",
    },
    {
      label: "In Progress",
      value: inProgressCount,
      icon: <Clock className="h-4 w-4" />,
      iconBg: "bg-yellow-500/15",
      iconText: "text-yellow-400",
    },
    {
      label: "Completed Today",
      value: completedToday,
      icon: <CheckCircle2 className="h-4 w-4" />,
      iconBg: "bg-emerald-500/15",
      iconText: "text-emerald-400",
    },
    {
      label: "Callbacks",
      value: callbackCount,
      icon: <RotateCcw className="h-4 w-4" />,
      iconBg: "bg-orange-500/15",
      iconText: "text-orange-400",
    },
  ];

  const TABLE_HEADERS = [
    { label: "Job #", sortable: true },
    { label: "Customer", sortable: true },
    { label: "Property", sortable: false },
    { label: "Type", sortable: true },
    { label: "Priority", sortable: true },
    { label: "Status", sortable: true },
    { label: "Technician", sortable: true },
    { label: "Scheduled", sortable: true },
    { label: "Cost", sortable: true },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Jobs</h1>
          <p className="text-sm text-gray-400 mt-1">
            View and manage all service jobs
          </p>
        </div>
        <a
          href="#"
          className={cn(
            "inline-flex items-center justify-center gap-2 font-medium",
            "rounded-lg transition-all duration-200 h-10 px-4 text-sm",
            "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/25",
            "hover:from-blue-500 hover:to-blue-400 hover:shadow-blue-500/40"
          )}
        >
          <Plus className="h-4 w-4" />
          New Job
        </a>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center rounded-xl bg-[#0f1729] border border-white/10 p-4">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <input
            type="search"
            placeholder="Search jobs by number, customer, address..."
            className="h-9 w-full rounded-lg border border-white/10 bg-white/5 pl-10 pr-4 text-sm text-white placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <select className="h-9 rounded-lg border border-white/10 bg-white/5 px-3 text-sm text-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none">
            <option value="">All Statuses</option>
            {Object.entries(STATUS_CONFIG).map(([value, config]) => (
              <option key={value} value={value}>
                {config.label}
              </option>
            ))}
          </select>
          <select className="h-9 rounded-lg border border-white/10 bg-white/5 px-3 text-sm text-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none">
            <option value="">All Types</option>
            {Object.entries(TYPE_CONFIG).map(([value, config]) => (
              <option key={value} value={value}>
                {config.label}
              </option>
            ))}
          </select>
          <input
            type="date"
            className="h-9 rounded-lg border border-white/10 bg-white/5 px-3 text-sm text-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STAT_CARDS.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4 transition-colors hover:border-white/20 hover:bg-white/[0.07]"
          >
            <div className="flex items-center gap-3 mb-2">
              <span
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-lg shrink-0",
                  stat.iconBg,
                  stat.iconText
                )}
              >
                {stat.icon}
              </span>
              <span className="text-xs font-medium text-gray-400">
                {stat.label}
              </span>
            </div>
            <p className="text-xl font-bold text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Jobs Table */}
      <div className="rounded-xl bg-[#0f1729] border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10">
                {TABLE_HEADERS.map((header) => (
                  <th
                    key={header.label}
                    className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500"
                  >
                    <span className="inline-flex items-center gap-1.5">
                      {header.label}
                      {header.sortable && (
                        <ArrowUpDown className="h-3 w-3 opacity-40" />
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {jobs.length === 0 ? (
                <tr>
                  <td
                    colSpan={TABLE_HEADERS.length}
                    className="px-4 py-12 text-center"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <AlertCircle className="h-8 w-8 text-gray-600" />
                      <p className="text-sm text-gray-500">
                        No jobs found
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                jobs.map((job) => {
                  const statusCfg =
                    STATUS_CONFIG[job.status] ?? STATUS_CONFIG.PENDING;
                  const typeCfg =
                    TYPE_CONFIG[job.jobType] ?? TYPE_CONFIG.REPAIR;
                  const priorityCfg =
                    PRIORITY_CONFIG[job.priority] ??
                    PRIORITY_CONFIG.NORMAL;

                  return (
                    <tr
                      key={job.id}
                      className="transition-colors hover:bg-white/5 cursor-pointer"
                    >
                      {/* Job # */}
                      <td className="px-4 py-3">
                        <a
                          href="#"
                          className="text-sm font-mono font-medium text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          {job.jobNumber}
                        </a>
                      </td>

                      {/* Customer */}
                      <td className="px-4 py-3">
                        <p className="text-sm font-medium text-white truncate max-w-[160px]">
                          {job.customer.name}
                        </p>
                      </td>

                      {/* Property */}
                      <td className="px-4 py-3">
                        <p className="text-sm text-gray-300 truncate max-w-[200px]">
                          {job.property.address}
                        </p>
                        <p className="text-xs text-gray-500">
                          {job.property.city}, {job.property.state}
                        </p>
                      </td>

                      {/* Type */}
                      <td className="px-4 py-3">
                        <Badge variant={typeCfg.variant} size="sm">
                          {typeCfg.label}
                        </Badge>
                      </td>

                      {/* Priority */}
                      <td className="px-4 py-3">
                        <span
                          className={cn(
                            "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
                            priorityCfg.className
                          )}
                        >
                          {priorityCfg.label}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3">
                        <span
                          className={cn(
                            "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
                            statusCfg.className
                          )}
                        >
                          {statusCfg.label}
                        </span>
                      </td>

                      {/* Technician */}
                      <td className="px-4 py-3">
                        {job.technician ? (
                          <p className="text-sm text-gray-300">
                            {job.technician.name}
                          </p>
                        ) : (
                          <p className="text-sm text-gray-600 italic">
                            Unassigned
                          </p>
                        )}
                      </td>

                      {/* Scheduled */}
                      <td className="px-4 py-3">
                        {job.scheduledDate ? (
                          <p className="text-sm text-gray-300">
                            {formatDate(job.scheduledDate)}
                          </p>
                        ) : (
                          <p className="text-sm text-gray-600 italic">
                            TBD
                          </p>
                        )}
                      </td>

                      {/* Cost */}
                      <td className="px-4 py-3">
                        <p className="text-sm font-medium text-white">
                          {job.estimatedCost != null
                            ? formatCurrency(job.estimatedCost)
                            : "\u2014"}
                        </p>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        {jobs.length > 0 && (
          <div className="border-t border-white/10 px-4 py-3 flex items-center justify-between">
            <p className="text-xs text-gray-500">
              Showing {jobs.length} job{jobs.length !== 1 ? "s" : ""}
            </p>
            <div className="flex items-center gap-1">
              <span className="text-xs text-gray-500">Page 1 of 1</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

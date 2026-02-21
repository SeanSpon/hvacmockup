"use client";

import { useState, useMemo } from "react";
import {
  Calendar,
  CloudSun,
  Filter,
  Clock,
  MapPin,
  User,
  Truck,
  AlertTriangle,
  Phone,
  Wrench,
  X,
  ChevronRight,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn, formatCurrency, formatTime } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface TechProfile {
  id: string;
  truckNumber: string | null;
  isAvailable: boolean;
  skills: string[];
}

interface Technician {
  id: string;
  name: string;
  techProfile: TechProfile | null;
}

interface Customer {
  id: string;
  name: string;
  phone: string | null;
}

interface Property {
  id: string;
  address: string;
  city: string;
  state: string;
}

interface Job {
  id: string;
  jobNumber: string;
  title: string;
  description: string;
  jobType: string;
  priority: string;
  status: string;
  scheduledDate: string | null;
  scheduledStart: string | null;
  scheduledEnd: string | null;
  estimatedCost: number | null;
  customer: Customer;
  technician: { id: string; name: string } | null;
  property: Property;
}

interface DispatchBoardProps {
  jobs: Job[];
  technicians: Technician[];
  unassignedJobs: Job[];
  todayDateString: string;
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const HOURS = Array.from({ length: 13 }, (_, i) => i + 7); // 7 AM to 7 PM

const JOB_TYPE_COLORS: Record<string, { bg: string; border: string; text: string }> = {
  REPAIR: { bg: "bg-blue-500/20", border: "border-blue-500/40", text: "text-blue-300" },
  MAINTENANCE: { bg: "bg-emerald-500/20", border: "border-emerald-500/40", text: "text-emerald-300" },
  EMERGENCY: { bg: "bg-red-500/20", border: "border-red-500/40", text: "text-red-300" },
  INSTALLATION: { bg: "bg-purple-500/20", border: "border-purple-500/40", text: "text-purple-300" },
  INSPECTION: { bg: "bg-yellow-500/20", border: "border-yellow-500/40", text: "text-yellow-300" },
  WARRANTY: { bg: "bg-cyan-500/20", border: "border-cyan-500/40", text: "text-cyan-300" },
  CALLBACK: { bg: "bg-orange-500/20", border: "border-orange-500/40", text: "text-orange-300" },
  ESTIMATE: { bg: "bg-gray-500/20", border: "border-gray-500/40", text: "text-gray-300" },
};

const JOB_TYPE_BADGE: Record<string, { variant: "info" | "success" | "danger" | "warning" | "default"; label: string }> = {
  REPAIR: { variant: "info", label: "Repair" },
  MAINTENANCE: { variant: "success", label: "Maintenance" },
  EMERGENCY: { variant: "danger", label: "Emergency" },
  INSTALLATION: { variant: "default", label: "Installation" },
  INSPECTION: { variant: "warning", label: "Inspection" },
  WARRANTY: { variant: "info", label: "Warranty" },
  CALLBACK: { variant: "warning", label: "Callback" },
  ESTIMATE: { variant: "default", label: "Estimate" },
};

const PRIORITY_STYLES: Record<string, { className: string; label: string }> = {
  EMERGENCY: { className: "bg-red-500/20 text-red-300 border-red-500/30 animate-pulse", label: "Emergency" },
  URGENT: { className: "bg-red-500/15 text-red-400 border-red-500/25", label: "Urgent" },
  HIGH: { className: "bg-orange-500/15 text-orange-400 border-orange-500/25", label: "High" },
  NORMAL: { className: "bg-blue-500/15 text-blue-400 border-blue-500/25", label: "Normal" },
  LOW: { className: "bg-gray-500/15 text-gray-400 border-gray-500/25", label: "Low" },
};

const FILTER_OPTIONS = ["All", "Repairs", "Maintenance", "Emergency", "Installs"] as const;
type FilterOption = (typeof FILTER_OPTIONS)[number];

const FILTER_MAP: Record<FilterOption, string | null> = {
  All: null,
  Repairs: "REPAIR",
  Maintenance: "MAINTENANCE",
  Emergency: "EMERGENCY",
  Installs: "INSTALLATION",
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function parseTimeToHour(time: string | null): number | null {
  if (!time) return null;
  const parts = time.split(":");
  if (parts.length < 2) return null;
  return parseInt(parts[0], 10) + parseInt(parts[1], 10) / 60;
}

function getBlockStyle(startTime: string | null, endTime: string | null) {
  const startHour = parseTimeToHour(startTime);
  const endHour = parseTimeToHour(endTime);
  if (startHour === null) return { top: "0%", height: "60px" };
  const topPercent = ((startHour - 7) / 12) * 100;
  const duration = endHour !== null ? endHour - startHour : 1.5;
  const heightPercent = (duration / 12) * 100;
  return {
    top: `${topPercent}%`,
    height: `${Math.max(heightPercent, 100 / 12)}%`,
  };
}

function formatHourLabel(hour: number): string {
  const period = hour >= 12 ? "PM" : "AM";
  const displayHour = hour > 12 ? hour - 12 : hour;
  return `${displayHour} ${period}`;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function DispatchBoard({
  jobs,
  technicians,
  unassignedJobs,
  todayDateString,
}: DispatchBoardProps) {
  const [activeFilter, setActiveFilter] = useState<FilterOption>("All");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  // Filter scheduled jobs by type
  const filteredJobs = useMemo(() => {
    const typeFilter = FILTER_MAP[activeFilter];
    if (!typeFilter) return jobs;
    return jobs.filter((j) => j.jobType === typeFilter);
  }, [jobs, activeFilter]);

  // Group jobs by technician
  const jobsByTech = useMemo(() => {
    const map = new Map<string, Job[]>();
    for (const tech of technicians) {
      map.set(tech.id, []);
    }
    for (const job of filteredJobs) {
      if (job.technician) {
        const list = map.get(job.technician.id) ?? [];
        list.push(job);
        map.set(job.technician.id, list);
      }
    }
    return map;
  }, [filteredJobs, technicians]);

  const activeTechCount = technicians.filter(
    (t) => t.techProfile?.isAvailable
  ).length;

  return (
    <div className="space-y-4">
      {/* Weather Banner */}
      <div className="flex items-center gap-3 rounded-lg bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/20 px-4 py-2.5">
        <CloudSun className="h-5 w-5 text-cyan-400 shrink-0" />
        <span className="text-sm text-gray-200">
          Louisville, KY &mdash; 45&#176;F Partly Cloudy
        </span>
        <span className="ml-auto text-xs text-gray-500">
          Updated 8:00 AM
        </span>
      </div>

      {/* Top Controls */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-lg bg-[#0f1729] border border-white/10 px-3 py-2">
            <Calendar className="h-4 w-4 text-gray-400" />
            <span className="text-sm font-medium text-white">
              {todayDateString}
            </span>
          </div>
          <div className="flex items-center gap-1.5 rounded-lg bg-[#0f1729] border border-white/10 px-3 py-2">
            <Users className="h-4 w-4 text-blue-400" />
            <span className="text-sm text-gray-300">
              <span className="font-semibold text-white">{activeTechCount}</span>
              /{technicians.length} techs active
            </span>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <Filter className="h-4 w-4 text-gray-500 mr-1" />
          {FILTER_OPTIONS.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setActiveFilter(option)}
              className={cn(
                "rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200",
                activeFilter === option
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
                  : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-gray-200"
              )}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content: Schedule + Unassigned Queue */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Left Panel: Schedule Grid (70%) */}
        <div className="flex-1 lg:w-[70%] rounded-xl bg-[#0f1729] border border-white/10 overflow-hidden">
          <div className="border-b border-white/10 px-4 py-3">
            <h2 className="text-sm font-semibold text-white flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-400" />
              Today&apos;s Schedule
            </h2>
          </div>

          <div className="overflow-x-auto">
            <div
              className="min-w-[600px]"
              style={{
                display: "grid",
                gridTemplateColumns: `60px repeat(${technicians.length}, minmax(140px, 1fr))`,
              }}
            >
              {/* Column Headers */}
              <div className="sticky top-0 z-10 bg-[#0f1729] border-b border-white/10 p-2" />
              {technicians.map((tech) => (
                <div
                  key={tech.id}
                  className="sticky top-0 z-10 bg-[#0f1729] border-b border-l border-white/10 px-3 py-2.5 text-center"
                >
                  <div className="text-xs font-semibold text-white truncate">
                    {tech.name}
                  </div>
                  {tech.techProfile?.truckNumber && (
                    <div className="flex items-center justify-center gap-1 mt-0.5">
                      <Truck className="h-3 w-3 text-gray-500" />
                      <span className="text-[10px] text-gray-500">
                        #{tech.techProfile.truckNumber}
                      </span>
                    </div>
                  )}
                  <div
                    className={cn(
                      "mt-1 inline-block h-1.5 w-1.5 rounded-full",
                      tech.techProfile?.isAvailable
                        ? "bg-emerald-400"
                        : "bg-gray-600"
                    )}
                  />
                </div>
              ))}

              {/* Time Grid Body */}
              <div className="relative">
                {HOURS.map((hour) => (
                  <div
                    key={hour}
                    className="h-16 border-b border-white/5 flex items-start justify-end pr-2 pt-0.5"
                  >
                    <span className="text-[10px] text-gray-600 font-mono">
                      {formatHourLabel(hour)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Tech Columns with Jobs */}
              {technicians.map((tech) => {
                const techJobs = jobsByTech.get(tech.id) ?? [];
                return (
                  <div
                    key={tech.id}
                    className="relative border-l border-white/10"
                  >
                    {/* Hour grid lines */}
                    {HOURS.map((hour) => (
                      <div
                        key={hour}
                        className="h-16 border-b border-white/5"
                      />
                    ))}

                    {/* Job Blocks */}
                    <div className="absolute inset-0">
                      {techJobs.map((job) => {
                        const style = getBlockStyle(
                          job.scheduledStart,
                          job.scheduledEnd
                        );
                        const colors =
                          JOB_TYPE_COLORS[job.jobType] ?? JOB_TYPE_COLORS.REPAIR;

                        return (
                          <button
                            key={job.id}
                            type="button"
                            onClick={() => setSelectedJob(job)}
                            className={cn(
                              "absolute left-1 right-1 rounded-lg border px-2 py-1.5",
                              "cursor-pointer transition-all duration-150",
                              "hover:scale-[1.02] hover:shadow-lg hover:z-10",
                              "text-left overflow-hidden",
                              colors.bg,
                              colors.border,
                              selectedJob?.id === job.id &&
                                "ring-2 ring-white/30 scale-[1.02] z-10"
                            )}
                            style={style}
                            title={`${job.title} - ${job.customer.name}`}
                          >
                            <p
                              className={cn(
                                "text-[11px] font-semibold truncate leading-tight",
                                colors.text
                              )}
                            >
                              {job.customer.name}
                            </p>
                            <p className="text-[9px] text-gray-400 truncate mt-0.5">
                              {job.property.address}
                            </p>
                            <p className="text-[9px] text-gray-500 truncate mt-0.5">
                              {JOB_TYPE_BADGE[job.jobType]?.label ?? job.jobType}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Panel: Unassigned Queue (30%) */}
        <div className="lg:w-[30%] rounded-xl bg-[#0f1729] border border-white/10 flex flex-col max-h-[calc(13*64px+52px)]">
          <div className="border-b border-white/10 px-4 py-3 shrink-0 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-orange-400" />
              Unassigned Jobs
            </h2>
            <Badge variant="warning" size="sm">
              {unassignedJobs.length}
            </Badge>
          </div>

          <div className="flex-1 overflow-y-auto p-2 space-y-2">
            {unassignedJobs.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                <Wrench className="h-8 w-8 mb-2 opacity-50" />
                <p className="text-sm">All jobs assigned</p>
              </div>
            ) : (
              unassignedJobs.map((job) => {
                const priorityStyle =
                  PRIORITY_STYLES[job.priority] ?? PRIORITY_STYLES.NORMAL;
                const typeInfo =
                  JOB_TYPE_BADGE[job.jobType] ?? { variant: "default" as const, label: job.jobType };

                return (
                  <button
                    key={job.id}
                    type="button"
                    onClick={() => setSelectedJob(job)}
                    className={cn(
                      "w-full text-left rounded-lg border border-white/10 bg-white/5 p-3",
                      "transition-all duration-150 hover:bg-white/10 hover:border-white/20",
                      "cursor-pointer",
                      selectedJob?.id === job.id &&
                        "ring-2 ring-blue-500/40 border-blue-500/30"
                    )}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <span className="text-xs font-mono text-gray-500">
                        {job.jobNumber}
                      </span>
                      <span
                        className={cn(
                          "inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium",
                          priorityStyle.className
                        )}
                      >
                        {priorityStyle.label}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-white truncate">
                      {job.customer.name}
                    </p>
                    <div className="flex items-center gap-1.5 mt-1">
                      <Badge variant={typeInfo.variant} size="sm">
                        {typeInfo.label}
                      </Badge>
                    </div>
                    {job.scheduledDate && (
                      <div className="flex items-center gap-1 mt-1.5 text-[11px] text-gray-500">
                        <Clock className="h-3 w-3" />
                        Requested: {formatTime(job.scheduledDate)}
                      </div>
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Selected Job Detail Panel */}
      {selectedJob && (
        <div className="rounded-xl bg-[#0f1729] border border-white/10 overflow-hidden">
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <ChevronRight className="h-4 w-4 text-blue-400" />
              Job Details &mdash; {selectedJob.jobNumber}
            </h3>
            <button
              type="button"
              onClick={() => setSelectedJob(null)}
              className="rounded-lg p-1.5 text-gray-400 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
              aria-label="Close details"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-5">
            {/* Customer Info */}
            <div className="space-y-2">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </p>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/15 text-blue-400">
                  <User className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">
                    {selectedJob.customer.name}
                  </p>
                  {selectedJob.customer.phone && (
                    <p className="text-xs text-gray-400 flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      {selectedJob.customer.phone}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </p>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-gray-400 mt-0.5 shrink-0" />
                <p className="text-sm text-gray-300">
                  {selectedJob.property.address}, {selectedJob.property.city},{" "}
                  {selectedJob.property.state}
                </p>
              </div>
            </div>

            {/* Job Info */}
            <div className="space-y-2">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Job Type
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant={
                    JOB_TYPE_BADGE[selectedJob.jobType]?.variant ?? "default"
                  }
                  size="sm"
                  dot
                >
                  {JOB_TYPE_BADGE[selectedJob.jobType]?.label ??
                    selectedJob.jobType}
                </Badge>
                <Badge
                  size="sm"
                  className={
                    PRIORITY_STYLES[selectedJob.priority]?.className ?? ""
                  }
                >
                  {PRIORITY_STYLES[selectedJob.priority]?.label ??
                    selectedJob.priority}
                </Badge>
              </div>
              {selectedJob.estimatedCost != null && (
                <p className="text-sm text-gray-300">
                  Est. {formatCurrency(selectedJob.estimatedCost)}
                </p>
              )}
            </div>

            {/* Schedule */}
            <div className="space-y-2">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Schedule
              </p>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-300">
                  {selectedJob.scheduledStart ?? "TBD"} &mdash;{" "}
                  {selectedJob.scheduledEnd ?? "TBD"}
                </span>
              </div>
              {selectedJob.technician ? (
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-300">
                    {selectedJob.technician.name}
                  </span>
                </div>
              ) : (
                <p className="text-sm text-orange-400">Unassigned</p>
              )}
            </div>
          </div>

          {/* Description */}
          {selectedJob.description && (
            <div className="border-t border-white/10 px-5 py-3">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                Description
              </p>
              <p className="text-sm text-gray-300">{selectedJob.description}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

import { prisma } from "@/lib/db";
import { formatCurrency, getInitials } from "@/lib/utils";
import {
  Users,
  Star,
  Truck,
  CheckCircle,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface TechJob {
  id: string;
  status: string;
  actualCost: number | null;
}

interface TechProfileData {
  id: string;
  skills: string[];
  certifications: string[];
  hireDate: Date;
  truckNumber: string | null;
  isAvailable: boolean;
  avgRating: number;
  jobsCompleted: number;
  revenueGenerated: number;
}

interface TechnicianRow {
  id: string;
  name: string;
  email: string;
  techProfile: TechProfileData | null;
  technicianJobs: TechJob[];
}

/* ------------------------------------------------------------------ */
/*  Avatar color derivation                                            */
/* ------------------------------------------------------------------ */

const AVATAR_COLORS = [
  "bg-blue-600",
  "bg-green-600",
  "bg-purple-600",
  "bg-orange-600",
  "bg-cyan-600",
  "bg-rose-600",
  "bg-indigo-600",
  "bg-teal-600",
  "bg-amber-600",
  "bg-fuchsia-600",
] as const;

function getAvatarColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

/* ------------------------------------------------------------------ */
/*  Status helpers                                                     */
/* ------------------------------------------------------------------ */

type TechStatus = "available" | "on-job" | "off-duty";

function getStatusConfig(status: TechStatus) {
  switch (status) {
    case "available":
      return {
        label: "Available",
        dotClass: "bg-emerald-400",
        textClass: "text-emerald-400",
      };
    case "on-job":
      return {
        label: "On Job",
        dotClass: "bg-blue-400",
        textClass: "text-blue-400",
      };
    case "off-duty":
      return {
        label: "Off Duty",
        dotClass: "bg-gray-500",
        textClass: "text-gray-500",
      };
  }
}

/* ------------------------------------------------------------------ */
/*  Skill badge colors                                                 */
/* ------------------------------------------------------------------ */

const SKILL_COLORS: Record<string, string> = {
  HVAC: "bg-blue-500/15 text-blue-400 border-blue-500/20",
  Refrigeration: "bg-cyan-500/15 text-cyan-400 border-cyan-500/20",
  "Ice Machines": "bg-indigo-500/15 text-indigo-400 border-indigo-500/20",
  Electrical: "bg-amber-500/15 text-amber-400 border-amber-500/20",
  Plumbing: "bg-teal-500/15 text-teal-400 border-teal-500/20",
  "Sheet Metal": "bg-orange-500/15 text-orange-400 border-orange-500/20",
  Controls: "bg-purple-500/15 text-purple-400 border-purple-500/20",
  Ductwork: "bg-green-500/15 text-green-400 border-green-500/20",
};

function getSkillColor(skill: string): string {
  return (
    SKILL_COLORS[skill] ?? "bg-gray-500/15 text-gray-400 border-gray-500/20"
  );
}

/* ------------------------------------------------------------------ */
/*  Star rating component                                              */
/* ------------------------------------------------------------------ */

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`h-3 w-3 ${
            i <= Math.round(rating)
              ? "fill-amber-400 text-amber-400"
              : "fill-gray-700 text-gray-700"
          }`}
        />
      ))}
      <span className="ml-1 text-xs text-gray-400">{rating.toFixed(1)}</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default async function TechniciansPage() {
  const technicians: TechnicianRow[] = await prisma.user.findMany({
    where: { role: "TECHNICIAN" },
    include: {
      techProfile: true,
      technicianJobs: {
        select: {
          id: true,
          status: true,
          actualCost: true,
        },
      },
    },
    orderBy: { name: "asc" },
  });

  /* Derive stats */
  const totalTechs = technicians.length;
  const availableNow = technicians.filter(
    (t: TechnicianRow) => t.techProfile?.isAvailable
  ).length;
  const onJobs = technicians.filter((t: TechnicianRow) =>
    t.technicianJobs.some(
      (j: TechJob) => j.status === "IN_PROGRESS" || j.status === "EN_ROUTE"
    )
  ).length;
  const avgRating =
    technicians.length > 0
      ? technicians.reduce(
          (sum: number, t: TechnicianRow) =>
            sum + (t.techProfile?.avgRating ?? 0),
          0
        ) / technicians.length
      : 0;

  const stats = [
    {
      label: "Total Technicians",
      value: totalTechs,
      icon: Users,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
    },
    {
      label: "Available Now",
      value: availableNow,
      icon: CheckCircle,
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
    },
    {
      label: "On Jobs",
      value: onJobs,
      icon: Truck,
      color: "text-amber-400",
      bgColor: "bg-amber-500/10",
    },
    {
      label: "Avg Rating",
      value: avgRating.toFixed(1),
      icon: Star,
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-white">Technicians</h1>
          <span className="inline-flex items-center rounded-full bg-blue-500/15 px-2.5 py-0.5 text-xs font-medium text-blue-400">
            {totalTechs}
          </span>
        </div>
      </div>

      {/* Top stats row */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="rounded-xl border border-white/10 bg-[#0f1729] p-5"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.bgColor}`}
                >
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.label}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Technician cards grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {technicians.map((tech: TechnicianRow) => {
          const profile = tech.techProfile;
          const jobsCompleted = profile?.jobsCompleted ?? 0;
          const revenue = profile?.revenueGenerated ?? 0;
          const rating = profile?.avgRating ?? 0;
          const isAvailable = profile?.isAvailable ?? false;
          const hireDate = profile?.hireDate;
          const yearsOfService = hireDate
            ? Math.floor(
                (Date.now() - new Date(hireDate).getTime()) /
                  (365.25 * 24 * 60 * 60 * 1000)
              )
            : 0;

          /* Determine status */
          const isOnJob = tech.technicianJobs.some(
            (j: TechJob) =>
              j.status === "IN_PROGRESS" || j.status === "EN_ROUTE"
          );
          const status: TechStatus = isOnJob
            ? "on-job"
            : isAvailable
              ? "available"
              : "off-duty";
          const statusConfig = getStatusConfig(status);

          return (
            <div
              key={tech.id}
              className="group rounded-xl border border-white/10 bg-[#0f1729] p-6 transition-colors hover:border-white/20"
            >
              {/* Top: avatar + name + status */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`relative flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold text-white ${getAvatarColor(tech.name)}`}
                  >
                    {getInitials(tech.name)}
                    {/* Availability dot */}
                    <span
                      className={`absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-[#0f1729] ${statusConfig.dotClass}`}
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-semibold text-white">
                      {tech.name}
                    </h3>
                    <p
                      className={`text-xs font-medium ${statusConfig.textClass}`}
                    >
                      {statusConfig.label}
                    </p>
                  </div>
                </div>

                {/* Truck badge */}
                {profile?.truckNumber && (
                  <span className="flex items-center gap-1 rounded-md bg-white/5 px-2 py-1 text-[10px] font-medium text-gray-400">
                    <Truck className="h-3 w-3" />
                    {profile.truckNumber}
                  </span>
                )}
              </div>

              {/* Skill badges */}
              {profile?.skills && profile.skills.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {profile.skills.map((skill: string) => (
                    <span
                      key={skill}
                      className={`inline-flex rounded-md border px-2 py-0.5 text-[10px] font-medium ${getSkillColor(skill)}`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}

              {/* Stats grid */}
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-white/[0.03] px-3 py-2">
                  <p className="text-lg font-bold text-white">
                    {jobsCompleted}
                  </p>
                  <p className="text-[10px] text-gray-500">Jobs Done</p>
                </div>
                <div className="rounded-lg bg-white/[0.03] px-3 py-2">
                  <p className="text-lg font-bold text-white">
                    {formatCurrency(revenue).replace(".00", "")}
                  </p>
                  <p className="text-[10px] text-gray-500">Revenue</p>
                </div>
                <div className="rounded-lg bg-white/[0.03] px-3 py-2">
                  <StarRating rating={rating} />
                  <p className="mt-0.5 text-[10px] text-gray-500">
                    Avg Rating
                  </p>
                </div>
                <div className="rounded-lg bg-white/[0.03] px-3 py-2">
                  <p className="text-lg font-bold text-white">
                    {yearsOfService}
                  </p>
                  <p className="text-[10px] text-gray-500">Years</p>
                </div>
              </div>

              {/* View Profile link */}
              <Link
                href={`/dashboard/technicians/${tech.id}`}
                className="mt-4 flex items-center justify-center gap-1 rounded-lg bg-white/5 px-3 py-2 text-xs font-medium text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
              >
                View Profile
                <ChevronRight className="h-3 w-3" />
              </Link>
            </div>
          );
        })}
      </div>

      {/* Empty state */}
      {technicians.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-xl border border-white/10 bg-[#0f1729] py-20">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-500/10">
            <Users className="h-8 w-8 text-blue-400" />
          </div>
          <h3 className="mt-4 text-lg font-semibold text-white">
            No technicians found
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Technicians will appear here once added to the system.
          </p>
        </div>
      )}
    </div>
  );
}

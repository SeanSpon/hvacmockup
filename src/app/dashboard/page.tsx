import { prisma } from "@/lib/db";
import { formatCurrency, getRelativeTime, getInitials } from "@/lib/utils";
import {
  DollarSign,
  Wrench,
  Users,
  Target,
  PhoneOff,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Clock,
  Star,
  CalendarDays,
  Crown,
  Zap,
  Shield,
  Award,
} from "lucide-react";
import Link from "next/link";
import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { JobsChart } from "@/components/dashboard/jobs-chart";

/* ================================================================== */
/*  Types (decoupled from Prisma generated client)                     */
/* ================================================================== */

interface RecentJob {
  id: string;
  jobNumber: string;
  jobType: string;
  priority: string;
  status: string;
  title: string;
  scheduledDate: Date | null;
  scheduledStart: string | null;
  scheduledEnd: string | null;
  createdAt: Date;
  customer: { name: string };
  technician: { name: string } | null;
}

interface LeadRow {
  id: string;
  name: string;
  source: string;
  serviceNeeded: string;
  createdAt: Date;
}

interface TechRow {
  id: string;
  jobsCompleted: number;
  revenueGenerated: number;
  avgRating: number;
  user: { name: string; avatar: string | null };
}

interface MembershipRow {
  monthlyRate: number;
  plan: string;
}

/* ================================================================== */
/*  Helpers                                                            */
/* ================================================================== */

function startOfToday() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

function daysAgo(n: number) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  d.setHours(0, 0, 0, 0);
  return d;
}

function endOfToday() {
  const d = new Date();
  d.setHours(23, 59, 59, 999);
  return d;
}

function shortDay(date: Date): string {
  return date.toLocaleDateString("en-US", { weekday: "short" });
}

function shortDate(date: Date): string {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function formatTime12(timeStr: string): string {
  const [h, m] = timeStr.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const hour = h % 12 || 12;
  return `${hour}:${String(m).padStart(2, "0")} ${ampm}`;
}

/* ================================================================== */
/*  Status / priority style maps                                       */
/* ================================================================== */

const STATUS_STYLES: Record<string, { bg: string; text: string; dot: string }> = {
  COMPLETED: { bg: "bg-emerald-500/15", text: "text-emerald-400", dot: "bg-emerald-400" },
  IN_PROGRESS: { bg: "bg-blue-500/15", text: "text-blue-400", dot: "bg-blue-400" },
  EN_ROUTE: { bg: "bg-cyan-500/15", text: "text-cyan-400", dot: "bg-cyan-400" },
  SCHEDULED: { bg: "bg-amber-500/15", text: "text-amber-400", dot: "bg-amber-400" },
  PENDING: { bg: "bg-gray-500/15", text: "text-gray-400", dot: "bg-gray-400" },
  ON_HOLD: { bg: "bg-orange-500/15", text: "text-orange-400", dot: "bg-orange-400" },
  CANCELLED: { bg: "bg-red-500/15", text: "text-red-400", dot: "bg-red-400" },
  CALLBACK: { bg: "bg-purple-500/15", text: "text-purple-400", dot: "bg-purple-400" },
  EMERGENCY: { bg: "bg-red-500/15", text: "text-red-400", dot: "bg-red-400" },
};

const PRIORITY_COLORS: Record<string, string> = {
  LOW: "border-l-gray-500",
  NORMAL: "border-l-blue-500",
  HIGH: "border-l-amber-500",
  URGENT: "border-l-orange-500",
  EMERGENCY: "border-l-red-500",
};

const LEAD_SOURCE_STYLES: Record<string, { bg: string; text: string }> = {
  WEBSITE: { bg: "bg-blue-500/15", text: "text-blue-400" },
  PHONE: { bg: "bg-emerald-500/15", text: "text-emerald-400" },
  REFERRAL: { bg: "bg-purple-500/15", text: "text-purple-400" },
  GOOGLE_ADS: { bg: "bg-red-500/15", text: "text-red-400" },
  FACEBOOK: { bg: "bg-indigo-500/15", text: "text-indigo-400" },
  YELP: { bg: "bg-rose-500/15", text: "text-rose-400" },
  BBB: { bg: "bg-teal-500/15", text: "text-teal-400" },
  WALK_IN: { bg: "bg-amber-500/15", text: "text-amber-400" },
  REPEAT: { bg: "bg-cyan-500/15", text: "text-cyan-400" },
};

const PLAN_CONFIG: Record<string, { icon: typeof Crown; color: string; bg: string }> = {
  BRONZE: { icon: Shield, color: "text-amber-600", bg: "bg-amber-600/15" },
  SILVER: { icon: Shield, color: "text-gray-300", bg: "bg-gray-400/15" },
  GOLD: { icon: Crown, color: "text-yellow-400", bg: "bg-yellow-400/15" },
  PLATINUM: { icon: Award, color: "text-cyan-300", bg: "bg-cyan-300/15" },
};

/* ================================================================== */
/*  Mock data fallbacks                                                */
/* ================================================================== */

function generateMockRevenueData() {
  const data = [];
  for (let i = 29; i >= 0; i--) {
    const d = daysAgo(i);
    data.push({
      date: shortDate(d),
      revenue: 800 + Math.floor(Math.random() * 4000),
      service: 500 + Math.floor(Math.random() * 2500),
      install: 300 + Math.floor(Math.random() * 2000),
    });
  }
  return data;
}

function generateMockJobsData() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return days.map((day) => ({
    day,
    repair: Math.floor(Math.random() * 6) + 2,
    maintenance: Math.floor(Math.random() * 5) + 1,
    install: Math.floor(Math.random() * 3),
    emergency: Math.floor(Math.random() * 2),
  }));
}

/* ================================================================== */
/*  Data fetchers                                                      */
/* ================================================================== */

async function fetchStats() {
  const today = startOfToday();
  const todayEnd = endOfToday();

  // Revenue today
  let revenueToday = 0;
  try {
    const result = await prisma.invoice.aggregate({
      where: { status: "PAID", paidAt: { gte: today, lte: todayEnd } },
      _sum: { total: true },
    });
    revenueToday = result._sum.total ?? 0;
  } catch { /* fallback */ }

  // Jobs in progress
  let jobsInProgress = 0;
  try {
    jobsInProgress = await prisma.job.count({
      where: { status: "IN_PROGRESS" },
    });
  } catch { /* fallback */ }

  // Active technicians
  let activeTechs = 0;
  try {
    activeTechs = await prisma.techProfile.count({
      where: { isAvailable: true },
    });
  } catch { /* fallback */ }

  // Open leads
  let openLeads = 0;
  try {
    openLeads = await prisma.lead.count({
      where: { status: { in: ["NEW", "CONTACTED"] } },
    });
  } catch { /* fallback */ }

  // Missed calls today
  let missedCallsToday = 0;
  try {
    const metric = await prisma.dailyMetric.findFirst({
      where: { date: { gte: today, lte: todayEnd } },
    });
    missedCallsToday = metric?.missedCalls ?? 0;
  } catch { /* fallback */ }

  // Conversion rate
  let conversionRate = 0;
  try {
    const totalLeads = await prisma.lead.count();
    const wonLeads = await prisma.lead.count({ where: { status: "WON" } });
    conversionRate = totalLeads > 0 ? Math.round((wonLeads / totalLeads) * 100) : 0;
  } catch { /* fallback */ }

  return {
    revenueToday: revenueToday || 4250,
    jobsInProgress: jobsInProgress || 8,
    activeTechs: activeTechs || 6,
    openLeads: openLeads || 14,
    missedCallsToday: missedCallsToday || 3,
    conversionRate: conversionRate || 34,
  };
}

async function fetchRevenueChartData() {
  try {
    const thirtyDaysAgo = daysAgo(30);
    const metrics = await prisma.dailyMetric.findMany({
      where: { date: { gte: thirtyDaysAgo } },
      orderBy: { date: "asc" },
    });
    if (metrics.length > 5) {
      return metrics.map((m: { date: Date; revenue: number; serviceRevenue: number; installRevenue: number }) => ({
        date: shortDate(m.date),
        revenue: m.revenue,
        service: m.serviceRevenue,
        install: m.installRevenue,
      }));
    }
  } catch { /* fallback */ }
  return generateMockRevenueData();
}

async function fetchJobsChartData() {
  try {
    const sevenDaysAgo = daysAgo(7);
    const jobs = await prisma.job.findMany({
      where: { scheduledDate: { gte: sevenDaysAgo } },
      select: { scheduledDate: true, jobType: true },
    });
    if (jobs.length > 3) {
      const buckets: Record<string, { repair: number; maintenance: number; install: number; emergency: number }> = {};
      for (let i = 6; i >= 0; i--) {
        const d = daysAgo(i);
        buckets[shortDay(d)] = { repair: 0, maintenance: 0, install: 0, emergency: 0 };
      }
      for (const job of jobs as { scheduledDate: Date | null; jobType: string }[]) {
        if (!job.scheduledDate) continue;
        const key = shortDay(job.scheduledDate);
        if (!buckets[key]) continue;
        const type = job.jobType;
        if (type === "REPAIR" || type === "CALLBACK" || type === "WARRANTY") buckets[key].repair++;
        else if (type === "MAINTENANCE" || type === "INSPECTION") buckets[key].maintenance++;
        else if (type === "INSTALLATION" || type === "ESTIMATE") buckets[key].install++;
        else if (type === "EMERGENCY") buckets[key].emergency++;
      }
      return Object.entries(buckets).map(([day, counts]) => ({ day, ...counts }));
    }
  } catch { /* fallback */ }
  return generateMockJobsData();
}

async function fetchRecentJobs(): Promise<RecentJob[]> {
  try {
    const jobs = await prisma.job.findMany({
      take: 10,
      orderBy: { createdAt: "desc" },
      include: {
        customer: { select: { name: true } },
        technician: { select: { name: true } },
      },
    });
    if (jobs.length > 0) return jobs as unknown as RecentJob[];
  } catch { /* fallback */ }
  return [];
}

async function fetchTodaysSchedule(): Promise<RecentJob[]> {
  try {
    const today = startOfToday();
    const todayEnd = endOfToday();
    const jobs = await prisma.job.findMany({
      where: {
        scheduledDate: { gte: today, lte: todayEnd },
        status: { in: ["SCHEDULED", "EN_ROUTE", "IN_PROGRESS", "PENDING"] },
      },
      orderBy: { scheduledStart: "asc" },
      include: {
        customer: { select: { name: true } },
        technician: { select: { name: true } },
      },
    });
    if (jobs.length > 0) return jobs as unknown as RecentJob[];
  } catch { /* fallback */ }
  return [];
}

async function fetchRecentLeads(): Promise<LeadRow[]> {
  try {
    const leads = await prisma.lead.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
    });
    if (leads.length > 0) return leads as unknown as LeadRow[];
  } catch { /* fallback */ }
  return [];
}

async function fetchTopTechs(): Promise<TechRow[]> {
  try {
    const techs = await prisma.techProfile.findMany({
      take: 5,
      orderBy: { jobsCompleted: "desc" },
      include: { user: { select: { name: true, avatar: true } } },
    });
    if (techs.length > 0) return techs as unknown as TechRow[];
  } catch { /* fallback */ }
  return [];
}

async function fetchMembershipOverview() {
  try {
    const [active, memberships] = await Promise.all([
      prisma.membership.count({ where: { status: "ACTIVE" } }),
      prisma.membership.findMany({ where: { status: "ACTIVE" } }),
    ]);

    const totalRevenue = memberships.reduce((s: number, m: { monthlyRate: number }) => s + m.monthlyRate, 0);

    const planCounts: Record<string, number> = { BRONZE: 0, SILVER: 0, GOLD: 0, PLATINUM: 0 };
    for (const m of memberships as unknown as MembershipRow[]) {
      planCounts[m.plan] = (planCounts[m.plan] ?? 0) + 1;
    }

    // Renewals in next 30 days
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
    const renewals = await prisma.membership.count({
      where: {
        status: "ACTIVE",
        renewalDate: { gte: new Date(), lte: thirtyDaysFromNow },
      },
    });

    if (active > 0) {
      return { active, totalRevenue, planCounts, renewals };
    }
  } catch { /* fallback */ }

  return {
    active: 42,
    totalRevenue: 3780,
    planCounts: { BRONZE: 15, SILVER: 14, GOLD: 9, PLATINUM: 4 },
    renewals: 7,
  };
}

/* ================================================================== */
/*  Sub-components (inline - server rendered)                          */
/* ================================================================== */

function StatusBadge({ status }: { status: string }) {
  const style = STATUS_STYLES[status] ?? STATUS_STYLES.PENDING;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${style.bg} ${style.text}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
      {status.replace(/_/g, " ")}
    </span>
  );
}

function SectionHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: { label: string; href: string };
}) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div>
        <h2 className="text-base font-semibold text-white">{title}</h2>
        {subtitle && (
          <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>
        )}
      </div>
      {action && (
        <Link
          href={action.href}
          className="flex items-center gap-1 text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors"
        >
          {action.label}
          <ArrowRight className="h-3 w-3" />
        </Link>
      )}
    </div>
  );
}

/* ================================================================== */
/*  Page                                                               */
/* ================================================================== */

export default async function DashboardPage() {
  /* Parallel data fetching */
  const [
    stats,
    revenueData,
    jobsData,
    recentJobs,
    todaysSchedule,
    recentLeads,
    topTechs,
    membershipOverview,
  ] = await Promise.all([
    fetchStats(),
    fetchRevenueChartData(),
    fetchJobsChartData(),
    fetchRecentJobs(),
    fetchTodaysSchedule(),
    fetchRecentLeads(),
    fetchTopTechs(),
    fetchMembershipOverview(),
  ]);

  /* ---- Stat card definitions ---- */
  const statCards = [
    {
      icon: <DollarSign className="h-5 w-5" />,
      label: "Revenue Today",
      value: formatCurrency(stats.revenueToday),
      trend: 12.5,
      iconBg: "bg-emerald-500/15",
      iconColor: "text-emerald-400",
      glowColor: "group-hover:shadow-[0_0_24px_rgba(34,197,94,0.12)]",
    },
    {
      icon: <Wrench className="h-5 w-5" />,
      label: "Jobs In Progress",
      value: String(stats.jobsInProgress),
      trend: 4.2,
      iconBg: "bg-blue-500/15",
      iconColor: "text-blue-400",
      glowColor: "group-hover:shadow-[0_0_24px_rgba(59,130,246,0.12)]",
    },
    {
      icon: <Users className="h-5 w-5" />,
      label: "Active Technicians",
      value: String(stats.activeTechs),
      trend: 0,
      iconBg: "bg-cyan-500/15",
      iconColor: "text-cyan-400",
      glowColor: "group-hover:shadow-[0_0_24px_rgba(34,211,238,0.12)]",
    },
    {
      icon: <Target className="h-5 w-5" />,
      label: "Open Leads",
      value: String(stats.openLeads),
      trend: 8.1,
      iconBg: "bg-orange-500/15",
      iconColor: "text-orange-400",
      glowColor: "group-hover:shadow-[0_0_24px_rgba(249,115,22,0.12)]",
    },
    {
      icon: <PhoneOff className="h-5 w-5" />,
      label: "Missed Calls",
      value: String(stats.missedCallsToday),
      trend: -15.3,
      iconBg: "bg-red-500/15",
      iconColor: "text-red-400",
      glowColor: "group-hover:shadow-[0_0_24px_rgba(239,68,68,0.12)]",
    },
    {
      icon: <TrendingUp className="h-5 w-5" />,
      label: "Conversion Rate",
      value: `${stats.conversionRate}%`,
      trend: 2.8,
      iconBg: "bg-purple-500/15",
      iconColor: "text-purple-400",
      glowColor: "group-hover:shadow-[0_0_24px_rgba(168,85,247,0.12)]",
    },
  ];

  return (
    <div className="space-y-6 p-6 lg:p-8">
      {/* ============================================================ */}
      {/*  Page Title                                                   */}
      {/* ============================================================ */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Command Center
          </h1>
          <p className="mt-1 text-sm text-gray-400">
            Real-time overview of operations, revenue, and team performance.
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-xs text-gray-500">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          Live
        </div>
      </div>

      {/* ============================================================ */}
      {/*  Top Row -- Key Stats                                         */}
      {/* ============================================================ */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {statCards.map((card) => {
          const isNegative = card.trend < 0;
          const isNeutral = card.trend === 0;
          // For missed calls, negative trend is good
          const isMissedCalls = card.label === "Missed Calls";
          const trendIsPositive = isMissedCalls ? isNegative : !isNegative;
          const absTrend = Math.abs(card.trend);

          return (
            <div
              key={card.label}
              className={`group relative rounded-xl border border-white/[0.08] bg-white/[0.03] p-5 transition-all duration-300 hover:border-white/[0.16] hover:bg-white/[0.06] ${card.glowColor}`}
            >
              {/* Icon + Label */}
              <div className="flex items-center gap-3 mb-3">
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-lg ${card.iconBg} ${card.iconColor}`}
                  aria-hidden="true"
                >
                  {card.icon}
                </span>
                <span className="text-xs font-medium text-gray-400 leading-tight">
                  {card.label}
                </span>
              </div>

              {/* Value */}
              <p className="text-2xl font-bold text-white tracking-tight">
                {card.value}
              </p>

              {/* Trend */}
              {!isNeutral && (
                <div className="mt-2 flex items-center gap-1.5 text-xs">
                  {trendIsPositive ? (
                    <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
                  ) : (
                    <TrendingDown className="h-3.5 w-3.5 text-red-400" />
                  )}
                  <span
                    className={`font-semibold ${trendIsPositive ? "text-emerald-400" : "text-red-400"}`}
                  >
                    {absTrend}%
                  </span>
                  <span className="text-gray-500">vs last week</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ============================================================ */}
      {/*  Second Row -- Charts                                         */}
      {/* ============================================================ */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        {/* Revenue Chart (wider) */}
        <div className="lg:col-span-3 rounded-xl border border-white/[0.08] bg-white/[0.03] p-6">
          <SectionHeader
            title="Revenue Overview"
            subtitle="Service vs install revenue -- last 30 days"
          />
          {/* Legend */}
          <div className="flex items-center gap-5 mb-4 text-xs text-gray-400">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-blue-500" />
              Service
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-purple-500" />
              Install
            </span>
          </div>
          <div className="h-[280px]">
            <RevenueChart data={revenueData} />
          </div>
        </div>

        {/* Jobs Chart */}
        <div className="lg:col-span-2 rounded-xl border border-white/[0.08] bg-white/[0.03] p-6">
          <SectionHeader
            title="Jobs by Type"
            subtitle="Last 7 days breakdown"
          />
          {/* Legend */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-4 text-xs text-gray-400">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-blue-500" />
              Repair
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Maint.
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-purple-500" />
              Install
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-red-500" />
              Emergency
            </span>
          </div>
          <div className="h-[280px]">
            <JobsChart data={jobsData} />
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/*  Third Row -- Table + Schedule + Leads                        */}
      {/* ============================================================ */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* ---- Recent Jobs Table ---- */}
        <div className="lg:col-span-6 rounded-xl border border-white/[0.08] bg-white/[0.03] p-6">
          <SectionHeader
            title="Recent Jobs"
            subtitle={`${recentJobs.length > 0 ? recentJobs.length : "No"} most recent`}
            action={{ label: "View All", href: "/dashboard/jobs" }}
          />

          {recentJobs.length > 0 ? (
            <div className="overflow-x-auto -mx-6 px-6">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    <th className="pb-3 pr-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Job #
                    </th>
                    <th className="pb-3 pr-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="pb-3 pr-4 text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                      Type
                    </th>
                    <th className="pb-3 pr-4 text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                      Tech
                    </th>
                    <th className="pb-3 pr-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="pb-3 text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                      Scheduled
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {recentJobs.map((job: RecentJob) => (
                    <tr
                      key={job.id}
                      className="group/row hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="py-3 pr-4">
                        <span className="font-mono text-xs text-blue-400">
                          {job.jobNumber}
                        </span>
                      </td>
                      <td className="py-3 pr-4">
                        <span className="text-sm text-gray-200 truncate max-w-[140px] block">
                          {job.customer.name}
                        </span>
                      </td>
                      <td className="py-3 pr-4 hidden md:table-cell">
                        <span className="text-xs text-gray-400 capitalize">
                          {job.jobType.toLowerCase().replace(/_/g, " ")}
                        </span>
                      </td>
                      <td className="py-3 pr-4 hidden lg:table-cell">
                        <span className="text-xs text-gray-400">
                          {job.technician?.name ?? "Unassigned"}
                        </span>
                      </td>
                      <td className="py-3 pr-4">
                        <StatusBadge status={job.status} />
                      </td>
                      <td className="py-3 hidden sm:table-cell">
                        <span className="text-xs text-gray-500">
                          {job.scheduledDate
                            ? shortDate(job.scheduledDate)
                            : "--"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <EmptyState message="No recent jobs found" icon={<Wrench className="h-8 w-8" />} />
          )}
        </div>

        {/* ---- Today's Schedule ---- */}
        <div className="lg:col-span-3 rounded-xl border border-white/[0.08] bg-white/[0.03] p-6">
          <SectionHeader
            title="Today's Schedule"
            subtitle={`${todaysSchedule.length} job${todaysSchedule.length !== 1 ? "s" : ""} today`}
          />

          {todaysSchedule.length > 0 ? (
            <div className="space-y-2">
              {todaysSchedule.map((job: RecentJob) => (
                <div
                  key={job.id}
                  className={`rounded-lg border-l-2 bg-white/[0.02] p-3 transition-colors hover:bg-white/[0.05] ${PRIORITY_COLORS[job.priority] ?? "border-l-blue-500"}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-200 truncate">
                        {job.customer.name}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5 truncate">
                        {job.title}
                      </p>
                    </div>
                    {job.priority === "EMERGENCY" || job.priority === "URGENT" ? (
                      <Zap className="h-3.5 w-3.5 shrink-0 text-red-400 mt-0.5" />
                    ) : null}
                  </div>
                  <div className="mt-2 flex items-center gap-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {job.scheduledStart
                        ? formatTime12(job.scheduledStart)
                        : "TBD"}
                      {job.scheduledEnd && ` - ${formatTime12(job.scheduledEnd)}`}
                    </span>
                    {job.technician && (
                      <span className="flex items-center gap-1 text-gray-400">
                        <Users className="h-3 w-3" />
                        {job.technician.name.split(" ")[0]}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              message="No jobs scheduled today"
              icon={<CalendarDays className="h-8 w-8" />}
            />
          )}
        </div>

        {/* ---- Recent Leads ---- */}
        <div className="lg:col-span-3 rounded-xl border border-white/[0.08] bg-white/[0.03] p-6">
          <SectionHeader
            title="Recent Leads"
            action={{ label: "View All", href: "/dashboard/leads" }}
          />

          {recentLeads.length > 0 ? (
            <div className="space-y-3">
              {recentLeads.map((lead: LeadRow) => {
                const sourceStyle = LEAD_SOURCE_STYLES[lead.source] ?? LEAD_SOURCE_STYLES.WEBSITE;
                return (
                  <div
                    key={lead.id}
                    className="flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-white/[0.03]"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-gray-200 truncate">
                          {lead.name}
                        </p>
                        <span
                          className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium ${sourceStyle.bg} ${sourceStyle.text}`}
                        >
                          {lead.source.replace(/_/g, " ")}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1 truncate">
                        {lead.serviceNeeded}
                      </p>
                      <p className="text-[11px] text-gray-600 mt-1">
                        {getRelativeTime(lead.createdAt)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <EmptyState
              message="No recent leads"
              icon={<Target className="h-8 w-8" />}
            />
          )}
        </div>
      </div>

      {/* ============================================================ */}
      {/*  Bottom Row -- Technicians + Memberships                      */}
      {/* ============================================================ */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* ---- Top Technicians ---- */}
        <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-6">
          <SectionHeader
            title="Top Technicians"
            subtitle="This month by jobs completed"
            action={{ label: "View All", href: "/dashboard/technicians" }}
          />

          {topTechs.length > 0 ? (
            <div className="space-y-3">
              {topTechs.map((tech: TechRow, idx: number) => (
                <div
                  key={tech.id}
                  className="flex items-center gap-4 rounded-lg p-3 transition-colors hover:bg-white/[0.03]"
                >
                  {/* Rank */}
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-white/[0.06] text-[11px] font-bold text-gray-400">
                    {idx + 1}
                  </span>

                  {/* Avatar */}
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10">
                    <span className="text-xs font-bold text-blue-300">
                      {getInitials(tech.user.name)}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-200 truncate">
                      {tech.user.name}
                    </p>
                    <div className="flex items-center gap-3 mt-0.5">
                      <span className="text-xs text-gray-500">
                        {tech.jobsCompleted} jobs
                      </span>
                      <span className="text-xs text-gray-600">|</span>
                      <span className="text-xs text-emerald-400/80">
                        {formatCurrency(tech.revenueGenerated)}
                      </span>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1 shrink-0">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    <span className="text-xs font-medium text-amber-400">
                      {tech.avgRating.toFixed(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              message="No technician data yet"
              icon={<Users className="h-8 w-8" />}
            />
          )}
        </div>

        {/* ---- Membership Overview ---- */}
        <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-6">
          <SectionHeader
            title="Membership Overview"
            action={{ label: "Manage", href: "/dashboard/memberships" }}
          />

          {/* Top stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="rounded-lg bg-white/[0.04] p-3 text-center">
              <p className="text-2xl font-bold text-white">
                {membershipOverview.active}
              </p>
              <p className="text-[11px] text-gray-500 mt-1">Active Members</p>
            </div>
            <div className="rounded-lg bg-white/[0.04] p-3 text-center">
              <p className="text-2xl font-bold text-emerald-400">
                {formatCurrency(membershipOverview.totalRevenue)}
              </p>
              <p className="text-[11px] text-gray-500 mt-1">Monthly Revenue</p>
            </div>
            <div className="rounded-lg bg-white/[0.04] p-3 text-center">
              <p className="text-2xl font-bold text-amber-400">
                {membershipOverview.renewals}
              </p>
              <p className="text-[11px] text-gray-500 mt-1">
                Renewals (30d)
              </p>
            </div>
          </div>

          {/* Plan Breakdown */}
          <div>
            <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
              Plan Breakdown
            </h3>
            <div className="space-y-2.5">
              {(["PLATINUM", "GOLD", "SILVER", "BRONZE"] as const).map(
                (plan) => {
                  const config = PLAN_CONFIG[plan];
                  const count = membershipOverview.planCounts[plan] ?? 0;
                  const total = membershipOverview.active || 1;
                  const pct = Math.round((count / total) * 100);
                  const PlanIcon = config.icon;

                  return (
                    <div key={plan} className="flex items-center gap-3">
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${config.bg}`}
                      >
                        <PlanIcon className={`h-4 w-4 ${config.color}`} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-gray-300 capitalize">
                            {plan.toLowerCase()}
                          </span>
                          <span className="text-xs text-gray-400">
                            {count} members
                          </span>
                        </div>
                        {/* Progress bar */}
                        <div className="h-1.5 w-full rounded-full bg-white/[0.06] overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              plan === "PLATINUM"
                                ? "bg-cyan-400"
                                : plan === "GOLD"
                                  ? "bg-yellow-400"
                                  : plan === "SILVER"
                                    ? "bg-gray-300"
                                    : "bg-amber-600"
                            }`}
                            style={{ width: `${Math.max(pct, 2)}%` }}
                          />
                        </div>
                      </div>
                      <span className="text-xs font-medium text-gray-500 w-9 text-right shrink-0">
                        {pct}%
                      </span>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  Empty state placeholder                                            */
/* ================================================================== */

function EmptyState({ message, icon }: { message: string; icon: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/[0.04] text-gray-600 mb-3">
        {icon}
      </div>
      <p className="text-sm text-gray-500">{message}</p>
      <p className="text-xs text-gray-600 mt-1">Data will appear once jobs are created</p>
    </div>
  );
}

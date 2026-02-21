import { prisma } from "@/lib/db";
import { formatCurrency } from "@/lib/utils";
import {
  DollarSign,
  TrendingUp,
  Briefcase,
  Receipt,
  Target,
  Users,
  CalendarDays,
  MapPin,
  Wrench,
} from "lucide-react";
import { subDays, format } from "date-fns";
import {
  RevenueOverTimeChart,
  JobsByTypeChart,
  LeadSourceChart,
  TechPerformanceChart,
  ConversionFunnelChart,
} from "@/components/dashboard/analytics-charts";
import type {
  RevenueTimePoint,
  JobTypePoint,
  LeadSourcePoint,
  TechPerfPoint,
  FunnelData,
} from "@/components/dashboard/analytics-charts";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface DailyMetricRow {
  id: string;
  date: Date;
  revenue: number;
  jobsCompleted: number;
  jobsScheduled: number;
  leadsReceived: number;
  leadsConverted: number;
  missedCalls: number;
  avgTicket: number;
  techUtilization: number;
  membershipSales: number;
  installRevenue: number;
  serviceRevenue: number;
}

interface TechProfileRow {
  jobsCompleted: number;
  revenueGenerated: number;
  avgRating: number;
}

interface TechRow {
  id: string;
  name: string;
  techProfile: TechProfileRow | null;
}

interface ZipCodeGroup {
  zip: string;
  _count: { id: number };
}

interface TopServiceGroup {
  title: string;
  _count: { id: number };
  _sum: { actualCost: number | null };
}

interface JobTypeGroup {
  jobType: string;
  _count: { id: number };
}

interface LeadSourceGroup {
  source: string;
  _count: { id: number };
  _sum: { estimatedValue: number | null };
}

/* ------------------------------------------------------------------ */
/*  Data fetching                                                      */
/* ------------------------------------------------------------------ */

async function getAnalyticsData() {
  const now = new Date();
  const thirtyDaysAgo = subDays(now, 30);

  /* --- Daily metrics for the last 30 days --- */
  const dailyMetrics: DailyMetricRow[] = await prisma.dailyMetric.findMany({
    where: { date: { gte: thirtyDaysAgo } },
    orderBy: { date: "asc" },
  });

  /* --- Revenue over time --- */
  const revenueData: RevenueTimePoint[] = dailyMetrics.map(
    (m: DailyMetricRow) => ({
      date: format(m.date, "MMM d"),
      revenue: m.revenue,
      service: m.serviceRevenue,
      install: m.installRevenue,
    })
  );

  /* --- Aggregate KPIs from daily metrics --- */
  const totalRevenue30d = dailyMetrics.reduce(
    (s: number, m: DailyMetricRow) => s + m.revenue,
    0
  );
  const totalJobs30d = dailyMetrics.reduce(
    (s: number, m: DailyMetricRow) => s + m.jobsCompleted,
    0
  );
  const avgDailyRevenue =
    dailyMetrics.length > 0 ? totalRevenue30d / dailyMetrics.length : 0;
  const avgTicketSize =
    totalJobs30d > 0 ? totalRevenue30d / totalJobs30d : 0;
  const totalLeadsReceived = dailyMetrics.reduce(
    (s: number, m: DailyMetricRow) => s + m.leadsReceived,
    0
  );
  const totalLeadsConverted = dailyMetrics.reduce(
    (s: number, m: DailyMetricRow) => s + m.leadsConverted,
    0
  );
  const leadConversionRate =
    totalLeadsReceived > 0
      ? (totalLeadsConverted / totalLeadsReceived) * 100
      : 0;

  /* --- Customer retention --- */
  const totalCustomers: number = await prisma.user.count({
    where: { role: "CUSTOMER" },
  });
  const repeatCustomers: number = await prisma.user.count({
    where: {
      role: "CUSTOMER",
      invoices: { some: { status: "PAID" } },
    },
  });
  const customerRetention =
    totalCustomers > 0 ? (repeatCustomers / totalCustomers) * 100 : 0;

  /* --- Jobs by type --- */
  const jobsByTypeRaw = await (prisma.job.groupBy as any)({
    by: ["jobType"],
    _count: { id: true },
    where: { createdAt: { gte: thirtyDaysAgo } },
  }) as JobTypeGroup[];
  const jobsByType: JobTypePoint[] = jobsByTypeRaw.map(
    (j: JobTypeGroup) => ({
      type: formatJobType(j.jobType),
      count: j._count.id,
    })
  );

  /* --- Leads by source --- */
  const leadsBySourceRaw = await (prisma.lead.groupBy as any)({
    by: ["source"],
    _count: { id: true },
    _sum: { estimatedValue: true },
    where: { createdAt: { gte: thirtyDaysAgo } },
    orderBy: { _count: { id: "desc" } },
  }) as LeadSourceGroup[];
  const leadsBySource: LeadSourcePoint[] = leadsBySourceRaw.map(
    (l: LeadSourceGroup) => ({
      source: formatLeadSource(l.source),
      count: l._count.id,
      value: l._sum.estimatedValue ?? 0,
    })
  );

  /* --- Tech performance --- */
  const techsRaw: TechRow[] = await prisma.user.findMany({
    where: { role: "TECHNICIAN" },
    include: { techProfile: true },
    orderBy: { name: "asc" },
  });
  const techPerformance: TechPerfPoint[] = techsRaw
    .filter((t: TechRow) => t.techProfile !== null)
    .map((t: TechRow) => ({
      name: t.name.split(" ")[0],
      jobs: t.techProfile!.jobsCompleted,
      revenue: t.techProfile!.revenueGenerated,
      rating: t.techProfile!.avgRating,
    }))
    .sort((a: TechPerfPoint, b: TechPerfPoint) => b.revenue - a.revenue)
    .slice(0, 10);

  /* --- Conversion funnel --- */
  const totalCalls =
    totalLeadsReceived > 0 ? Math.round(totalLeadsReceived * 1.4) : 0;
  const estimatesSent: number = await prisma.job.count({
    where: { jobType: "ESTIMATE", createdAt: { gte: thirtyDaysAgo } },
  });
  const jobsBooked: number = await prisma.job.count({
    where: {
      status: { in: ["SCHEDULED", "IN_PROGRESS", "COMPLETED"] },
      createdAt: { gte: thirtyDaysAgo },
    },
  });
  const installsClosed: number = await prisma.job.count({
    where: {
      jobType: "INSTALLATION",
      status: "COMPLETED",
      createdAt: { gte: thirtyDaysAgo },
    },
  });
  const funnelData: FunnelData = {
    calls: totalCalls,
    leads: totalLeadsReceived,
    estimates: estimatesSent,
    jobs: jobsBooked,
    installs: installsClosed,
  };

  /* --- Busiest zip codes --- */
  const zipCodes = await (prisma.property.groupBy as any)({
    by: ["zip"],
    _count: { id: true },
    orderBy: { _count: { id: "desc" } },
    take: 8,
  }) as ZipCodeGroup[];

  /* --- Top services --- */
  const topServices = await (prisma.job.groupBy as any)({
    by: ["title"],
    _count: { id: true },
    _sum: { actualCost: true },
    where: { createdAt: { gte: thirtyDaysAgo } },
    orderBy: { _count: { id: "desc" } },
    take: 8,
  }) as TopServiceGroup[];

  return {
    revenueData,
    totalRevenue30d,
    avgDailyRevenue,
    totalJobs30d,
    avgTicketSize,
    leadConversionRate,
    customerRetention,
    jobsByType,
    leadsBySource,
    techPerformance,
    funnelData,
    zipCodes,
    topServices,
  };
}

/* ------------------------------------------------------------------ */
/*  Formatting helpers                                                 */
/* ------------------------------------------------------------------ */

function formatJobType(type: string): string {
  const map: Record<string, string> = {
    REPAIR: "Repair",
    MAINTENANCE: "Maintenance",
    INSTALLATION: "Installation",
    INSPECTION: "Inspection",
    EMERGENCY: "Emergency",
    WARRANTY: "Warranty",
    CALLBACK: "Callback",
    ESTIMATE: "Estimate",
  };
  return map[type] ?? type;
}

function formatLeadSource(source: string): string {
  const map: Record<string, string> = {
    WEBSITE: "Website",
    PHONE: "Phone",
    REFERRAL: "Referral",
    GOOGLE_ADS: "Google Ads",
    FACEBOOK: "Facebook",
    YELP: "Yelp",
    BBB: "BBB",
    WALK_IN: "Walk-in",
    REPEAT: "Repeat",
  };
  return map[source] ?? source;
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default async function AnalyticsPage() {
  const data = await getAnalyticsData();

  const kpis = [
    {
      label: "Total Revenue (30d)",
      value: formatCurrency(data.totalRevenue30d),
      icon: DollarSign,
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
    },
    {
      label: "Avg Daily Revenue",
      value: formatCurrency(data.avgDailyRevenue),
      icon: TrendingUp,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
    },
    {
      label: "Total Jobs",
      value: data.totalJobs30d.toLocaleString(),
      icon: Briefcase,
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
    },
    {
      label: "Avg Ticket Size",
      value: formatCurrency(data.avgTicketSize),
      icon: Receipt,
      color: "text-amber-400",
      bgColor: "bg-amber-500/10",
    },
    {
      label: "Lead Conversion",
      value: `${data.leadConversionRate.toFixed(1)}%`,
      icon: Target,
      color: "text-cyan-400",
      bgColor: "bg-cyan-500/10",
    },
    {
      label: "Customer Retention",
      value: `${data.customerRetention.toFixed(1)}%`,
      icon: Users,
      color: "text-rose-400",
      bgColor: "bg-rose-500/10",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-white">
          Analytics &amp; Reports
        </h1>
        <div className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-[#0f1729] px-4 py-2 text-sm text-gray-400">
          <CalendarDays className="h-4 w-4" />
          Last 30 Days
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.label}
              className="rounded-xl border border-white/10 bg-[#0f1729] p-4"
            >
              <div className="flex items-center gap-2">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-lg ${kpi.bgColor}`}
                >
                  <Icon className={`h-4 w-4 ${kpi.color}`} />
                </div>
              </div>
              <p className="mt-3 text-xl font-bold text-white">{kpi.value}</p>
              <p className="mt-0.5 text-[11px] text-gray-500">{kpi.label}</p>
            </div>
          );
        })}
      </div>

      {/* Row 1: Revenue over time (wide) + Job type breakdown (narrow) */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* Revenue chart */}
        <div className="rounded-xl border border-white/10 bg-[#0f1729] p-5 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white">
              Revenue Over Time
            </h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-blue-500" />
                <span className="text-[11px] text-gray-400">Service</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-purple-500" />
                <span className="text-[11px] text-gray-400">Install</span>
              </div>
            </div>
          </div>
          <div className="h-[300px]">
            <RevenueOverTimeChart data={data.revenueData} />
          </div>
        </div>

        {/* Job type donut */}
        <div className="rounded-xl border border-white/10 bg-[#0f1729] p-5">
          <h2 className="mb-2 text-sm font-semibold text-white">
            Jobs by Type
          </h2>
          <div className="h-[300px]">
            <JobsByTypeChart data={data.jobsByType} />
          </div>
        </div>
      </div>

      {/* Row 2: Lead sources (half) + Tech performance (half) */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Lead sources */}
        <div className="rounded-xl border border-white/10 bg-[#0f1729] p-5">
          <h2 className="mb-4 text-sm font-semibold text-white">
            Lead Sources
          </h2>
          <div className="h-[280px]">
            <LeadSourceChart data={data.leadsBySource} />
          </div>
        </div>

        {/* Tech performance */}
        <div className="rounded-xl border border-white/10 bg-[#0f1729] p-5">
          <h2 className="mb-4 text-sm font-semibold text-white">
            Technician Performance
          </h2>
          <div className="h-[280px]">
            <TechPerformanceChart data={data.techPerformance} />
          </div>
        </div>
      </div>

      {/* Row 3: Conversion funnel (full width) */}
      <div className="rounded-xl border border-white/10 bg-[#0f1729] p-5">
        <h2 className="mb-4 text-sm font-semibold text-white">
          Conversion Funnel
        </h2>
        <ConversionFunnelChart data={data.funnelData} />
      </div>

      {/* Row 4: Busiest zip codes + Top services */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Busiest zip codes */}
        <div className="rounded-xl border border-white/10 bg-[#0f1729] p-5">
          <div className="mb-4 flex items-center gap-2">
            <MapPin className="h-4 w-4 text-blue-400" />
            <h2 className="text-sm font-semibold text-white">
              Busiest Zip Codes
            </h2>
          </div>
          {data.zipCodes.length > 0 ? (
            <div className="space-y-2">
              {data.zipCodes.map(
                (zc: ZipCodeGroup, idx: number) => {
                  const maxCount = data.zipCodes[0]._count.id;
                  const pct = (zc._count.id / maxCount) * 100;
                  return (
                    <div key={zc.zip} className="flex items-center gap-3">
                      <span className="w-5 text-right text-xs font-medium text-gray-500">
                        {idx + 1}
                      </span>
                      <span className="w-16 text-sm font-medium text-white">
                        {zc.zip}
                      </span>
                      <div className="flex-1">
                        <div className="h-6 w-full overflow-hidden rounded bg-white/[0.03]">
                          <div
                            className="flex h-full items-center rounded bg-blue-500/30"
                            style={{ width: `${pct}%` }}
                          >
                            <span className="pl-2 text-[10px] font-medium text-blue-300">
                              {zc._count.id} jobs
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          ) : (
            <p className="py-8 text-center text-sm text-gray-500">
              No data available
            </p>
          )}
        </div>

        {/* Top services */}
        <div className="rounded-xl border border-white/10 bg-[#0f1729] p-5">
          <div className="mb-4 flex items-center gap-2">
            <Wrench className="h-4 w-4 text-emerald-400" />
            <h2 className="text-sm font-semibold text-white">Top Services</h2>
          </div>
          {data.topServices.length > 0 ? (
            <div className="space-y-2">
              {data.topServices.map(
                (svc: TopServiceGroup, idx: number) => (
                  <div
                    key={svc.title}
                    className={`flex items-center justify-between rounded-lg px-3 py-2.5 ${
                      idx % 2 === 0 ? "bg-transparent" : "bg-white/[0.015]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-6 w-6 items-center justify-center rounded-md bg-emerald-500/10 text-[10px] font-bold text-emerald-400">
                        {idx + 1}
                      </span>
                      <span className="max-w-[200px] truncate text-sm text-gray-300">
                        {svc.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-xs text-gray-500">
                        {svc._count.id} jobs
                      </span>
                      <span className="text-sm font-semibold text-white">
                        {formatCurrency(svc._sum.actualCost ?? 0)}
                      </span>
                    </div>
                  </div>
                )
              )}
            </div>
          ) : (
            <p className="py-8 text-center text-sm text-gray-500">
              No data available
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

import { prisma } from "@/lib/db";
import { cn, formatCurrency, formatDate } from "@/lib/utils";
import {
  Users,
  DollarSign,
  RefreshCw,
  CalendarCheck,
  Plus,
  MoreHorizontal,
  Clock,
  AlertTriangle,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type MembershipPlan = "BRONZE" | "SILVER" | "GOLD" | "PLATINUM";
type MembershipStatus = "ACTIVE" | "EXPIRED" | "CANCELLED" | "PENDING";

interface MembershipWithCustomer {
  id: string;
  plan: MembershipPlan;
  status: MembershipStatus;
  startDate: Date;
  renewalDate: Date;
  monthlyRate: number;
  visitsPerYear: number;
  visitsUsed: number;
  discount: number;
  priority: boolean;
  notes: string | null;
  createdAt: Date;
  customer: {
    id: string;
    name: string;
    email: string;
    phone: string | null;
  };
}

/* ------------------------------------------------------------------ */
/*  Color / style maps                                                 */
/* ------------------------------------------------------------------ */

const planBadgeColors: Record<MembershipPlan, string> = {
  BRONZE: "bg-zinc-500/15 text-zinc-400 border-zinc-500/25",
  SILVER: "bg-slate-500/15 text-slate-300 border-slate-400/25",
  GOLD: "bg-amber-500/15 text-amber-400 border-amber-500/25",
  PLATINUM: "bg-violet-500/15 text-violet-400 border-violet-500/25",
};

const statusBadgeColors: Record<MembershipStatus, string> = {
  ACTIVE: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
  EXPIRED: "bg-red-500/15 text-red-400 border-red-500/25",
  CANCELLED: "bg-gray-500/15 text-gray-400 border-gray-500/25",
  PENDING: "bg-yellow-500/15 text-yellow-400 border-yellow-500/25",
};

const tierBarColors: Record<MembershipPlan, string> = {
  BRONZE: "bg-gray-500",
  SILVER: "bg-slate-400",
  GOLD: "bg-amber-500",
  PLATINUM: "bg-violet-500",
};

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */

export default async function MembershipsPage() {
  const memberships = (await prisma.membership.findMany({
    include: {
      customer: {
        select: { id: true, name: true, email: true, phone: true },
      },
    },
    orderBy: { renewalDate: "asc" },
  })) as unknown as MembershipWithCustomer[];

  /* -- Aggregates -- */
  const now = new Date();
  const thirtyDaysFromNow = new Date(
    now.getTime() + 30 * 24 * 60 * 60 * 1000
  );

  const activeMembers = memberships.filter((m) => m.status === "ACTIVE");
  const monthlyRevenue = activeMembers.reduce(
    (sum, m) => sum + m.monthlyRate,
    0
  );
  const expiredCount = memberships.filter(
    (m) => m.status === "EXPIRED"
  ).length;
  const renewalRate =
    memberships.length > 0
      ? Math.round(
          ((memberships.length - expiredCount) / memberships.length) * 100
        )
      : 0;
  const totalVisitsScheduled = activeMembers.reduce(
    (sum, m) => sum + (m.visitsPerYear - m.visitsUsed),
    0
  );

  /* -- Tier breakdown -- */
  const plans: MembershipPlan[] = ["BRONZE", "SILVER", "GOLD", "PLATINUM"];
  const tierData = plans.map((plan) => {
    const tierMembers = activeMembers.filter((m) => m.plan === plan);
    return {
      plan,
      count: tierMembers.length,
      revenue: tierMembers.reduce((s, m) => s + m.monthlyRate, 0),
    };
  });
  const maxTierRevenue = Math.max(...tierData.map((t) => t.revenue), 1);

  /* -- Upcoming renewals -- */
  const upcomingRenewals = memberships.filter(
    (m) =>
      m.status === "ACTIVE" &&
      m.renewalDate >= now &&
      m.renewalDate <= thirtyDaysFromNow
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Membership Program</h1>
          <p className="mt-1 text-sm text-gray-400">
            Manage service agreements and recurring memberships
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-blue-500/25 transition-all hover:from-blue-500 hover:to-blue-400 hover:shadow-blue-500/40"
        >
          <Plus className="h-4 w-4" />
          Add Member
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={<Users className="h-5 w-5" />}
          iconBg="bg-blue-500/15"
          iconColor="text-blue-400"
          label="Active Members"
          value={activeMembers.length.toString()}
        />
        <StatCard
          icon={<DollarSign className="h-5 w-5" />}
          iconBg="bg-emerald-500/15"
          iconColor="text-emerald-400"
          label="Monthly Recurring Revenue"
          value={formatCurrency(monthlyRevenue)}
        />
        <StatCard
          icon={<RefreshCw className="h-5 w-5" />}
          iconBg="bg-amber-500/15"
          iconColor="text-amber-400"
          label="Renewal Rate"
          value={`${renewalRate}%`}
        />
        <StatCard
          icon={<CalendarCheck className="h-5 w-5" />}
          iconBg="bg-violet-500/15"
          iconColor="text-violet-400"
          label="Visits Scheduled"
          value={totalVisitsScheduled.toString()}
        />
      </div>

      {/* Revenue Breakdown by Tier */}
      <div className="rounded-xl border border-white/10 bg-[#0f1729] p-6">
        <h2 className="mb-4 text-lg font-semibold text-white">
          Revenue by Tier
        </h2>
        <div className="space-y-3">
          {tierData.map((tier) => (
            <div key={tier.plan} className="flex items-center gap-4">
              <span className="w-20 text-sm font-medium text-gray-400">
                {tier.plan}
              </span>
              <div className="relative flex-1 h-8 rounded-lg bg-white/5 overflow-hidden">
                <div
                  className={cn(
                    "h-full rounded-lg transition-all duration-500",
                    tierBarColors[tier.plan]
                  )}
                  style={{
                    width: `${Math.max(
                      (tier.revenue / maxTierRevenue) * 100,
                      tier.count > 0 ? 4 : 0
                    )}%`,
                  }}
                />
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-sm text-gray-400 w-16 text-right">
                  {tier.count} members
                </span>
                <span className="text-sm font-semibold text-white w-24 text-right">
                  {formatCurrency(tier.revenue)}/mo
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Members Table */}
      <div className="rounded-xl border border-white/10 bg-[#0f1729] overflow-hidden">
        <div className="border-b border-white/10 px-6 py-4">
          <h2 className="text-lg font-semibold text-white">Members</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/5 text-gray-400">
                <th className="px-6 py-3 font-medium">Customer Name</th>
                <th className="px-6 py-3 font-medium">Plan</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Start Date</th>
                <th className="px-6 py-3 font-medium">Renewal Date</th>
                <th className="px-6 py-3 font-medium">Visits</th>
                <th className="px-6 py-3 font-medium">Monthly Rate</th>
                <th className="px-6 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {memberships.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    No memberships found. Add your first member to get started.
                  </td>
                </tr>
              ) : (
                memberships.map((m) => {
                  const isRenewingSoon =
                    m.status === "ACTIVE" &&
                    m.renewalDate >= now &&
                    m.renewalDate <= thirtyDaysFromNow;

                  return (
                    <tr
                      key={m.id}
                      className={cn(
                        "transition-colors hover:bg-white/[0.02]",
                        isRenewingSoon && "border-l-4 border-l-orange-500"
                      )}
                    >
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-white">
                            {m.customer.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {m.customer.email}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={cn(
                            "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium",
                            planBadgeColors[m.plan]
                          )}
                        >
                          {m.plan}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={cn(
                            "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium",
                            statusBadgeColors[m.status]
                          )}
                        >
                          {m.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-400">
                        {formatDate(m.startDate)}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={cn(
                            "text-gray-400",
                            isRenewingSoon && "font-medium text-orange-400"
                          )}
                        >
                          {formatDate(m.renewalDate)}
                          {isRenewingSoon && (
                            <Clock className="ml-1.5 inline h-3.5 w-3.5" />
                          )}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-400">
                        <span className="text-white font-medium">
                          {m.visitsUsed}
                        </span>
                        /{m.visitsPerYear}
                      </td>
                      <td className="px-6 py-4 font-medium text-white">
                        {formatCurrency(m.monthlyRate)}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          type="button"
                          className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-white/5 hover:text-white"
                          aria-label={`Actions for ${m.customer.name}`}
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upcoming Renewals */}
      <div className="rounded-xl border border-white/10 bg-[#0f1729] p-6">
        <div className="mb-4 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-orange-400" />
          <h2 className="text-lg font-semibold text-white">
            Upcoming Renewals
          </h2>
          <span className="ml-2 inline-flex items-center rounded-full bg-orange-500/15 px-2.5 py-0.5 text-xs font-medium text-orange-400 border border-orange-500/25">
            {upcomingRenewals.length}
          </span>
        </div>

        {upcomingRenewals.length === 0 ? (
          <p className="text-sm text-gray-500">
            No renewals coming up in the next 30 days.
          </p>
        ) : (
          <div className="space-y-3">
            {upcomingRenewals.map((m) => {
              const daysUntil = Math.ceil(
                (m.renewalDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
              );
              return (
                <div
                  key={m.id}
                  className="flex flex-col gap-2 rounded-lg border border-white/5 bg-white/[0.02] p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500/15 text-orange-400 shrink-0">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium text-white">
                        {m.customer.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {m.plan} Plan &middot;{" "}
                        {formatCurrency(m.monthlyRate)}/mo
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-orange-400">
                      Renews in{" "}
                      <span className="font-semibold">{daysUntil} days</span>
                    </span>
                    <span className="text-xs text-gray-500">
                      {formatDate(m.renewalDate)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Inline StatCard (server-safe, no framer-motion)                    */
/* ------------------------------------------------------------------ */

function StatCard({
  icon,
  iconBg,
  iconColor,
  label,
  value,
}: {
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#0f1729] p-5 transition-colors hover:border-white/20">
      <div className="mb-3 flex items-center gap-3">
        <span
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-lg shrink-0",
            iconBg,
            iconColor
          )}
          aria-hidden="true"
        >
          {icon}
        </span>
        <span className="text-sm font-medium text-gray-400 truncate">
          {label}
        </span>
      </div>
      <p className="text-2xl font-bold text-white tracking-tight">{value}</p>
    </div>
  );
}

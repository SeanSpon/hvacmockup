import { prisma } from "@/lib/db";
import { formatCurrency, getInitials } from "@/lib/utils";
import {
  Building2,
  UserPlus,
  Users,
  Crown,
  DollarSign,
  Briefcase,
  Mail,
  Phone,
  Home,
  Search,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface CustomerInvoice {
  total: number;
  status: string;
}

interface CustomerMembership {
  plan: string;
  status: string;
}

interface CustomerFromDB {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  properties: { id: string }[];
  invoices: CustomerInvoice[];
  memberships: CustomerMembership[];
  customerJobs: { id: string }[];
}

interface CustomerRow {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  totalSpent: number;
  activeMembership: string | null;
  propertyCount: number;
  jobCount: number;
}

/* ------------------------------------------------------------------ */
/*  Membership badge colors                                            */
/* ------------------------------------------------------------------ */

const MEMBERSHIP_STYLES: Record<string, string> = {
  PLATINUM:
    "bg-gradient-to-r from-violet-500/20 to-purple-500/20 text-violet-300 border-violet-500/30",
  GOLD: "bg-gradient-to-r from-amber-500/20 to-yellow-500/20 text-amber-300 border-amber-500/30",
  SILVER:
    "bg-gradient-to-r from-gray-400/20 to-slate-400/20 text-gray-300 border-gray-400/30",
  BRONZE:
    "bg-gradient-to-r from-orange-700/20 to-amber-700/20 text-orange-300 border-orange-700/30",
};

function getMembershipStyle(plan: string | null): string {
  if (!plan) return "bg-white/5 text-gray-500 border-white/10";
  return MEMBERSHIP_STYLES[plan] ?? "bg-white/5 text-gray-500 border-white/10";
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default async function CustomersPage() {
  const customers: CustomerFromDB[] = await prisma.user.findMany({
    where: { role: "CUSTOMER" },
    include: {
      properties: {
        select: { id: true },
      },
      invoices: {
        select: {
          total: true,
          status: true,
        },
      },
      memberships: {
        where: { status: "ACTIVE" },
        orderBy: { createdAt: "desc" },
        take: 1,
        select: {
          plan: true,
          status: true,
        },
      },
      customerJobs: {
        select: { id: true },
      },
    },
    orderBy: { name: "asc" },
  });

  /* Derive per-customer data */
  const customerData: CustomerRow[] = customers.map(
    (c: CustomerFromDB) => {
      const totalSpent = c.invoices
        .filter((inv: CustomerInvoice) => inv.status === "PAID")
        .reduce(
          (sum: number, inv: CustomerInvoice) => sum + inv.total,
          0
        );
      const activeMembership =
        c.memberships.length > 0 ? c.memberships[0].plan : null;
      return {
        id: c.id,
        name: c.name,
        email: c.email,
        phone: c.phone,
        totalSpent,
        activeMembership,
        propertyCount: c.properties.length,
        jobCount: c.customerJobs.length,
      };
    }
  );

  /* Aggregate stats */
  const totalCustomers = customerData.length;
  const activeMembers = customerData.filter(
    (c: CustomerRow) => c.activeMembership !== null
  ).length;
  const lifetimeRevenue = customerData.reduce(
    (sum: number, c: CustomerRow) => sum + c.totalSpent,
    0
  );
  const totalJobCount = customerData.reduce(
    (sum: number, c: CustomerRow) => sum + c.jobCount,
    0
  );
  const avgJobValue =
    totalJobCount > 0 ? lifetimeRevenue / totalJobCount : 0;

  const stats = [
    {
      label: "Total Customers",
      value: totalCustomers.toLocaleString(),
      icon: Users,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
    },
    {
      label: "Active Members",
      value: activeMembers.toLocaleString(),
      icon: Crown,
      color: "text-amber-400",
      bgColor: "bg-amber-500/10",
    },
    {
      label: "Lifetime Revenue",
      value: formatCurrency(lifetimeRevenue),
      icon: DollarSign,
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
    },
    {
      label: "Avg Job Value",
      value: formatCurrency(avgJobValue),
      icon: Briefcase,
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-white">Customers</h1>
          <span className="inline-flex items-center rounded-full bg-blue-500/15 px-2.5 py-0.5 text-xs font-medium text-blue-400">
            {totalCustomers}
          </span>
        </div>
        <Link
          href="/dashboard/customers/new"
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-500"
        >
          <UserPlus className="h-4 w-4" />
          Add Customer
        </Link>
      </div>

      {/* Search bar */}
      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
        <input
          type="search"
          placeholder="Search customers by name, email, or phone..."
          className="h-11 w-full rounded-xl border border-white/10 bg-[#0f1729] pl-11 pr-4 text-sm text-white placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {/* Stats row */}
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
                <div className="min-w-0">
                  <p className="truncate text-xl font-bold text-white">
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-500">{stat.label}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Customer table */}
      <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0f1729]">
        {/* Table header */}
        <div className="border-b border-white/5 px-6 py-4">
          <h2 className="text-sm font-semibold text-white">All Customers</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-b border-white/5">
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Phone
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                  Properties
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                  Jobs
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                  Membership
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                  Total Spent
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {customerData.map((customer: CustomerRow, idx: number) => (
                <tr
                  key={customer.id}
                  className={`transition-colors hover:bg-white/[0.03] ${
                    idx % 2 === 0 ? "bg-transparent" : "bg-white/[0.015]"
                  }`}
                >
                  {/* Name cell */}
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/15 text-xs font-semibold text-blue-400">
                        {getInitials(customer.name)}
                      </div>
                      <span className="text-sm font-medium text-white">
                        {customer.name}
                      </span>
                    </div>
                  </td>

                  {/* Email */}
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center gap-1.5 text-sm text-gray-400">
                      <Mail className="h-3.5 w-3.5 shrink-0 text-gray-600" />
                      <span className="truncate">{customer.email}</span>
                    </div>
                  </td>

                  {/* Phone */}
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center gap-1.5 text-sm text-gray-400">
                      <Phone className="h-3.5 w-3.5 shrink-0 text-gray-600" />
                      <span>{customer.phone ?? "--"}</span>
                    </div>
                  </td>

                  {/* Properties */}
                  <td className="whitespace-nowrap px-6 py-4 text-center">
                    <div className="inline-flex items-center gap-1 text-sm text-gray-300">
                      <Home className="h-3.5 w-3.5 text-gray-600" />
                      {customer.propertyCount}
                    </div>
                  </td>

                  {/* Jobs */}
                  <td className="whitespace-nowrap px-6 py-4 text-center">
                    <span className="text-sm text-gray-300">
                      {customer.jobCount}
                    </span>
                  </td>

                  {/* Membership */}
                  <td className="whitespace-nowrap px-6 py-4 text-center">
                    <span
                      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${getMembershipStyle(
                        customer.activeMembership
                      )}`}
                    >
                      {customer.activeMembership ? (
                        <>
                          <Crown className="mr-1 h-3 w-3" />
                          {customer.activeMembership}
                        </>
                      ) : (
                        "None"
                      )}
                    </span>
                  </td>

                  {/* Total Spent */}
                  <td className="whitespace-nowrap px-6 py-4 text-right">
                    <span className="text-sm font-semibold text-white">
                      {formatCurrency(customer.totalSpent)}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="whitespace-nowrap px-6 py-4 text-right">
                    <Link
                      href={`/dashboard/customers/${customer.id}`}
                      className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs text-gray-500 transition-colors hover:bg-white/5 hover:text-white"
                    >
                      View
                      <ChevronRight className="h-3 w-3" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty state inside table container */}
        {customerData.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-500/10">
              <Building2 className="h-8 w-8 text-blue-400" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-white">
              No customers yet
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Add your first customer to get started.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

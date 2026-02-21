import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(_request: NextRequest) {
  try {
    const now = new Date();

    // Start of today (midnight local)
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const todayEnd = new Date(todayStart);
    todayEnd.setDate(todayEnd.getDate() + 1);

    // 7 days ago
    const weekAgo = new Date(todayStart);
    weekAgo.setDate(weekAgo.getDate() - 7);

    // 30 days ago
    const monthAgo = new Date(todayStart);
    monthAgo.setDate(monthAgo.getDate() - 30);

    const [
      revenueTodayResult,
      jobsInProgress,
      activeTechs,
      openLeads,
      jobsToday,
      weeklyRevenueResult,
      monthlyRevenueResult,
      wonLeads,
      totalLeads,
      activeMembers,
      avgTicketResult,
    ] = await Promise.all([
      // Revenue today: sum of paid invoices where paidAt is today
      prisma.invoice.aggregate({
        where: {
          status: "PAID",
          paidAt: { gte: todayStart, lt: todayEnd },
        },
        _sum: { total: true },
      }),

      // Jobs currently in progress
      prisma.job.count({
        where: { status: "IN_PROGRESS" },
      }),

      // Active technicians (available tech profiles)
      prisma.techProfile.count({
        where: { isAvailable: true },
      }),

      // Open leads (NEW or CONTACTED)
      prisma.lead.count({
        where: { status: { in: ["NEW", "CONTACTED"] } },
      }),

      // Jobs scheduled for today
      prisma.job.count({
        where: {
          scheduledDate: { gte: todayStart, lt: todayEnd },
        },
      }),

      // Weekly revenue: paid invoices in last 7 days
      prisma.invoice.aggregate({
        where: {
          status: "PAID",
          paidAt: { gte: weekAgo, lt: todayEnd },
        },
        _sum: { total: true },
      }),

      // Monthly revenue: paid invoices in last 30 days
      prisma.invoice.aggregate({
        where: {
          status: "PAID",
          paidAt: { gte: monthAgo, lt: todayEnd },
        },
        _sum: { total: true },
      }),

      // Won leads (for conversion rate)
      prisma.lead.count({
        where: { status: "WON" },
      }),

      // Total leads (for conversion rate)
      prisma.lead.count(),

      // Active memberships
      prisma.membership.count({
        where: { status: "ACTIVE" },
      }),

      // Average invoice total (all paid invoices)
      prisma.invoice.aggregate({
        where: { status: "PAID" },
        _avg: { total: true },
      }),
    ]);

    const revenueToday = revenueTodayResult._sum.total ?? 0;
    const weeklyRevenue = weeklyRevenueResult._sum.total ?? 0;
    const monthlyRevenue = monthlyRevenueResult._sum.total ?? 0;
    const conversionRate = totalLeads > 0
      ? Math.round((wonLeads / totalLeads) * 10000) / 100
      : 0;
    const avgTicket = avgTicketResult._avg.total ?? 0;

    return NextResponse.json({
      revenueToday,
      jobsInProgress,
      activeTechs,
      openLeads,
      jobsToday,
      weeklyRevenue,
      monthlyRevenue,
      conversionRate,
      activeMembers,
      avgTicket: Math.round(avgTicket * 100) / 100,
    });
  } catch (error) {
    console.error("Failed to fetch dashboard stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard stats" },
      { status: 500 }
    );
  }
}

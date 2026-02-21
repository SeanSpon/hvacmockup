import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const daysParam = searchParams.get("days");
    const days = daysParam ? Math.min(parseInt(daysParam, 10) || 30, 365) : 30;

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    startDate.setHours(0, 0, 0, 0);

    const metrics = await prisma.dailyMetric.findMany({
      where: {
        date: { gte: startDate },
      },
      orderBy: { date: "asc" },
    });

    return NextResponse.json(metrics);
  } catch (error) {
    console.error("Failed to fetch daily metrics:", error);
    return NextResponse.json(
      { error: "Failed to fetch daily metrics" },
      { status: 500 }
    );
  }
}

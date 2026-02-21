import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { JobStatus, JobType } from "@/generated/prisma/client";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const status = searchParams.get("status");
    const type = searchParams.get("type");
    const limit = searchParams.get("limit");
    const techId = searchParams.get("techId");

    const where: Record<string, unknown> = {};

    if (status && Object.values(JobStatus).includes(status as JobStatus)) {
      where.status = status as JobStatus;
    }

    if (type && Object.values(JobType).includes(type as JobType)) {
      where.jobType = type as JobType;
    }

    if (techId) {
      where.technicianId = techId;
    }

    const take = limit ? Math.min(parseInt(limit, 10) || 50, 200) : 50;

    const jobs = await prisma.job.findMany({
      where,
      take,
      orderBy: { createdAt: "desc" },
      include: {
        customer: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
        technician: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
        property: {
          select: {
            id: true,
            name: true,
            address: true,
            city: true,
            state: true,
            zip: true,
          },
        },
        unit: {
          select: {
            id: true,
            unitType: true,
            brand: true,
            model: true,
            serialNumber: true,
          },
        },
      },
    });

    return NextResponse.json(jobs);
  } catch (error) {
    console.error("Failed to fetch jobs:", error);
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      title,
      description,
      jobType,
      priority,
      customerId,
      propertyId,
      unitId,
      scheduledDate,
      scheduledStart,
      scheduledEnd,
      technicianId,
      estimatedCost,
    } = body;

    if (!title || !description || !jobType || !customerId || !propertyId) {
      return NextResponse.json(
        { error: "Missing required fields: title, description, jobType, customerId, propertyId" },
        { status: 400 }
      );
    }

    // Auto-generate job number: FDP-{year}-{3 digit sequence}
    const year = new Date().getFullYear();
    const prefix = `FDP-${year}-`;

    const lastJob = await prisma.job.findFirst({
      where: { jobNumber: { startsWith: prefix } },
      orderBy: { jobNumber: "desc" },
      select: { jobNumber: true },
    });

    let sequence = 1;
    if (lastJob) {
      const lastSequence = parseInt(lastJob.jobNumber.replace(prefix, ""), 10);
      if (!isNaN(lastSequence)) {
        sequence = lastSequence + 1;
      }
    }

    const jobNumber = `${prefix}${String(sequence).padStart(3, "0")}`;

    const job = await prisma.job.create({
      data: {
        jobNumber,
        title,
        description,
        jobType: jobType as JobType,
        priority: priority ?? "NORMAL",
        customerId,
        propertyId,
        unitId: unitId ?? null,
        technicianId: technicianId ?? null,
        scheduledDate: scheduledDate ? new Date(scheduledDate) : null,
        scheduledStart: scheduledStart ?? null,
        scheduledEnd: scheduledEnd ?? null,
        estimatedCost: estimatedCost ? parseFloat(estimatedCost) : null,
        status: technicianId && scheduledDate ? "SCHEDULED" : "PENDING",
      },
      include: {
        customer: {
          select: { id: true, name: true, email: true },
        },
        technician: {
          select: { id: true, name: true, email: true },
        },
        property: {
          select: { id: true, name: true, address: true },
        },
        unit: {
          select: { id: true, unitType: true, brand: true, model: true },
        },
      },
    });

    return NextResponse.json(job, { status: 201 });
  } catch (error) {
    console.error("Failed to create job:", error);
    return NextResponse.json(
      { error: "Failed to create job" },
      { status: 500 }
    );
  }
}

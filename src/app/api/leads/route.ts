import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { LeadStatus, LeadSource } from "@/generated/prisma/client";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const status = searchParams.get("status");

    const where: Record<string, unknown> = {};

    if (status && Object.values(LeadStatus).includes(status as LeadStatus)) {
      where.status = status as LeadStatus;
    }

    const leads = await prisma.lead.findMany({
      where,
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
      },
    });

    return NextResponse.json(leads);
  } catch (error) {
    console.error("Failed to fetch leads:", error);
    return NextResponse.json(
      { error: "Failed to fetch leads" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      name,
      email,
      phone,
      address,
      source,
      serviceNeeded,
      description,
      urgency,
    } = body;

    if (!name || !phone || !serviceNeeded) {
      return NextResponse.json(
        { error: "Missing required fields: name, phone, serviceNeeded" },
        { status: 400 }
      );
    }

    const validSource = source && Object.values(LeadSource).includes(source as LeadSource)
      ? (source as LeadSource)
      : "WEBSITE";

    const lead = await prisma.lead.create({
      data: {
        name,
        email: email ?? null,
        phone,
        address: address ?? null,
        source: validSource,
        serviceNeeded,
        description: description ?? null,
        urgency: urgency ? parseInt(String(urgency), 10) : null,
        status: "NEW",
      },
    });

    return NextResponse.json(lead, { status: 201 });
  } catch (error) {
    console.error("Failed to create lead:", error);
    return NextResponse.json(
      { error: "Failed to create lead" },
      { status: 500 }
    );
  }
}

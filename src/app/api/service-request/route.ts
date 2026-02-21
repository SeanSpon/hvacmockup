import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      name,
      email,
      phone,
      address,
      serviceType,
      urgency,
      description,
      preferredDate,
      preferredTime,
    } = body;

    if (!name || !email || !phone || !serviceType || !description) {
      return NextResponse.json(
        { error: "Missing required fields: name, email, phone, serviceType, description" },
        { status: 400 }
      );
    }

    // Create both the service request and lead in a transaction
    const result = await prisma.$transaction(async (tx) => {
      const serviceRequest = await tx.serviceRequest.create({
        data: {
          name,
          email,
          phone,
          address: address ?? null,
          serviceType,
          urgency: urgency ?? "normal",
          description,
          preferredDate: preferredDate ?? null,
          preferredTime: preferredTime ?? null,
          status: "new",
        },
      });

      // Map urgency string to numeric value for the lead
      const urgencyMap: Record<string, number> = {
        low: 2,
        normal: 5,
        high: 7,
        emergency: 10,
      };

      const lead = await tx.lead.create({
        data: {
          name,
          email,
          phone,
          address: address ?? null,
          source: "WEBSITE",
          serviceNeeded: serviceType,
          description,
          urgency: urgencyMap[urgency?.toLowerCase() ?? "normal"] ?? 5,
          status: "NEW",
        },
      });

      return { serviceRequest, lead };
    });

    return NextResponse.json(
      {
        message: "Service request submitted successfully. We will contact you shortly.",
        serviceRequestId: result.serviceRequest.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to create service request:", error);
    return NextResponse.json(
      { error: "Failed to submit service request" },
      { status: 500 }
    );
  }
}

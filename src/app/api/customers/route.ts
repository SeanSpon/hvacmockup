import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(_request: NextRequest) {
  try {
    const customers = await prisma.user.findMany({
      where: { role: "CUSTOMER" },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        avatar: true,
        createdAt: true,
        properties: {
          select: {
            id: true,
            name: true,
            address: true,
            city: true,
            state: true,
            zip: true,
            propertyType: true,
          },
        },
        memberships: {
          select: {
            id: true,
            plan: true,
            status: true,
            startDate: true,
            renewalDate: true,
            monthlyRate: true,
            visitsPerYear: true,
            visitsUsed: true,
            discount: true,
          },
          where: { status: "ACTIVE" },
        },
        invoices: {
          select: {
            id: true,
            total: true,
            status: true,
            paidAt: true,
          },
          where: { status: "PAID" },
        },
      },
      orderBy: { name: "asc" },
    });

    // Compute lifetime invoice total per customer
    const result = customers.map((customer) => {
      const totalSpent = customer.invoices.reduce(
        (sum, inv) => sum + inv.total,
        0
      );

      return {
        id: customer.id,
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        avatar: customer.avatar,
        createdAt: customer.createdAt,
        properties: customer.properties,
        memberships: customer.memberships,
        invoiceCount: customer.invoices.length,
        totalSpent: Math.round(totalSpent * 100) / 100,
      };
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Failed to fetch customers:", error);
    return NextResponse.json(
      { error: "Failed to fetch customers" },
      { status: 500 }
    );
  }
}

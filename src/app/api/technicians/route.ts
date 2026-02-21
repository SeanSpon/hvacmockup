import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(_request: NextRequest) {
  try {
    const technicians = await prisma.user.findMany({
      where: { role: "TECHNICIAN" },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        avatar: true,
        createdAt: true,
        techProfile: {
          select: {
            id: true,
            skills: true,
            certifications: true,
            hireDate: true,
            truckNumber: true,
            currentLat: true,
            currentLng: true,
            isAvailable: true,
            avgRating: true,
            jobsCompleted: true,
            revenueGenerated: true,
          },
        },
        _count: {
          select: {
            technicianJobs: true,
          },
        },
      },
      orderBy: { name: "asc" },
    });

    // Reshape to flatten _count into a friendlier format
    const result = technicians.map((tech) => ({
      id: tech.id,
      name: tech.name,
      email: tech.email,
      phone: tech.phone,
      avatar: tech.avatar,
      createdAt: tech.createdAt,
      techProfile: tech.techProfile,
      jobCount: tech._count.technicianJobs,
    }));

    return NextResponse.json(result);
  } catch (error) {
    console.error("Failed to fetch technicians:", error);
    return NextResponse.json(
      { error: "Failed to fetch technicians" },
      { status: 500 }
    );
  }
}

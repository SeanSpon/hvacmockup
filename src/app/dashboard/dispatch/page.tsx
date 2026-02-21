import { prisma } from "@/lib/db";
import { DispatchBoard } from "@/components/dashboard/dispatch-board";
import { format, startOfDay, endOfDay } from "date-fns";

export const metadata = {
  title: "Dispatch Board | FD Pierce Company",
};

export default async function DispatchPage() {
  const today = new Date();
  const dayStart = startOfDay(today);
  const dayEnd = endOfDay(today);
  const todayDateString = format(today, "EEEE, MMMM d, yyyy");

  // Fetch jobs scheduled for today (with customer, technician, property)
  const scheduledJobs = await prisma.job.findMany({
    where: {
      scheduledDate: {
        gte: dayStart,
        lte: dayEnd,
      },
      technicianId: { not: null },
      status: {
        notIn: ["CANCELLED"],
      },
    },
    include: {
      customer: {
        select: { id: true, name: true, phone: true },
      },
      technician: {
        select: { id: true, name: true },
      },
      property: {
        select: { id: true, address: true, city: true, state: true },
      },
    },
    orderBy: { scheduledDate: "asc" },
  });

  // Fetch all technicians with their profiles
  const technicians = await prisma.user.findMany({
    where: { role: "TECHNICIAN" },
    select: {
      id: true,
      name: true,
      techProfile: {
        select: {
          id: true,
          truckNumber: true,
          isAvailable: true,
          skills: true,
        },
      },
    },
    orderBy: { name: "asc" },
  });

  // Fetch unassigned pending jobs
  const unassignedJobs = await prisma.job.findMany({
    where: {
      technicianId: null,
      status: "PENDING",
    },
    include: {
      customer: {
        select: { id: true, name: true, phone: true },
      },
      technician: {
        select: { id: true, name: true },
      },
      property: {
        select: { id: true, address: true, city: true, state: true },
      },
    },
    orderBy: [{ priority: "desc" }, { createdAt: "asc" }],
    take: 50,
  });

  // Serialize dates to ISO strings for client component
  const serializeJob = (job: typeof scheduledJobs[number] | typeof unassignedJobs[number]) => ({
    ...job,
    scheduledDate: job.scheduledDate?.toISOString() ?? null,
    actualStart: null,
    actualEnd: null,
    createdAt: undefined,
    updatedAt: undefined,
  });

  return (
    <div className="space-y-1">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-white">Dispatch Board</h1>
        <p className="text-sm text-gray-400 mt-1">
          Manage today&apos;s schedule and assign technicians to jobs
        </p>
      </div>

      <DispatchBoard
        jobs={scheduledJobs.map(serializeJob) as any}
        technicians={technicians as any}
        unassignedJobs={unassignedJobs.map(serializeJob) as any}
        todayDateString={todayDateString}
      />
    </div>
  );
}

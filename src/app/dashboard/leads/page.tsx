import { prisma } from "@/lib/db";
import { LeadPipeline } from "@/components/dashboard/lead-pipeline";
import { subDays } from "date-fns";

export const metadata = {
  title: "Lead Pipeline | FD Pierce Company",
};

/* ------------------------------------------------------------------ */
/*  Local types for Prisma query results                               */
/* ------------------------------------------------------------------ */

interface LeadRow {
  id: string;
  name: string;
  email: string | null;
  phone: string;
  address: string | null;
  source: string;
  status: string;
  serviceNeeded: string;
  description: string | null;
  urgency: number | null;
  estimatedValue: number | null;
  notes: string | null;
  followUpDate: Date | null;
  createdAt: Date;
}

interface SerializedLead {
  id: string;
  name: string;
  email: string | null;
  phone: string;
  address: string | null;
  source: string;
  status: string;
  serviceNeeded: string;
  description: string | null;
  urgency: number | null;
  estimatedValue: number | null;
  notes: string | null;
  followUpDate: string | null;
  createdAt: string;
}

export default async function LeadsPage() {
  // Fetch all leads
  const leads: LeadRow[] = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
  }) as unknown as LeadRow[];

  // Serialize dates for client component
  const serializedLeads: SerializedLead[] = leads.map((lead) => ({
    id: lead.id,
    name: lead.name,
    email: lead.email,
    phone: lead.phone,
    address: lead.address,
    source: lead.source,
    status: lead.status,
    serviceNeeded: lead.serviceNeeded,
    description: lead.description,
    urgency: lead.urgency,
    estimatedValue: lead.estimatedValue,
    notes: lead.notes,
    followUpDate: lead.followUpDate?.toISOString() ?? null,
    createdAt: lead.createdAt.toISOString(),
  }));

  // Group by status
  const leadsByStatus: Record<string, SerializedLead[]> = {};
  for (const lead of serializedLeads) {
    if (!leadsByStatus[lead.status]) {
      leadsByStatus[lead.status] = [];
    }
    leadsByStatus[lead.status].push(lead);
  }

  // Calculate stats
  const total = leads.length;
  const weekAgo = subDays(new Date(), 7);
  const newThisWeek = leads.filter(
    (l) => l.status === "NEW" && l.createdAt >= weekAgo
  ).length;
  const wonCount = leads.filter((l) => l.status === "WON").length;
  const lostCount = leads.filter((l) => l.status === "LOST").length;
  const closedCount = wonCount + lostCount;
  const conversionRate =
    closedCount > 0 ? Math.round((wonCount / closedCount) * 100) : 0;
  const pipelineValue = leads
    .filter((l) => !["WON", "LOST"].includes(l.status))
    .reduce((sum: number, l) => sum + (l.estimatedValue ?? 0), 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Lead Pipeline</h1>
        <p className="text-sm text-gray-400 mt-1">
          Track and manage leads through every stage of the sales process
        </p>
      </div>

      <LeadPipeline
        leadsByStatus={leadsByStatus}
        stats={{
          total,
          newThisWeek,
          conversionRate,
          pipelineValue,
        }}
      />
    </div>
  );
}

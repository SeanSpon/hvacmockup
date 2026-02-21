"use client";

import { useState } from "react";
import {
  Phone,
  Mail,
  DollarSign,
  Clock,
  ChevronRight,
  X,
  MapPin,
  StickyNote,
  User,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn, formatCurrency, getRelativeTime } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface Lead {
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

interface LeadPipelineProps {
  leadsByStatus: Record<string, Lead[]>;
  stats: {
    total: number;
    newThisWeek: number;
    conversionRate: number;
    pipelineValue: number;
  };
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const COLUMNS: { status: string; label: string; color: string }[] = [
  { status: "NEW", label: "New", color: "border-t-blue-500" },
  { status: "CONTACTED", label: "Contacted", color: "border-t-cyan-500" },
  { status: "QUALIFIED", label: "Qualified", color: "border-t-purple-500" },
  { status: "ESTIMATE_SENT", label: "Estimate Sent", color: "border-t-amber-500" },
  { status: "FOLLOW_UP", label: "Follow Up", color: "border-t-orange-500" },
  { status: "WON", label: "Won", color: "border-t-emerald-500" },
  { status: "LOST", label: "Lost", color: "border-t-red-500" },
];

const SOURCE_STYLES: Record<string, { className: string; label: string }> = {
  WEBSITE: {
    className: "bg-blue-500/15 text-blue-400 border-blue-500/25",
    label: "Website",
  },
  PHONE: {
    className: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
    label: "Phone",
  },
  REFERRAL: {
    className: "bg-purple-500/15 text-purple-400 border-purple-500/25",
    label: "Referral",
  },
  GOOGLE_ADS: {
    className: "bg-red-500/15 text-red-400 border-red-500/25",
    label: "Google Ads",
  },
  FACEBOOK: {
    className: "bg-indigo-500/15 text-indigo-400 border-indigo-500/25",
    label: "Facebook",
  },
  YELP: {
    className: "bg-pink-500/15 text-pink-400 border-pink-500/25",
    label: "Yelp",
  },
  BBB: {
    className: "bg-teal-500/15 text-teal-400 border-teal-500/25",
    label: "BBB",
  },
  WALK_IN: {
    className: "bg-gray-500/15 text-gray-400 border-gray-500/25",
    label: "Walk-In",
  },
  REPEAT: {
    className: "bg-cyan-500/15 text-cyan-400 border-cyan-500/25",
    label: "Repeat",
  },
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function LeadPipeline({ leadsByStatus, stats }: LeadPipelineProps) {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  return (
    <div className="space-y-4">
      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatMini
          label="Total Leads"
          value={stats.total.toString()}
          iconBg="bg-blue-500/15"
          iconText="text-blue-400"
          icon={<User className="h-4 w-4" />}
        />
        <StatMini
          label="New This Week"
          value={stats.newThisWeek.toString()}
          iconBg="bg-emerald-500/15"
          iconText="text-emerald-400"
          icon={<Clock className="h-4 w-4" />}
        />
        <StatMini
          label="Conversion Rate"
          value={`${stats.conversionRate}%`}
          iconBg="bg-purple-500/15"
          iconText="text-purple-400"
          icon={<ChevronRight className="h-4 w-4" />}
        />
        <StatMini
          label="Pipeline Value"
          value={formatCurrency(stats.pipelineValue)}
          iconBg="bg-amber-500/15"
          iconText="text-amber-400"
          icon={<DollarSign className="h-4 w-4" />}
        />
      </div>

      {/* Kanban Board */}
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-3 min-w-max">
          {COLUMNS.map((col) => {
            const leads = leadsByStatus[col.status] ?? [];
            return (
              <div
                key={col.status}
                className={cn(
                  "flex flex-col w-[260px] shrink-0 rounded-xl bg-[#0f1729] border border-white/10",
                  "border-t-2",
                  col.color
                )}
              >
                {/* Column Header */}
                <div className="flex items-center justify-between px-3 py-2.5 border-b border-white/5">
                  <h3 className="text-sm font-semibold text-white">
                    {col.label}
                  </h3>
                  <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-white/10 px-1.5 text-[10px] font-bold text-gray-300">
                    {leads.length}
                  </span>
                </div>

                {/* Lead Cards */}
                <div className="flex-1 overflow-y-auto p-2 space-y-2 max-h-[calc(100vh-340px)]">
                  {leads.length === 0 ? (
                    <div className="flex items-center justify-center py-8 text-gray-600">
                      <p className="text-xs">No leads</p>
                    </div>
                  ) : (
                    leads.map((lead) => {
                      const sourceCfg =
                        SOURCE_STYLES[lead.source] ?? {
                          className: "bg-gray-500/15 text-gray-400 border-gray-500/25",
                          label: lead.source,
                        };

                      return (
                        <button
                          key={lead.id}
                          type="button"
                          onClick={() => setSelectedLead(lead)}
                          className={cn(
                            "w-full text-left rounded-lg border border-white/10 bg-white/5 p-3",
                            "transition-all duration-150 hover:bg-white/10 hover:border-white/20",
                            "cursor-pointer",
                            selectedLead?.id === lead.id &&
                              "ring-2 ring-blue-500/40 border-blue-500/30"
                          )}
                        >
                          {/* Name + Source */}
                          <div className="flex items-start justify-between gap-2 mb-1.5">
                            <p className="text-sm font-medium text-white truncate">
                              {lead.name}
                            </p>
                          </div>

                          {/* Phone */}
                          <div className="flex items-center gap-1.5 mb-1.5">
                            <Phone className="h-3 w-3 text-gray-500 shrink-0" />
                            <span className="text-xs text-gray-400 truncate">
                              {lead.phone}
                            </span>
                          </div>

                          {/* Service Needed */}
                          <p className="text-xs text-gray-300 mb-2 truncate">
                            {lead.serviceNeeded}
                          </p>

                          {/* Footer: source badge + value + time */}
                          <div className="flex items-center justify-between gap-2">
                            <span
                              className={cn(
                                "inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium",
                                sourceCfg.className
                              )}
                            >
                              {sourceCfg.label}
                            </span>
                            <span className="text-[10px] text-gray-500 shrink-0">
                              {getRelativeTime(lead.createdAt)}
                            </span>
                          </div>

                          {lead.estimatedValue != null && (
                            <div className="mt-1.5 flex items-center gap-1 text-xs text-emerald-400">
                              <DollarSign className="h-3 w-3" />
                              {formatCurrency(lead.estimatedValue)}
                            </div>
                          )}
                        </button>
                      );
                    })
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Lead Detail Panel */}
      {selectedLead && (
        <div className="rounded-xl bg-[#0f1729] border border-white/10 overflow-hidden">
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <User className="h-4 w-4 text-blue-400" />
              Lead Details &mdash; {selectedLead.name}
            </h3>
            <button
              type="button"
              onClick={() => setSelectedLead(null)}
              className="rounded-lg p-1.5 text-gray-400 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
              aria-label="Close details"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-5">
            {/* Contact Info */}
            <div className="space-y-2">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact
              </p>
              <p className="text-sm font-medium text-white">
                {selectedLead.name}
              </p>
              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <Phone className="h-3 w-3" />
                {selectedLead.phone}
              </div>
              {selectedLead.email && (
                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                  <Mail className="h-3 w-3" />
                  {selectedLead.email}
                </div>
              )}
              {selectedLead.address && (
                <div className="flex items-start gap-1.5 text-xs text-gray-400">
                  <MapPin className="h-3 w-3 mt-0.5 shrink-0" />
                  {selectedLead.address}
                </div>
              )}
            </div>

            {/* Service Info */}
            <div className="space-y-2">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Service Needed
              </p>
              <p className="text-sm text-gray-300">
                {selectedLead.serviceNeeded}
              </p>
              {selectedLead.description && (
                <p className="text-xs text-gray-400">
                  {selectedLead.description}
                </p>
              )}
              {selectedLead.urgency != null && (
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-gray-500">Urgency:</span>
                  <span
                    className={cn(
                      "text-xs font-medium",
                      selectedLead.urgency >= 8
                        ? "text-red-400"
                        : selectedLead.urgency >= 5
                          ? "text-orange-400"
                          : "text-gray-400"
                    )}
                  >
                    {selectedLead.urgency}/10
                  </span>
                </div>
              )}
            </div>

            {/* Source & Value */}
            <div className="space-y-2">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Source &amp; Value
              </p>
              <span
                className={cn(
                  "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium",
                  SOURCE_STYLES[selectedLead.source]?.className ??
                    "bg-gray-500/15 text-gray-400 border-gray-500/25"
                )}
              >
                {SOURCE_STYLES[selectedLead.source]?.label ?? selectedLead.source}
              </span>
              {selectedLead.estimatedValue != null && (
                <p className="text-sm text-emerald-400 font-medium">
                  {formatCurrency(selectedLead.estimatedValue)}
                </p>
              )}
            </div>

            {/* Timeline */}
            <div className="space-y-2">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Timeline
              </p>
              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <Clock className="h-3 w-3" />
                Created {getRelativeTime(selectedLead.createdAt)}
              </div>
              {selectedLead.followUpDate && (
                <div className="flex items-center gap-1.5 text-xs text-orange-400">
                  <Clock className="h-3 w-3" />
                  Follow up:{" "}
                  {new Date(selectedLead.followUpDate).toLocaleDateString()}
                </div>
              )}
            </div>
          </div>

          {/* Notes */}
          {selectedLead.notes && (
            <div className="border-t border-white/10 px-5 py-3">
              <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                <StickyNote className="h-3 w-3" />
                Notes
              </div>
              <p className="text-sm text-gray-300">{selectedLead.notes}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Helper: mini stat card (reusable inline)                           */
/* ------------------------------------------------------------------ */

function StatMini({
  label,
  value,
  icon,
  iconBg,
  iconText,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  iconBg: string;
  iconText: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4 transition-colors hover:border-white/20 hover:bg-white/[0.07]">
      <div className="flex items-center gap-3 mb-2">
        <span
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-lg shrink-0",
            iconBg,
            iconText
          )}
        >
          {icon}
        </span>
        <span className="text-xs font-medium text-gray-400">{label}</span>
      </div>
      <p className="text-xl font-bold text-white">{value}</p>
    </div>
  );
}

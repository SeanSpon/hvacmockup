"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface JobsDataPoint {
  day: string;
  repair: number;
  maintenance: number;
  install: number;
  emergency: number;
}

interface JobsChartProps {
  data: JobsDataPoint[];
}

/* ------------------------------------------------------------------ */
/*  Color mapping                                                      */
/* ------------------------------------------------------------------ */

const BAR_COLORS = {
  repair: "#3b82f6",
  maintenance: "#22c55e",
  install: "#8b5cf6",
  emergency: "#ef4444",
} as const;

const BAR_LABELS: Record<string, string> = {
  repair: "Repair",
  maintenance: "Maintenance",
  install: "Install",
  emergency: "Emergency",
};

/* ------------------------------------------------------------------ */
/*  Custom Tooltip                                                     */
/* ------------------------------------------------------------------ */

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number; dataKey: string; color: string }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;

  const total = payload.reduce((sum, entry) => sum + entry.value, 0);

  return (
    <div className="rounded-lg border border-white/10 bg-[#0c1526] px-4 py-3 shadow-xl">
      <p className="mb-2 text-xs font-medium text-gray-400">{label}</p>
      {payload.map((entry) => (
        <div key={entry.dataKey} className="flex items-center gap-2 text-sm">
          <span
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-gray-300">
            {BAR_LABELS[entry.dataKey] ?? entry.dataKey}
          </span>
          <span className="ml-auto font-semibold text-white">
            {entry.value}
          </span>
        </div>
      ))}
      <div className="mt-2 border-t border-white/10 pt-2 flex items-center justify-between text-sm">
        <span className="text-gray-400">Total</span>
        <span className="font-semibold text-white">{total}</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function JobsChart({ data }: JobsChartProps) {
  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 8, right: 8, left: -12, bottom: 0 }}
          barCategoryGap="20%"
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.04)"
            vertical={false}
          />
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: "#64748b" }}
            dy={8}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: "#64748b" }}
            allowDecimals={false}
            dx={-4}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "rgba(255,255,255,0.03)" }}
          />
          <Bar
            dataKey="repair"
            stackId="jobs"
            fill={BAR_COLORS.repair}
            radius={[0, 0, 0, 0]}
          />
          <Bar
            dataKey="maintenance"
            stackId="jobs"
            fill={BAR_COLORS.maintenance}
            radius={[0, 0, 0, 0]}
          />
          <Bar
            dataKey="install"
            stackId="jobs"
            fill={BAR_COLORS.install}
            radius={[0, 0, 0, 0]}
          />
          <Bar
            dataKey="emergency"
            stackId="jobs"
            fill={BAR_COLORS.emergency}
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

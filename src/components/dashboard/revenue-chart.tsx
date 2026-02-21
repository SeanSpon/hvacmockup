"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface RevenueDataPoint {
  date: string;
  revenue: number;
  service: number;
  install: number;
}

interface RevenueChartProps {
  data: RevenueDataPoint[];
}

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

  return (
    <div className="rounded-lg border border-white/10 bg-[#0c1526] px-4 py-3 shadow-xl">
      <p className="mb-2 text-xs font-medium text-gray-400">{label}</p>
      {payload.map((entry) => (
        <div key={entry.dataKey} className="flex items-center gap-2 text-sm">
          <span
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-gray-300 capitalize">
            {entry.dataKey === "service" ? "Service" : "Install"}
          </span>
          <span className="ml-auto font-semibold text-white">
            ${entry.value.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function RevenueChart({ data }: RevenueChartProps) {
  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 8, right: 8, left: -12, bottom: 0 }}
        >
          <defs>
            <linearGradient id="serviceGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.35} />
              <stop offset="50%" stopColor="#3b82f6" stopOpacity={0.12} />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="installGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.3} />
              <stop offset="50%" stopColor="#8b5cf6" stopOpacity={0.1} />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.04)"
            vertical={false}
          />
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: "#64748b" }}
            dy={8}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: "#64748b" }}
            tickFormatter={(v: number) =>
              v >= 1000 ? `$${(v / 1000).toFixed(0)}k` : `$${v}`
            }
            dx={-4}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{
              stroke: "rgba(59, 130, 246, 0.15)",
              strokeWidth: 1,
            }}
          />
          <Area
            type="monotone"
            dataKey="install"
            stackId="1"
            stroke="#8b5cf6"
            strokeWidth={2}
            fill="url(#installGradient)"
            dot={false}
            activeDot={{
              r: 4,
              fill: "#8b5cf6",
              stroke: "#0f1729",
              strokeWidth: 2,
            }}
          />
          <Area
            type="monotone"
            dataKey="service"
            stackId="1"
            stroke="#3b82f6"
            strokeWidth={2}
            fill="url(#serviceGradient)"
            dot={false}
            activeDot={{
              r: 4,
              fill: "#3b82f6",
              stroke: "#0f1729",
              strokeWidth: 2,
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

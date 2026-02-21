"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from "recharts";

/* ================================================================== */
/*  Shared tooltip style                                               */
/* ================================================================== */

const TOOLTIP_BG = "#0c1526";
const TOOLTIP_BORDER = "rgba(255,255,255,0.1)";
const GRID_STROKE = "rgba(255,255,255,0.04)";
const AXIS_TICK = { fontSize: 11, fill: "#64748b" };

/* ================================================================== */
/*  1. RevenueOverTimeChart                                            */
/* ================================================================== */

export interface RevenueTimePoint {
  date: string;
  revenue: number;
  service: number;
  install: number;
}

interface RevenueOverTimeChartProps {
  data: RevenueTimePoint[];
}

function RevenueTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number; dataKey: string; color: string }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  const total = payload.reduce((s, e) => s + e.value, 0);
  return (
    <div
      className="rounded-lg border px-4 py-3 shadow-xl"
      style={{
        backgroundColor: TOOLTIP_BG,
        borderColor: TOOLTIP_BORDER,
      }}
    >
      <p className="mb-2 text-xs font-medium text-gray-400">{label}</p>
      {payload.map((entry) => (
        <div key={entry.dataKey} className="flex items-center gap-2 text-sm">
          <span
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="capitalize text-gray-300">
            {entry.dataKey === "service" ? "Service" : "Install"}
          </span>
          <span className="ml-auto font-semibold text-white">
            ${entry.value.toLocaleString()}
          </span>
        </div>
      ))}
      <div className="mt-2 flex items-center justify-between border-t border-white/10 pt-2 text-sm">
        <span className="text-gray-400">Total</span>
        <span className="font-semibold text-white">
          ${total.toLocaleString()}
        </span>
      </div>
    </div>
  );
}

export function RevenueOverTimeChart({ data }: RevenueOverTimeChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
        <defs>
          <linearGradient id="revServiceGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.35} />
            <stop offset="50%" stopColor="#3b82f6" stopOpacity={0.12} />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="revInstallGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.3} />
            <stop offset="50%" stopColor="#8b5cf6" stopOpacity={0.1} />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke={GRID_STROKE}
          vertical={false}
        />
        <XAxis
          dataKey="date"
          axisLine={false}
          tickLine={false}
          tick={AXIS_TICK}
          dy={8}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={AXIS_TICK}
          tickFormatter={(v: number) =>
            v >= 1000 ? `$${(v / 1000).toFixed(0)}k` : `$${v}`
          }
          dx={-4}
        />
        <Tooltip
          content={<RevenueTooltip />}
          cursor={{
            stroke: "rgba(59,130,246,0.15)",
            strokeWidth: 1,
          }}
        />
        <Area
          type="monotone"
          dataKey="install"
          stackId="1"
          stroke="#8b5cf6"
          strokeWidth={2}
          fill="url(#revInstallGrad)"
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
          fill="url(#revServiceGrad)"
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
  );
}

/* ================================================================== */
/*  2. JobsByTypeChart                                                 */
/* ================================================================== */

export interface JobTypePoint {
  type: string;
  count: number;
}

interface JobsByTypeChartProps {
  data: JobTypePoint[];
}

const PIE_COLORS = [
  "#3b82f6",
  "#22c55e",
  "#8b5cf6",
  "#ef4444",
  "#f59e0b",
  "#06b6d4",
  "#ec4899",
  "#f97316",
];

function PieTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    payload: { type: string; count: number };
  }>;
}) {
  if (!active || !payload?.length) return null;
  const item = payload[0];
  return (
    <div
      className="rounded-lg border px-4 py-3 shadow-xl"
      style={{
        backgroundColor: TOOLTIP_BG,
        borderColor: TOOLTIP_BORDER,
      }}
    >
      <p className="text-sm font-medium text-white">{item.payload.type}</p>
      <p className="text-xs text-gray-400">
        {item.value} job{item.value !== 1 ? "s" : ""}
      </p>
    </div>
  );
}

export function JobsByTypeChart({ data }: JobsByTypeChartProps) {
  const total = data.reduce((s, d) => s + d.count, 0);

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className="relative h-[220px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={85}
              paddingAngle={3}
              dataKey="count"
              nameKey="type"
              stroke="none"
            >
              {data.map((_, idx) => (
                <Cell
                  key={idx}
                  fill={PIE_COLORS[idx % PIE_COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip content={<PieTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        {/* Center label */}
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-white">{total}</span>
          <span className="text-[10px] text-gray-500">Total Jobs</span>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1.5">
        {data.map((item, idx) => (
          <div key={item.type} className="flex items-center gap-1.5">
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: PIE_COLORS[idx % PIE_COLORS.length] }}
            />
            <span className="text-[11px] text-gray-400">{item.type}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ================================================================== */
/*  3. LeadSourceChart                                                 */
/* ================================================================== */

export interface LeadSourcePoint {
  source: string;
  count: number;
  value: number;
}

interface LeadSourceChartProps {
  data: LeadSourcePoint[];
}

const LEAD_COLORS = [
  "#3b82f6",
  "#22c55e",
  "#f59e0b",
  "#8b5cf6",
  "#ef4444",
  "#06b6d4",
  "#ec4899",
  "#f97316",
  "#10b981",
];

function LeadTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number; dataKey: string }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="rounded-lg border px-4 py-3 shadow-xl"
      style={{
        backgroundColor: TOOLTIP_BG,
        borderColor: TOOLTIP_BORDER,
      }}
    >
      <p className="mb-1 text-sm font-medium text-white">{label}</p>
      <p className="text-xs text-gray-400">
        {payload[0].value} lead{payload[0].value !== 1 ? "s" : ""}
      </p>
    </div>
  );
}

export function LeadSourceChart({ data }: LeadSourceChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 8, right: 16, left: 0, bottom: 0 }}
        barCategoryGap="25%"
      >
        <CartesianGrid
          strokeDasharray="3 3"
          stroke={GRID_STROKE}
          horizontal={false}
        />
        <XAxis
          type="number"
          axisLine={false}
          tickLine={false}
          tick={AXIS_TICK}
          allowDecimals={false}
        />
        <YAxis
          type="category"
          dataKey="source"
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 11, fill: "#94a3b8" }}
          width={90}
        />
        <Tooltip content={<LeadTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
        <Bar dataKey="count" radius={[0, 6, 6, 0]}>
          {data.map((_, idx) => (
            <Cell
              key={idx}
              fill={LEAD_COLORS[idx % LEAD_COLORS.length]}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

/* ================================================================== */
/*  4. TechPerformanceChart                                            */
/* ================================================================== */

export interface TechPerfPoint {
  name: string;
  jobs: number;
  revenue: number;
  rating: number;
}

interface TechPerformanceChartProps {
  data: TechPerfPoint[];
}

function TechTooltip({
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
    <div
      className="rounded-lg border px-4 py-3 shadow-xl"
      style={{
        backgroundColor: TOOLTIP_BG,
        borderColor: TOOLTIP_BORDER,
      }}
    >
      <p className="mb-2 text-sm font-medium text-white">{label}</p>
      {payload.map((entry) => (
        <div key={entry.dataKey} className="flex items-center gap-2 text-sm">
          <span
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="capitalize text-gray-300">{entry.dataKey}</span>
          <span className="ml-auto font-semibold text-white">
            {entry.dataKey === "revenue"
              ? `$${entry.value.toLocaleString()}`
              : entry.value}
          </span>
        </div>
      ))}
    </div>
  );
}

export function TechPerformanceChart({ data }: TechPerformanceChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{ top: 8, right: 8, left: -12, bottom: 0 }}
        barCategoryGap="30%"
      >
        <CartesianGrid
          strokeDasharray="3 3"
          stroke={GRID_STROKE}
          vertical={false}
        />
        <XAxis
          dataKey="name"
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 10, fill: "#64748b" }}
          dy={8}
        />
        <YAxis
          yAxisId="left"
          axisLine={false}
          tickLine={false}
          tick={AXIS_TICK}
          allowDecimals={false}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          axisLine={false}
          tickLine={false}
          tick={AXIS_TICK}
          tickFormatter={(v: number) =>
            v >= 1000 ? `$${(v / 1000).toFixed(0)}k` : `$${v}`
          }
        />
        <Tooltip content={<TechTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
        <Legend
          verticalAlign="top"
          height={32}
          formatter={(value: string) => (
            <span className="text-xs capitalize text-gray-400">{value}</span>
          )}
        />
        <Bar
          yAxisId="left"
          dataKey="jobs"
          fill="#3b82f6"
          radius={[4, 4, 0, 0]}
        />
        <Bar
          yAxisId="right"
          dataKey="revenue"
          fill="#22c55e"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

/* ================================================================== */
/*  5. ConversionFunnelChart                                           */
/* ================================================================== */

export interface FunnelData {
  calls: number;
  leads: number;
  estimates: number;
  jobs: number;
  installs: number;
}

interface ConversionFunnelChartProps {
  data: FunnelData;
}

const FUNNEL_STEPS = [
  { key: "calls" as const, label: "Inbound Calls", color: "#3b82f6" },
  { key: "leads" as const, label: "Qualified Leads", color: "#06b6d4" },
  { key: "estimates" as const, label: "Estimates Sent", color: "#8b5cf6" },
  { key: "jobs" as const, label: "Jobs Booked", color: "#22c55e" },
  { key: "installs" as const, label: "Installs Closed", color: "#f59e0b" },
];

export function ConversionFunnelChart({ data }: ConversionFunnelChartProps) {
  const maxVal = data.calls || 1;

  return (
    <div className="space-y-3 py-2">
      {FUNNEL_STEPS.map((step, idx) => {
        const value = data[step.key];
        const pct = (value / maxVal) * 100;
        const prevValue =
          idx > 0 ? data[FUNNEL_STEPS[idx - 1].key] : null;
        const convRate = prevValue ? ((value / prevValue) * 100).toFixed(1) : null;

        return (
          <div key={step.key} className="flex items-center gap-4">
            {/* Label */}
            <div className="w-32 shrink-0 text-right">
              <p className="text-sm font-medium text-gray-300">
                {step.label}
              </p>
              {convRate !== null && (
                <p className="text-[10px] text-gray-500">
                  {convRate}% conversion
                </p>
              )}
            </div>

            {/* Bar */}
            <div className="flex-1">
              <div className="relative h-9 w-full overflow-hidden rounded-lg bg-white/[0.03]">
                <div
                  className="flex h-full items-center rounded-lg transition-all duration-500"
                  style={{
                    width: `${Math.max(pct, 4)}%`,
                    backgroundColor: step.color,
                    opacity: 0.85,
                  }}
                >
                  <span className="pl-3 text-xs font-bold text-white">
                    {value.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Percentage of total */}
            <div className="w-14 shrink-0 text-right">
              <span className="text-sm font-semibold text-white">
                {pct.toFixed(0)}%
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

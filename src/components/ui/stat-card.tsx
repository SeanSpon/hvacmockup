"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Props                                                              */
/* ------------------------------------------------------------------ */

export interface StatCardProps {
  /** Lucide icon component or any ReactNode */
  icon: React.ReactNode;
  /** Background color class applied to the icon container, e.g. "bg-blue-500/15" */
  iconColor?: string;
  /** Text color class for the icon, e.g. "text-blue-400" */
  iconTextColor?: string;
  /** Short label above the value */
  label: string;
  /** The main displayed value (e.g. "$12,450" or "87") */
  value: string | number;
  /** Trend percentage -- positive values render as "up", negative as "down" */
  trend?: number;
  /** Override automatic trend direction */
  trendDirection?: "up" | "down";
  /** Extra description shown beside the trend */
  trendLabel?: string;
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

function StatCard({
  icon,
  iconColor = "bg-blue-500/15",
  iconTextColor = "text-blue-400",
  label,
  value,
  trend,
  trendDirection,
  trendLabel = "vs last month",
  className,
}: StatCardProps) {
  const direction =
    trendDirection ?? (trend !== undefined ? (trend >= 0 ? "up" : "down") : undefined);
  const isPositive = direction === "up";
  const absTrend = trend !== undefined ? Math.abs(trend) : undefined;

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={cn(
        "group relative rounded-xl border border-white/10",
        "bg-white/5 backdrop-blur-sm",
        "p-5 transition-colors duration-200",
        "hover:border-white/20 hover:bg-white/[0.07]",
        className
      )}
    >
      {/* Header: icon + label */}
      <div className="flex items-center gap-3 mb-3">
        <span
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-lg shrink-0",
            iconColor,
            iconTextColor
          )}
          aria-hidden="true"
        >
          {icon}
        </span>
        <span className="text-sm font-medium text-gray-400 truncate">{label}</span>
      </div>

      {/* Value */}
      <p className="text-2xl font-bold text-white tracking-tight">{value}</p>

      {/* Trend */}
      {absTrend !== undefined && direction && (
        <div className="mt-2 flex items-center gap-1.5 text-xs">
          {isPositive ? (
            <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
          ) : (
            <TrendingDown className="h-3.5 w-3.5 text-red-400" />
          )}
          <span
            className={cn(
              "font-semibold",
              isPositive ? "text-emerald-400" : "text-red-400"
            )}
          >
            {absTrend}%
          </span>
          {trendLabel && (
            <span className="text-gray-500">{trendLabel}</span>
          )}
        </div>
      )}
    </motion.div>
  );
}

export { StatCard };

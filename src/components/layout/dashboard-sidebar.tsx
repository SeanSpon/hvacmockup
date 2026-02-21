"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Calendar,
  Wrench,
  Users,
  Target,
  Building2,
  BarChart3,
  Crown,
  HardHat,
  Settings,
  ChevronLeft,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/dispatch", label: "Dispatch", icon: Calendar },
  { href: "/dashboard/jobs", label: "Jobs", icon: Wrench },
  { href: "/dashboard/technicians", label: "Technicians", icon: Users },
  { href: "/dashboard/leads", label: "Leads", icon: Target },
  { href: "/dashboard/customers", label: "Customers", icon: Building2 },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/dashboard/memberships", label: "Memberships", icon: Crown },
  { href: "/dashboard/installs", label: "Installs", icon: HardHat },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export default function DashboardSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  return (
    <aside
      className={cn(
        "relative flex h-screen flex-col border-r border-white/5 bg-[#0b1120] transition-all duration-300",
        collapsed ? "w-[68px]" : "w-60"
      )}
    >
      {/* Logo area */}
      <div className="flex h-16 shrink-0 items-center border-b border-white/5 px-4">
        <Link href="/dashboard" className="flex items-center gap-2.5 overflow-hidden">
          <Image src="/images/logo.webp" alt="FDP" width={32} height={32} className="h-8 w-auto shrink-0" />
          <span
            className={cn(
              "bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-lg font-extrabold tracking-tight text-transparent transition-opacity duration-200",
              collapsed ? "pointer-events-none opacity-0" : "opacity-100"
            )}
          >
            FDP
          </span>
        </Link>
      </div>

      {/* Nav items */}
      <nav
        className="flex-1 overflow-y-auto px-2 py-3"
        role="navigation"
        aria-label="Dashboard navigation"
      >
        <ul className="space-y-0.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  title={collapsed ? item.label : undefined}
                  className={cn(
                    "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    active
                      ? "bg-blue-500/10 text-blue-400"
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                  )}
                >
                  <Icon
                    className={cn(
                      "h-[18px] w-[18px] shrink-0",
                      active
                        ? "text-blue-400"
                        : "text-slate-500 group-hover:text-slate-300"
                    )}
                  />
                  <span
                    className={cn(
                      "truncate transition-opacity duration-200",
                      collapsed
                        ? "pointer-events-none w-0 opacity-0"
                        : "opacity-100"
                    )}
                  >
                    {item.label}
                  </span>
                  {active && (
                    <span
                      className={cn(
                        "ml-auto h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400",
                        collapsed && "hidden"
                      )}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Collapse toggle */}
      <button
        type="button"
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 z-10 flex h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-[#0b1120] text-slate-400 shadow-md transition-colors hover:bg-white/5 hover:text-white"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        <ChevronLeft
          className={cn(
            "h-3 w-3 transition-transform duration-300",
            collapsed && "rotate-180"
          )}
        />
      </button>

      {/* User info at bottom */}
      <div className="shrink-0 border-t border-white/5 p-3">
        <div className="flex items-center gap-3 overflow-hidden rounded-lg px-2 py-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 text-xs font-bold text-white">
            SP
          </div>
          <div
            className={cn(
              "min-w-0 flex-1 transition-opacity duration-200",
              collapsed ? "pointer-events-none opacity-0" : "opacity-100"
            )}
          >
            <p className="truncate text-sm font-medium text-white">
              Sean Pierce
            </p>
            <p className="truncate text-xs text-slate-500">Administrator</p>
          </div>
          <button
            type="button"
            className={cn(
              "shrink-0 text-slate-500 transition-colors hover:text-red-400",
              collapsed && "hidden"
            )}
            aria-label="Sign out"
            title="Sign out"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}

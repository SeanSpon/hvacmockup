"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, Bell, Menu, LogOut } from "lucide-react";
import DashboardSidebar from "@/components/layout/dashboard-sidebar";
import { cn } from "@/lib/utils";

interface DemoUser {
  name: string;
  email: string;
  role: string;
}

function getAuthCookie(): DemoUser | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/fdp-demo-auth=([^;]+)/);
  if (!match) return null;
  try {
    return JSON.parse(decodeURIComponent(match[1]));
  } catch {
    return null;
  }
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<DemoUser | null>(null);
  const [checking, setChecking] = useState(true);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    const authUser = getAuthCookie();
    if (!authUser) {
      router.replace("/auth/login");
      return;
    }
    setUser(authUser);
    setChecking(false);
  }, [router]);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/auth/login");
  }

  if (checking || !user) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#0a1628]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-500/30 border-t-blue-500" />
      </div>
    );
  }

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="flex h-screen overflow-hidden bg-[#0a1628]">
      {/* Mobile sidebar overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden",
          sidebarOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        )}
        onClick={() => setSidebarOpen(false)}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 transition-transform duration-300 lg:static lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <DashboardSidebar />
      </div>

      {/* Main content area */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top bar */}
        <header className="flex h-16 shrink-0 items-center gap-4 border-b border-white/5 bg-[#0b1120]/50 px-4 backdrop-blur-sm sm:px-6">
          {/* Mobile hamburger */}
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-white/5 hover:text-white lg:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle sidebar"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Search bar */}
          <div className="flex flex-1 items-center">
            <div className="relative w-full max-w-md">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <label htmlFor="dashboard-search" className="sr-only">
                Search dashboard
              </label>
              <input
                id="dashboard-search"
                type="search"
                placeholder="Search jobs, customers, techs..."
                className="h-9 w-full rounded-lg border border-white/10 bg-white/5 pl-10 pr-4 text-sm text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Logged in as */}
            <span className="hidden text-xs text-slate-500 sm:block">
              {user.name}
            </span>

            {/* Notifications */}
            <button
              type="button"
              className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
              aria-label="Notifications"
            >
              <Bell className="h-[18px] w-[18px]" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-[#0b1120]" />
            </button>

            {/* User avatar + dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 text-xs font-bold text-white transition-shadow hover:ring-2 hover:ring-blue-400/30"
                aria-label="User menu"
              >
                {initials}
              </button>

              {showUserMenu && (
                <>
                  <div
                    className="fixed inset-0 z-50"
                    onClick={() => setShowUserMenu(false)}
                  />
                  <div className="absolute right-0 top-full z-50 mt-2 w-56 rounded-xl border border-white/10 bg-[#0f1729] p-1 shadow-2xl shadow-black/40">
                    <div className="px-3 py-2.5 border-b border-white/5 mb-1">
                      <p className="text-sm font-medium text-white">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                      <span className="mt-1 inline-block rounded-full bg-blue-500/10 px-2 py-0.5 text-[10px] font-medium text-blue-400">
                        {user.role}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-400 transition-colors hover:bg-red-500/10"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}

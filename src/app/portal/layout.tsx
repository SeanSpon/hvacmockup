"use client";

import { Snowflake, LogOut, Bell } from "lucide-react";

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0a1628]">
      {/* Portal Nav Bar */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#060e1e]/95 backdrop-blur-lg">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3 sm:px-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Snowflake className="h-5 w-5 text-blue-400" />
            <span className="text-sm font-bold text-white sm:text-base">
              FD Pierce
            </span>
            <span className="hidden text-xs text-gray-500 sm:inline">
              Customer Portal
            </span>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="relative rounded-lg p-2 text-gray-400 transition-colors hover:bg-white/5 hover:text-white"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-blue-500" />
            </button>
            <div className="hidden items-center gap-2 sm:flex">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/20 text-xs font-semibold text-blue-400">
                JR
              </div>
              <span className="text-sm font-medium text-white">
                James Reynolds
              </span>
            </div>
            <button
              type="button"
              className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium text-gray-400 transition-colors hover:bg-white/5 hover:text-white"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Log out</span>
            </button>
          </div>
        </div>
      </header>

      {children}
    </div>
  );
}

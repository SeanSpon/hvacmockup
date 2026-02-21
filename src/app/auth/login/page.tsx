"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";
import {
  Mail,
  Lock,
  ArrowRight,
  Eye,
  EyeOff,
  Copy,
  CheckCircle2,
  Shield,
  Wrench,
} from "lucide-react";

const DEMO_ACCOUNTS = [
  {
    label: "Admin / Owner",
    description: "Full dashboard access",
    email: "sarah.mann@fdpierce.com",
    password: "admin123",
    icon: Shield,
    gradient: "from-blue-500 to-cyan-400",
    ring: "ring-blue-500/30",
  },
  {
    label: "Technician",
    description: "Tech mobile view",
    email: "tech@fdpierce.com",
    password: "tech123",
    icon: Wrench,
    gradient: "from-orange-500 to-amber-400",
    ring: "ring-orange-500/30",
  },
];

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  function fillCredentials(acctEmail: string, acctPassword: string) {
    setEmail(acctEmail);
    setPassword(acctPassword);
    setError("");
  }

  async function copyToClipboard(text: string, fieldKey: string) {
    await navigator.clipboard.writeText(text);
    setCopiedField(fieldKey);
    setTimeout(() => setCopiedField(null), 1500);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Login failed");
        setIsLoading(false);
        return;
      }

      const user = await res.json();

      if (user.role === "TECHNICIAN") {
        router.push("/tech");
      } else {
        router.push("/dashboard");
      }
    } catch {
      setError("Something went wrong");
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0a1628] px-4">
      {/* Background gradient effects */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-blue-600/5 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Demo Banner */}
        <div className="mb-4 rounded-xl border border-amber-500/20 bg-amber-500/5 px-4 py-3 backdrop-blur-sm">
          <p className="text-center text-sm font-medium text-amber-400">
            Demo Mode &mdash; Use the credentials below to explore
          </p>
        </div>

        {/* Demo Credential Cards */}
        <div className="mb-4 grid grid-cols-2 gap-3">
          {DEMO_ACCOUNTS.map((acct) => {
            const Icon = acct.icon;
            return (
              <button
                key={acct.email}
                type="button"
                onClick={() => fillCredentials(acct.email, acct.password)}
                className={cn(
                  "group relative rounded-xl border border-white/10 bg-[#0f1729] p-4 text-left transition-all duration-200",
                  "hover:border-white/20 hover:bg-[#131d35] hover:shadow-lg hover:shadow-blue-500/5",
                  email === acct.email &&
                    "border-blue-500/40 bg-blue-500/5 ring-2 " + acct.ring
                )}
              >
                <div
                  className={cn(
                    "mb-2 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br text-white",
                    acct.gradient
                  )}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <p className="text-sm font-semibold text-white">{acct.label}</p>
                <p className="mt-0.5 text-xs text-gray-500">
                  {acct.description}
                </p>

                {/* Credential details */}
                <div className="mt-3 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <code className="text-[10px] text-gray-400 truncate max-w-[120px]">
                      {acct.email}
                    </code>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        copyToClipboard(acct.email, `${acct.email}-email`);
                      }}
                      className="ml-1 text-gray-600 hover:text-blue-400 transition-colors"
                      aria-label="Copy email"
                    >
                      {copiedField === `${acct.email}-email` ? (
                        <CheckCircle2 className="h-3 w-3 text-green-400" />
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <code className="text-[10px] text-gray-400">
                      {acct.password}
                    </code>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        copyToClipboard(
                          acct.password,
                          `${acct.email}-password`
                        );
                      }}
                      className="ml-1 text-gray-600 hover:text-blue-400 transition-colors"
                      aria-label="Copy password"
                    >
                      {copiedField === `${acct.email}-password` ? (
                        <CheckCircle2 className="h-3 w-3 text-green-400" />
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Selected indicator */}
                {email === acct.email && (
                  <div className="absolute right-2 top-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-400" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Login Card */}
        <div className="rounded-2xl border border-white/10 bg-[#0f1729] p-8 shadow-2xl shadow-black/20">
          {/* Logo */}
          <div className="mb-6 flex flex-col items-center">
            <Image
              src="/images/logo.webp"
              alt="FD Pierce Company"
              width={56}
              height={56}
              className="h-14 w-auto"
            />
            <h1 className="mt-4 text-xl font-bold text-white">
              FD Pierce Company
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Sign in to your account
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-4 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-2.5 text-center text-sm text-red-400">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-gray-300"
              >
                Email
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <Mail className="h-4 w-4" />
                </span>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  required
                  autoComplete="email"
                  className="h-11 w-full rounded-lg border border-white/10 bg-white/5 pl-10 pr-3 text-sm text-white placeholder:text-gray-500 transition-colors focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-medium text-gray-300"
              >
                Password
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <Lock className="h-4 w-4" />
                </span>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  autoComplete="current-password"
                  className="h-11 w-full rounded-lg border border-white/10 bg-white/5 pl-10 pr-10 text-sm text-white placeholder:text-gray-500 transition-colors focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 transition-colors hover:text-gray-300"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Sign In button */}
            <button
              type="submit"
              disabled={isLoading}
              className={cn(
                "flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all",
                "hover:from-blue-500 hover:to-blue-400 hover:shadow-blue-500/40",
                "active:from-blue-700 active:to-blue-600",
                "disabled:opacity-60 disabled:cursor-not-allowed"
              )}
            >
              {isLoading ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          {/* Hint */}
          <p className="mt-4 text-center text-xs text-gray-600">
            Click a card above to auto-fill credentials, then sign in
          </p>
        </div>

        {/* Bottom tagline */}
        <p className="mt-6 text-center text-xs text-gray-600">
          Keeping it Cool &mdash; Louisville&apos;s Premier HVAC Service
        </p>
      </div>
    </div>
  );
}

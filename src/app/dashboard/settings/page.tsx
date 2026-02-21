"use client";

import { cn } from "@/lib/utils";
import {
  Building2,
  Phone,
  Mail,
  Globe,
  MapPin,
  Clock,
  Upload,
  Bell,
  MessageSquare,
  BarChart3,
  FileText,
  CheckCircle2,
  Zap,
  CreditCard,
  Map,
  Activity,
  Link2,
  Users,
  Shield,
  Save,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */

export default function SettingsPage() {
  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="mt-1 text-sm text-gray-400">
          Manage your company profile, notifications, and integrations
        </p>
      </div>

      {/* Section 1: Company Profile */}
      <section className="rounded-xl border border-white/10 bg-[#0f1729] p-6">
        <div className="mb-6 flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/15 text-blue-400">
            <Building2 className="h-5 w-5" />
          </span>
          <div>
            <h2 className="text-lg font-semibold text-white">
              Company Profile
            </h2>
            <p className="text-sm text-gray-400">
              Basic information about your business
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <SettingsInput
            label="Company Name"
            icon={<Building2 className="h-4 w-4" />}
            defaultValue="FD Pierce Company"
          />
          <SettingsInput
            label="Phone"
            icon={<Phone className="h-4 w-4" />}
            defaultValue="(555) 234-5678"
            type="tel"
          />
          <SettingsInput
            label="Email"
            icon={<Mail className="h-4 w-4" />}
            defaultValue="info@fdpierce.com"
            type="email"
          />
          <SettingsInput
            label="Website"
            icon={<Globe className="h-4 w-4" />}
            defaultValue="https://fdpierce.com"
            type="url"
          />
          <div className="sm:col-span-2">
            <SettingsInput
              label="Address"
              icon={<MapPin className="h-4 w-4" />}
              defaultValue="1234 Industrial Pkwy, Suite 100, Dallas, TX 75201"
            />
          </div>
        </div>

        {/* Business Hours */}
        <div className="mt-6">
          <div className="mb-3 flex items-center gap-2 text-sm font-medium text-gray-300">
            <Clock className="h-4 w-4 text-gray-500" />
            Business Hours
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {BUSINESS_HOURS.map((day) => (
              <div
                key={day.day}
                className="flex items-center justify-between rounded-lg bg-white/5 border border-white/5 px-3 py-2"
              >
                <span className="text-sm text-gray-300">{day.day}</span>
                <span
                  className={cn(
                    "text-sm",
                    day.closed ? "text-gray-600" : "text-white font-medium"
                  )}
                >
                  {day.closed ? "Closed" : day.hours}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Logo Upload */}
        <div className="mt-6">
          <p className="mb-2 text-sm font-medium text-gray-300">
            Company Logo
          </p>
          <div className="flex h-32 items-center justify-center rounded-lg border-2 border-dashed border-white/10 bg-white/[0.02] transition-colors hover:border-white/20 hover:bg-white/[0.04]">
            <div className="text-center">
              <Upload className="mx-auto mb-2 h-8 w-8 text-gray-500" />
              <p className="text-sm text-gray-400">
                Drag and drop or{" "}
                <span className="font-medium text-blue-400 cursor-pointer">
                  browse
                </span>
              </p>
              <p className="mt-0.5 text-xs text-gray-600">
                PNG, JPG up to 2MB
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Notification Preferences */}
      <section className="rounded-xl border border-white/10 bg-[#0f1729] p-6">
        <div className="mb-6 flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/15 text-amber-400">
            <Bell className="h-5 w-5" />
          </span>
          <div>
            <h2 className="text-lg font-semibold text-white">
              Notification Preferences
            </h2>
            <p className="text-sm text-gray-400">
              Choose how and when you get notified
            </p>
          </div>
        </div>

        <div className="space-y-1">
          <Toggle
            id="email-new-leads"
            icon={<Mail className="h-4 w-4" />}
            label="Email notifications for new leads"
            description="Receive an email when a new lead comes in"
            defaultChecked
          />
          <Toggle
            id="sms-emergency"
            icon={<MessageSquare className="h-4 w-4" />}
            label="SMS alerts for emergencies"
            description="Get text messages for emergency service requests"
            defaultChecked
          />
          <Toggle
            id="daily-summary"
            icon={<FileText className="h-4 w-4" />}
            label="Daily summary email"
            description="A daily digest of jobs, leads, and revenue"
            defaultChecked={false}
          />
          <Toggle
            id="weekly-report"
            icon={<BarChart3 className="h-4 w-4" />}
            label="Weekly report email"
            description="Weekly analytics and performance summary"
            defaultChecked
          />
          <Toggle
            id="job-completion"
            icon={<CheckCircle2 className="h-4 w-4" />}
            label="Job completion alerts"
            description="Notified when a technician completes a job"
            defaultChecked
          />
          <Toggle
            id="payment-received"
            icon={<CreditCard className="h-4 w-4" />}
            label="Payment received alerts"
            description="Notified when a customer payment is processed"
            defaultChecked={false}
          />
        </div>
      </section>

      {/* Section 3: Integrations */}
      <section className="rounded-xl border border-white/10 bg-[#0f1729] p-6">
        <div className="mb-6 flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/15 text-violet-400">
            <Link2 className="h-5 w-5" />
          </span>
          <div>
            <h2 className="text-lg font-semibold text-white">Integrations</h2>
            <p className="text-sm text-gray-400">
              Connect third-party services to enhance your workflow
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {INTEGRATIONS.map((integration) => (
            <div
              key={integration.name}
              className="rounded-lg border border-white/5 bg-white/[0.02] p-4 transition-colors hover:border-white/10 hover:bg-white/[0.04]"
            >
              <div className="mb-3 flex items-center gap-3">
                <span
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-lg",
                    integration.iconBg,
                    integration.iconColor
                  )}
                >
                  {integration.icon}
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {integration.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {integration.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-xs text-gray-500">
                  <span className="h-1.5 w-1.5 rounded-full bg-gray-600" />
                  Not Connected
                </span>
                <button
                  type="button"
                  className="rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
                >
                  Connect
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4: Team Management */}
      <section className="rounded-xl border border-white/10 bg-[#0f1729] p-6">
        <div className="mb-6 flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-400">
            <Users className="h-5 w-5" />
          </span>
          <div>
            <h2 className="text-lg font-semibold text-white">
              Team Management
            </h2>
            <p className="text-sm text-gray-400">
              Manage your team members and their roles
            </p>
          </div>
        </div>

        <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <RoleStat role="Admins" count={2} icon={<Shield className="h-4 w-4" />} color="text-red-400" bgColor="bg-red-500/15" />
          <RoleStat role="Dispatchers" count={3} icon={<Phone className="h-4 w-4" />} color="text-blue-400" bgColor="bg-blue-500/15" />
          <RoleStat role="Technicians" count={8} icon={<Zap className="h-4 w-4" />} color="text-amber-400" bgColor="bg-amber-500/15" />
          <RoleStat role="Customers" count={142} icon={<Users className="h-4 w-4" />} color="text-emerald-400" bgColor="bg-emerald-500/15" />
        </div>

        <button
          type="button"
          className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
        >
          Manage Users
        </button>
      </section>

      {/* Save Button */}
      <div className="flex justify-end pb-6">
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-2.5 text-sm font-medium text-white shadow-lg shadow-blue-500/25 transition-all hover:from-blue-500 hover:to-blue-400 hover:shadow-blue-500/40"
        >
          <Save className="h-4 w-4" />
          Save Changes
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function SettingsInput({
  label,
  icon,
  defaultValue,
  type = "text",
}: {
  label: string;
  icon: React.ReactNode;
  defaultValue: string;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-gray-300">
        {label}
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
          {icon}
        </span>
        <input
          type={type}
          defaultValue={defaultValue}
          className="w-full rounded-lg border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-gray-500 transition-colors focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
        />
      </div>
    </div>
  );
}

function Toggle({
  id,
  icon,
  label,
  description,
  defaultChecked = false,
}: {
  id: string;
  icon: React.ReactNode;
  label: string;
  description: string;
  defaultChecked?: boolean;
}) {
  return (
    <label
      htmlFor={id}
      className="flex cursor-pointer items-center justify-between gap-4 rounded-lg px-3 py-3 transition-colors hover:bg-white/[0.02]"
    >
      <div className="flex items-center gap-3">
        <span className="text-gray-500">{icon}</span>
        <div>
          <p className="text-sm font-medium text-gray-200">{label}</p>
          <p className="text-xs text-gray-500">{description}</p>
        </div>
      </div>
      {/* Toggle switch using peer checkbox trick */}
      <div className="relative shrink-0">
        <input
          type="checkbox"
          id={id}
          defaultChecked={defaultChecked}
          className="peer sr-only"
        />
        <div className="h-6 w-11 rounded-full bg-white/10 transition-colors peer-checked:bg-blue-600 peer-focus-visible:ring-2 peer-focus-visible:ring-blue-500/50 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-[#0f1729]" />
        <div className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-gray-400 shadow transition-all peer-checked:translate-x-5 peer-checked:bg-white" />
      </div>
    </label>
  );
}

function RoleStat({
  role,
  count,
  icon,
  color,
  bgColor,
}: {
  role: string;
  count: number;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
}) {
  return (
    <div className="rounded-lg bg-white/[0.03] border border-white/5 p-3 text-center">
      <span
        className={cn(
          "mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-lg",
          bgColor,
          color
        )}
      >
        {icon}
      </span>
      <p className="text-lg font-bold text-white">{count}</p>
      <p className="text-xs text-gray-500">{role}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Static data                                                        */
/* ------------------------------------------------------------------ */

const BUSINESS_HOURS = [
  { day: "Monday", hours: "7:00 AM - 6:00 PM", closed: false },
  { day: "Tuesday", hours: "7:00 AM - 6:00 PM", closed: false },
  { day: "Wednesday", hours: "7:00 AM - 6:00 PM", closed: false },
  { day: "Thursday", hours: "7:00 AM - 6:00 PM", closed: false },
  { day: "Friday", hours: "7:00 AM - 5:00 PM", closed: false },
  { day: "Saturday", hours: "8:00 AM - 12:00 PM", closed: false },
  { day: "Sunday", hours: "", closed: true },
];

const INTEGRATIONS = [
  {
    name: "Google Maps API",
    description: "Routing & geocoding",
    icon: <Map className="h-5 w-5" />,
    iconBg: "bg-emerald-500/15",
    iconColor: "text-emerald-400",
  },
  {
    name: "Twilio SMS",
    description: "Text messaging",
    icon: <MessageSquare className="h-5 w-5" />,
    iconBg: "bg-red-500/15",
    iconColor: "text-red-400",
  },
  {
    name: "Stripe Payments",
    description: "Payment processing",
    icon: <CreditCard className="h-5 w-5" />,
    iconBg: "bg-violet-500/15",
    iconColor: "text-violet-400",
  },
  {
    name: "QuickBooks",
    description: "Accounting sync",
    icon: <BarChart3 className="h-5 w-5" />,
    iconBg: "bg-green-500/15",
    iconColor: "text-green-400",
  },
  {
    name: "Google Analytics",
    description: "Web analytics",
    icon: <Activity className="h-5 w-5" />,
    iconBg: "bg-orange-500/15",
    iconColor: "text-orange-400",
  },
];

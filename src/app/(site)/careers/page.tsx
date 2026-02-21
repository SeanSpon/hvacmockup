"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Briefcase,
  CheckCircle2,
  ArrowRight,
  Phone,
  MapPin,
  DollarSign,
  GraduationCap,
  Heart,
  Truck,
  Wrench,
  Shield,
  Users,
  Clock,
  TrendingUp,
  Award,
  Zap,
} from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" as const },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

const whyWork = [
  {
    icon: DollarSign,
    title: "Competitive Pay",
    description:
      "We offer above-market wages because we want to attract and retain the best technicians in the Louisville area. Your skills are valuable and we compensate accordingly.",
  },
  {
    icon: Heart,
    title: "Comprehensive Benefits",
    description:
      "Full health insurance, dental, vision, 401(k) with company match, paid time off, and paid holidays. We invest in your well-being, not just your work.",
  },
  {
    icon: GraduationCap,
    title: "Ongoing Training",
    description:
      "Paid factory training, certification programs, and continuing education. We help you grow your skills and advance your career every year.",
  },
  {
    icon: TrendingUp,
    title: "Career Growth",
    description:
      "Clear advancement paths from apprentice to lead tech to management. We promote from within and invest in developing future leaders.",
  },
];

const openings = [
  {
    title: "Commercial HVAC Technician",
    type: "Full-time",
    experience: "3+ years",
    description:
      "Join our team as a commercial HVAC service technician responsible for diagnosing, repairing, and maintaining commercial heating and cooling systems across the Louisville metro area. You will work on a variety of equipment in diverse commercial settings, from office buildings to restaurants to warehouses.",
    requirements: [
      "Minimum 3 years commercial HVAC experience",
      "EPA Section 608 Universal Certification",
      "Valid Kentucky driver's license with clean record",
      "Ability to lift 50+ pounds and work in confined spaces",
      "Strong diagnostic and troubleshooting skills",
      "Excellent customer communication abilities",
      "NATE certification preferred",
    ],
    benefits: [
      "$25-40/hour based on experience",
      "Company service vehicle and fuel card",
      "Tool allowance up to $1,500/year",
      "Overtime opportunities available",
    ],
  },
  {
    title: "Refrigeration Technician",
    type: "Full-time",
    experience: "2+ years",
    description:
      "We are looking for an experienced refrigeration technician to service and repair commercial refrigeration equipment including walk-in coolers, freezers, display cases, and ice machines. This role requires expertise in commercial refrigeration systems and the ability to work independently on service calls.",
    requirements: [
      "Minimum 2 years commercial refrigeration experience",
      "EPA Section 608 Universal Certification",
      "Experience with walk-in coolers/freezers and display cases",
      "Valid Kentucky driver's license with clean record",
      "Knowledge of refrigerant handling and leak detection",
      "Ability to read electrical schematics",
      "Ice machine experience is a plus",
    ],
    benefits: [
      "$24-38/hour based on experience",
      "Company service vehicle and fuel card",
      "Tool allowance up to $1,500/year",
      "Manufacturer training opportunities",
    ],
  },
  {
    title: "HVAC Apprentice",
    type: "Full-time",
    experience: "Entry Level",
    description:
      "Start your career in commercial HVAC with our structured apprenticeship program. You will learn from experienced technicians in the field while earning a competitive wage. We provide all necessary training and help you earn your certifications over the first two years. This is an outstanding opportunity for motivated individuals looking to build a skilled trade career.",
    requirements: [
      "High school diploma or GED required",
      "Valid Kentucky driver's license",
      "Strong mechanical aptitude and eagerness to learn",
      "Ability to work physically demanding tasks",
      "Reliable transportation and punctual attendance",
      "Basic hand tool knowledge",
      "HVAC trade school coursework is a plus but not required",
    ],
    benefits: [
      "$16-20/hour to start, with structured raises",
      "All training and certification costs paid by company",
      "Paired with experienced mentor technician",
      "Clear path to full technician role within 2-3 years",
    ],
  },
  {
    title: "Service Dispatcher",
    type: "Full-time",
    experience: "1+ year",
    description:
      "Coordinate our team of 16 technicians and ensure every service call is handled efficiently and professionally. As our dispatcher, you are the critical link between our customers and our field team. You will manage scheduling, handle incoming service requests, and keep operations running smoothly throughout the day.",
    requirements: [
      "Minimum 1 year dispatching or scheduling experience",
      "Excellent phone manner and customer service skills",
      "Proficiency with scheduling software and basic computer skills",
      "Ability to multitask and prioritize under pressure",
      "Strong organizational and problem-solving abilities",
      "HVAC industry knowledge preferred but not required",
      "Comfortable making quick decisions about scheduling priorities",
    ],
    benefits: [
      "$18-24/hour based on experience",
      "Monday-Friday schedule (8:00 AM - 4:30 PM)",
      "Office-based position with climate-controlled workspace",
      "Opportunity to learn the HVAC industry from the inside",
    ],
  },
];

const benefitsList = [
  { icon: Heart, label: "Health, Dental & Vision Insurance" },
  { icon: DollarSign, label: "401(k) with Company Match" },
  { icon: GraduationCap, label: "Paid Training & Certifications" },
  { icon: Truck, label: "Company Vehicle (Technicians)" },
  { icon: Wrench, label: "Annual Tool Allowance" },
  { icon: Clock, label: "Paid Time Off & Holidays" },
  { icon: Shield, label: "Life & Disability Insurance" },
  { icon: Zap, label: "Overtime Opportunities" },
];

export default function CareersPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0a1628] via-[#142548] to-[#0a1628] py-24 sm:py-32">
        <div className="absolute inset-0 opacity-[0.07]">
          <Image src="/images/team-photo.jpg" alt="FD Pierce Team" fill className="object-cover" />
        </div>
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute left-1/3 top-1/4 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 h-64 w-64 rounded-full bg-accent-500/5 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div {...fadeInUp} className="text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-400">
              <Briefcase className="h-4 w-4" />
              We Are Hiring
            </div>
            <h1 className="heading-hero bg-gradient-to-b from-white to-slate-300 bg-clip-text text-transparent">
              Join Our Team
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
              Build your career with one of Louisville's most respected HVAC
              companies. Competitive pay, great benefits, and a team that
              treats you like family.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Work at FD Pierce */}
      <section className="relative border-b border-white/5 bg-[#0a1628] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div {...fadeInUp} className="text-center">
            <h2 className="heading-section text-white">
              Why Work at FD Pierce?
            </h2>
            <div className="mx-auto mt-4 divider-accent" />
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
              We have been building a great workplace for 47 years. Here is what
              makes FD Pierce Company different from other HVAC employers.
            </p>
          </motion.div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2">
            {whyWork.map((reason, index) => {
              const Icon = reason.icon;
              return (
                <motion.div
                  key={reason.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass-card flex gap-5 rounded-2xl p-7"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/10 ring-1 ring-blue-500/20">
                    <Icon className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {reason.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">
                      {reason.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Current Openings */}
      <section className="relative border-b border-white/5 bg-[#0c1a30] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div {...fadeInUp} className="text-center">
            <h2 className="heading-section text-white">
              Current Openings
            </h2>
            <div className="mx-auto mt-4 divider-accent" />
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
              We are growing and looking for talented individuals to join our
              team. See if one of these positions is right for you.
            </p>
          </motion.div>

          <div className="mt-16 space-y-8">
            {openings.map((job, index) => (
              <motion.div
                key={job.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card overflow-hidden rounded-2xl"
              >
                {/* Job Header */}
                <div className="border-b border-white/5 bg-white/[0.02] px-8 py-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        {job.title}
                      </h3>
                      <div className="mt-2 flex flex-wrap items-center gap-3">
                        <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400">
                          {job.type}
                        </span>
                        <span className="rounded-full bg-accent-500/10 px-3 py-1 text-xs font-medium text-accent-400">
                          {job.experience}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-slate-500">
                          <MapPin className="h-3 w-3" />
                          Louisville, KY
                        </span>
                      </div>
                    </div>
                    <Link
                      href="/contact"
                      className="btn-accent inline-flex shrink-0 items-center gap-2 text-sm"
                    >
                      <span>Apply Now</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>

                {/* Job Body */}
                <div className="px-8 py-6">
                  <p className="text-sm leading-relaxed text-slate-400">
                    {job.description}
                  </p>

                  <div className="mt-6 grid gap-8 lg:grid-cols-2">
                    {/* Requirements */}
                    <div>
                      <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-300">
                        Requirements
                      </h4>
                      <ul className="space-y-2.5">
                        {job.requirements.map((req) => (
                          <li
                            key={req}
                            className="flex items-start gap-2.5 text-sm text-slate-400"
                          >
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Compensation Highlights */}
                    <div>
                      <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-300">
                        Compensation Highlights
                      </h4>
                      <ul className="space-y-2.5">
                        {job.benefits.map((benefit) => (
                          <li
                            key={benefit}
                            className="flex items-start gap-2.5 text-sm text-slate-400"
                          >
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent-400" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="relative border-b border-white/5 bg-[#0a1628] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
            <motion.div {...fadeInUp}>
              <h2 className="heading-section text-white">
                Our Culture
              </h2>
              <div className="divider-accent mt-4" />
              <p className="mt-6 text-lg leading-relaxed text-slate-400">
                At FD Pierce Company, we believe that a great workplace produces
                great work. Our culture is built on mutual respect, teamwork,
                and a shared commitment to excellence. We are small enough that
                everyone knows each other by name, but large enough to handle
                any commercial HVAC challenge.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-slate-400">
                We work hard, but we also take care of each other. When one
                technician needs help on a tough job, the whole team rallies.
                When someone earns a new certification, we celebrate together.
                That is the FD Pierce way, and it has been for 47 years.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-slate-400">
                Under the leadership of co-owner Sarah Mann, we are investing
                in modern tools, better training, and a work-life balance that
                helps our team members thrive both on and off the job.
              </p>
            </motion.div>

            <motion.div
              {...fadeInUp}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="glass-card rounded-2xl p-8">
                <div className="mb-6 flex items-center gap-3">
                  <Users className="h-6 w-6 text-blue-400" />
                  <h3 className="text-lg font-semibold text-white">
                    What Our Team Says
                  </h3>
                </div>
                <div className="space-y-6">
                  <div className="rounded-xl border border-white/5 bg-white/[0.03] p-5">
                    <p className="text-sm italic text-slate-400">
                      &ldquo;I have been in HVAC for 20 years and FD Pierce is the
                      best company I have worked for. They actually invest in their
                      people and treat you with respect.&rdquo;
                    </p>
                    <p className="mt-3 text-xs font-medium text-slate-500">
                      &mdash; Senior Technician, 8 years at FD Pierce
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/5 bg-white/[0.03] p-5">
                    <p className="text-sm italic text-slate-400">
                      &ldquo;Started as an apprentice and they helped me earn every
                      certification. Now I am running my own service calls and
                      mentoring the next class of apprentices.&rdquo;
                    </p>
                    <p className="mt-3 text-xs font-medium text-slate-500">
                      &mdash; Technician, 5 years at FD Pierce
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/5 bg-white/[0.03] p-5">
                    <p className="text-sm italic text-slate-400">
                      &ldquo;The benefits here are excellent and the management
                      genuinely cares about work-life balance. I actually get to
                      see my family.&rdquo;
                    </p>
                    <p className="mt-3 text-xs font-medium text-slate-500">
                      &mdash; Refrigeration Technician, 3 years at FD Pierce
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="relative border-b border-white/5 bg-[#0c1a30] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div {...fadeInUp} className="text-center">
            <h2 className="heading-section text-white">
              Full Benefits Package
            </h2>
            <div className="mx-auto mt-4 divider-accent" />
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
              We take care of our team. Every full-time employee receives a
              comprehensive benefits package from day one.
            </p>
          </motion.div>

          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {benefitsList.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: index * 0.06 }}
                  className="glass-card flex items-center gap-4 rounded-xl p-5"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-accent-500/20 to-orange-600/10 ring-1 ring-accent-500/20">
                    <Icon className="h-5 w-5 text-accent-400" />
                  </div>
                  <span className="text-sm font-medium text-slate-300">
                    {benefit.label}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0a1628] via-[#142548] to-[#0a1628] py-20 sm:py-28">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
          <motion.div {...fadeInUp}>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent-500/20 bg-accent-500/10 px-4 py-1.5 text-sm font-medium text-accent-400">
              <Award className="h-4 w-4" />
              Start Your Career
            </div>
            <h2 className="heading-section text-white">
              Ready to Join the Team?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-400">
              If you&apos;re interested in one of our open positions, start by
              applying here and attaching your resume. Even if you do not see a
              perfect match above, we are always interested in meeting skilled
              HVAC professionals.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/contact"
                className="btn-accent inline-flex items-center gap-2 text-base"
              >
                <span>Apply Now</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <a
                href="tel:5029693377"
                className="btn-ghost inline-flex items-center gap-2 text-base"
              >
                <Phone className="h-5 w-5" />
                <span>(502) 969-3377</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

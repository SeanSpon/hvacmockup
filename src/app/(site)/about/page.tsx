"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Building2,
  Users,
  Award,
  Shield,
  Heart,
  Lightbulb,
  Target,
  Handshake,
  CheckCircle2,
  MapPin,
  Clock,
  Phone,
  ArrowRight,
  Star,
  Briefcase,
  Zap,
} from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" as const },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

const values = [
  {
    icon: Award,
    title: "Quality",
    description:
      "Every job meets the highest standards of workmanship. We use premium parts and proven techniques because cutting corners is never an option.",
  },
  {
    icon: Shield,
    title: "Reliability",
    description:
      "When we say we will be there, we are there. Our customers count on us for consistent, dependable service every single time.",
  },
  {
    icon: Heart,
    title: "Customer Service",
    description:
      "We treat every client's problem as our own. Clear communication, honest assessments, and going the extra mile are part of our DNA.",
  },
  {
    icon: Handshake,
    title: "Integrity",
    description:
      "Transparent pricing, honest recommendations, and doing the right thing even when nobody is watching. That is how we have earned trust for 47 years.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "We stay current with the latest HVAC technology, energy-efficient solutions, and diagnostic tools to deliver smarter results for our clients.",
  },
];

const certifications = [
  {
    icon: Shield,
    title: "BBB A+ Rated",
    description: "Accredited since 1987",
    color: "text-blue-400",
    bg: "from-blue-500/20 to-blue-600/10",
  },
  {
    icon: Award,
    title: "EPA Certified",
    description: "Section 608 Universal",
    color: "text-green-400",
    bg: "from-green-500/20 to-green-600/10",
  },
  {
    icon: Star,
    title: "NATE Certified",
    description: "Industry-recognized excellence",
    color: "text-yellow-400",
    bg: "from-yellow-500/20 to-yellow-600/10",
  },
  {
    icon: Briefcase,
    title: "Kentucky Licensed",
    description: "License #HM06960",
    color: "text-purple-400",
    bg: "from-purple-500/20 to-purple-600/10",
  },
  {
    icon: CheckCircle2,
    title: "Insured & Bonded",
    description: "Full commercial coverage",
    color: "text-cyan-400",
    bg: "from-cyan-500/20 to-cyan-600/10",
  },
];

const timeline = [
  {
    year: "1978",
    title: "Company Founded",
    description:
      "FD Pierce Company opens its doors in Louisville, KY, specializing in commercial HVAC service and installation.",
  },
  {
    year: "1987",
    title: "BBB Accreditation",
    description:
      "Earned Better Business Bureau A+ accreditation, a standard we have maintained every year since.",
  },
  {
    year: "2000",
    title: "Refrigeration Expansion",
    description:
      "Expanded service offerings to include full commercial refrigeration, serving grocery, restaurant, and food service industries.",
  },
  {
    year: "2010",
    title: "Ice Machine Division",
    description:
      "Added dedicated ice machine sales, service, and maintenance, partnering with Hoshizaki, Manitowoc, and Scotsman.",
  },
  {
    year: "2024",
    title: "New Ownership",
    description:
      "Sarah Mann assumes co-ownership, bringing fresh leadership and a commitment to digital transformation while honoring the company's legacy.",
  },
  {
    year: "2025",
    title: "Digital Transformation",
    description:
      "Launched new customer portal, online scheduling, and modernized operations to deliver faster, more transparent service.",
  },
];

const trustReasons = [
  {
    icon: Clock,
    title: "47 Years of Experience",
    description:
      "Nearly five decades of solving commercial HVAC challenges means there is very little we have not seen and fixed before.",
  },
  {
    icon: MapPin,
    title: "Locally Owned & Operated",
    description:
      "We live and work in Louisville. This is our community, and our reputation depends on treating our neighbors right.",
  },
  {
    icon: Zap,
    title: "Rapid Response",
    description:
      "With 16 technicians on staff and 24/7 emergency availability, we can have someone at your facility fast when it matters most.",
  },
  {
    icon: Target,
    title: "Fair, Transparent Pricing",
    description:
      "No hidden fees, no unnecessary upsells. We provide detailed quotes upfront and stand behind every price we give.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0a1628] via-[#142548] to-[#0a1628] py-24 sm:py-32">
        <div className="absolute inset-0 opacity-[0.07]">
          <Image src="/images/team-photo.jpg" alt="FD Pierce Team" fill className="object-cover" />
        </div>
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute right-1/4 top-1/3 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 h-64 w-64 rounded-full bg-accent-500/5 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div {...fadeInUp} className="text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-400">
              <Building2 className="h-4 w-4" />
              Since 1978
            </div>
            <h1 className="heading-hero bg-gradient-to-b from-white to-slate-300 bg-clip-text text-transparent">
              About FD Pierce
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
              Nearly five decades of trusted commercial HVAC service in the
              Louisville metro area. Family values, professional standards.
            </p>
          </motion.div>
        </div>
      </section>

      {/* History Section */}
      <section className="relative border-b border-white/5 bg-[#0a1628] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
            <motion.div {...fadeInUp}>
              <h2 className="heading-section text-white">
                Our Story
              </h2>
              <div className="divider-accent mt-4" />
              <p className="mt-6 text-lg leading-relaxed text-slate-400">
                FD Pierce Company was founded in 1978 with a simple mission: provide
                Louisville businesses with honest, dependable commercial HVAC service.
                What started as a small operation has grown into one of the region's
                most trusted names in commercial heating, cooling, refrigeration, and
                ice machine services.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-slate-400">
                For 47 years, we have built our reputation one satisfied customer at a
                time. Our BBB A+ rating, earned in 1987 and maintained every year since,
                reflects our unwavering commitment to doing things right.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-slate-400">
                Since 1978 our mission has been to provide top-quality commercial
                HVAC/R solutions that meet the unique needs of our clients. We strive
                to exceed expectations and deliver exceptional customer service.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-slate-400">
                In 2024, co-owner Sarah Mann brought new energy and vision to the company,
                embracing modern technology and digital tools while preserving the core
                values that have made FD Pierce a Louisville institution. Under her
                leadership, we are investing in our team, our technology, and our
                community like never before.
              </p>
            </motion.div>

            <motion.div
              {...fadeInUp}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative h-72 md:h-96 w-full overflow-hidden rounded-2xl mb-6">
                <Image src="/images/mission-hvac.jpg" alt="FD Pierce HVAC Systems" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/60 to-transparent" />
              </div>
              <div className="glass-card rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-extrabold text-white">47</div>
                    <div className="mt-1 text-sm text-slate-400">Years in Business</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-extrabold text-blue-400">16</div>
                    <div className="mt-1 text-sm text-slate-400">Expert Technicians</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-extrabold text-accent-400">A+</div>
                    <div className="mt-1 text-sm text-slate-400">BBB Rating</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-extrabold text-green-400">24/7</div>
                    <div className="mt-1 text-sm text-slate-400">Emergency Service</div>
                  </div>
                </div>
                <div className="mt-8 rounded-xl border border-white/5 bg-white/[0.03] p-5">
                  <p className="text-sm font-medium text-slate-300">
                    &ldquo;We are not just servicing equipment. We are protecting
                    our customers&rsquo; businesses, their comfort, and their
                    bottom line. That responsibility drives everything we do.&rdquo;
                  </p>
                  <p className="mt-3 text-sm text-slate-500">
                    &mdash; Sarah Mann, Co-Owner
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="relative border-b border-white/5 bg-[#0c1a30] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div {...fadeInUp} className="text-center">
            <h2 className="heading-section text-white">
              Our Mission & Values
            </h2>
            <div className="mx-auto mt-4 divider-accent" />
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
              Everything we do is guided by a set of core principles that have
              remained constant since 1978. These are not just words on a wall;
              they are the standards our team lives by every day.
            </p>
          </motion.div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass-card rounded-2xl p-7"
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/10 ring-1 ring-blue-500/20">
                    <Icon className="h-6 w-6 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="relative border-b border-white/5 bg-[#0a1628] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
            <motion.div
              {...fadeInUp}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="relative h-72 md:h-80 w-full overflow-hidden rounded-2xl mb-6">
                <Image src="/images/team-photo.jpg" alt="FD Pierce Team" fill className="object-cover" />
              </div>
              <div className="glass-card rounded-2xl p-8">
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <div className="text-5xl font-extrabold text-white">16</div>
                    <div className="text-sm font-medium text-slate-400">
                      Expert Technicians
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    "EPA Section 608 Universal Certification",
                    "NATE Certified (North American Technician Excellence)",
                    "Factory-trained on major HVAC brands",
                    "Ongoing continuing education requirements",
                    "Background checked and drug tested",
                    "Average 12+ years of field experience",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-400" />
                      <span className="text-sm text-slate-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div {...fadeInUp}>
              <h2 className="heading-section text-white">
                Our Team
              </h2>
              <div className="divider-accent mt-4" />
              <p className="mt-6 text-lg leading-relaxed text-slate-400">
                Our team consists of highly skilled and experienced technicians
                who are dedicated to delivering the best results for our clients.
                We prioritize ongoing training and development to ensure that we
                stay up-to-date with the latest industry advancements.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-slate-400">
                The strength of FD Pierce Company is our people. Our team of 16
                certified technicians brings a combined century-plus of
                hands-on experience to every service call. Every technician holds
                EPA 608 Universal certification and maintains NATE credentials,
                the gold standard for HVAC excellence.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-slate-400">
                We also believe in growing talent from within. Our apprenticeship
                program pairs new technicians with experienced mentors,
                building the next generation of HVAC professionals right here in
                Louisville.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Certifications Grid */}
      <section className="relative border-b border-white/5 bg-[#0c1a30] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div {...fadeInUp} className="text-center">
            <h2 className="heading-section text-white">
              Certifications & Credentials
            </h2>
            <div className="mx-auto mt-4 divider-accent" />
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
              Our credentials are not just badges we display. They represent
              ongoing commitments to training, ethical business practices, and
              industry standards.
            </p>
          </motion.div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {certifications.map((cert, index) => {
              const Icon = cert.icon;
              return (
                <motion.div
                  key={cert.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="glass-card rounded-2xl p-6 text-center"
                >
                  <div
                    className={`mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${cert.bg} ring-1 ring-white/10`}
                  >
                    <Icon className={`h-7 w-7 ${cert.color}`} />
                  </div>
                  <h3 className="text-sm font-semibold text-white">
                    {cert.title}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500">
                    {cert.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Louisville Trusts Us */}
      <section className="relative border-b border-white/5 bg-[#0a1628] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div {...fadeInUp} className="text-center">
            <h2 className="heading-section text-white">
              Why Louisville Trusts FD Pierce
            </h2>
            <div className="mx-auto mt-4 divider-accent" />
          </motion.div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2">
            {trustReasons.map((reason, index) => {
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
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent-500/20 to-orange-600/10 ring-1 ring-accent-500/20">
                    <Icon className="h-6 w-6 text-accent-400" />
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

      {/* Company Timeline */}
      <section className="relative border-b border-white/5 bg-[#0c1a30] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div {...fadeInUp} className="text-center">
            <h2 className="heading-section text-white">
              Company Milestones
            </h2>
            <div className="mx-auto mt-4 divider-accent" />
          </motion.div>

          <div className="relative mt-16">
            {/* Vertical line */}
            <div className="absolute left-4 top-0 hidden h-full w-px bg-gradient-to-b from-blue-500/30 via-blue-500/10 to-transparent sm:left-1/2 sm:block" />

            <div className="space-y-12">
              {timeline.map((event, index) => {
                const isLeft = index % 2 === 0;
                return (
                  <motion.div
                    key={event.year}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                    className={`relative flex flex-col sm:flex-row ${
                      isLeft ? "sm:flex-row" : "sm:flex-row-reverse"
                    }`}
                  >
                    {/* Dot on the line */}
                    <div className="absolute left-4 top-1 hidden h-3 w-3 -translate-x-1/2 rounded-full border-2 border-blue-400 bg-[#0c1a30] sm:left-1/2 sm:block" />

                    {/* Content */}
                    <div
                      className={`w-full sm:w-1/2 ${
                        isLeft ? "sm:pr-12 sm:text-right" : "sm:pl-12"
                      }`}
                    >
                      <div className="glass-card rounded-xl p-6">
                        <div
                          className={`mb-2 inline-block rounded-full bg-blue-500/10 px-3 py-1 text-sm font-bold text-blue-400`}
                        >
                          {event.year}
                        </div>
                        <h3 className="text-lg font-semibold text-white">
                          {event.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-slate-400">
                          {event.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0a1628] via-[#142548] to-[#0a1628] py-20 sm:py-28">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
          <motion.div {...fadeInUp}>
            <h2 className="heading-section text-white">
              Experience the FD Pierce Difference
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-400">
              Join the hundreds of Louisville businesses that trust FD Pierce
              Company for their commercial HVAC, refrigeration, and ice machine
              needs.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/contact"
                className="btn-accent inline-flex items-center gap-2 text-base"
              >
                <span>Get in Touch</span>
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

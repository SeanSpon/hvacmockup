"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  DollarSign,
  CheckCircle2,
  ArrowRight,
  Phone,
  FileText,
  ThumbsUp,
  CalendarCheck,
  Smile,
  ChevronDown,
  ChevronUp,
  Shield,
  Clock,
  Percent,
  CreditCard,
  Banknote,
} from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" as const },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

const tiers = [
  {
    name: "Standard",
    rate: "0%",
    term: "12 Months",
    description:
      "Zero interest financing for qualifying customers. Perfect for smaller equipment upgrades or repairs that fit within a one-year payment window.",
    features: [
      "0% APR for 12 months",
      "No money down required",
      "Monthly payments as low as $150",
      "No prepayment penalties",
      "Quick online application",
    ],
    highlight: false,
    accent: "blue",
  },
  {
    name: "Low Rate",
    rate: "5.99%",
    term: "36 Months",
    description:
      "Our most popular financing option, offering a competitive fixed rate with manageable monthly payments spread over three years. Ideal for mid-range system replacements.",
    features: [
      "Fixed 5.99% APR",
      "No money down required",
      "Predictable monthly payments",
      "No prepayment penalties",
      "Covers equipment and installation",
    ],
    highlight: true,
    accent: "accent",
  },
  {
    name: "Extended",
    rate: "7.99%",
    term: "60 Months",
    description:
      "Maximum flexibility with our extended payment plan. Ideal for comprehensive system overhauls or new installations where lower monthly payments are the priority.",
    features: [
      "Fixed 7.99% APR",
      "No money down required",
      "Lowest monthly payments",
      "No prepayment penalties",
      "Includes full project costs",
    ],
    highlight: false,
    accent: "blue",
  },
];

const steps = [
  {
    icon: FileText,
    step: "01",
    title: "Apply Online",
    description:
      "Complete our simple financing application in minutes. We will need basic business information and the estimated project cost.",
  },
  {
    icon: ThumbsUp,
    step: "02",
    title: "Get Approved",
    description:
      "Receive a credit decision quickly, often within the same business day. Our lending partners work fast so you can move forward.",
  },
  {
    icon: CalendarCheck,
    step: "03",
    title: "Schedule Installation",
    description:
      "Once approved, we schedule your installation at a time that works for your business. No waiting, no delays.",
  },
  {
    icon: Smile,
    step: "04",
    title: "Enjoy Comfort",
    description:
      "Your new system is installed and running. Make easy monthly payments while enjoying reliable, efficient climate control.",
  },
];

const benefits = [
  {
    icon: Banknote,
    title: "No Money Down",
    description:
      "Start your project without any upfront investment. Preserve your cash flow for other business needs.",
  },
  {
    icon: Clock,
    title: "Quick Approval",
    description:
      "Most applications receive a decision within hours, not days. We know you need answers fast.",
  },
  {
    icon: Percent,
    title: "Competitive Rates",
    description:
      "Our lending partners offer rates well below industry averages, keeping your total cost of ownership low.",
  },
  {
    icon: CreditCard,
    title: "No Prepayment Penalties",
    description:
      "Pay off your balance early any time with no fees or penalties. We believe in flexibility.",
  },
];

const faqs = [
  {
    question: "What credit score do I need to qualify?",
    answer:
      "Our lending partners consider a range of credit profiles. While a higher score improves your chances for the best rates, we have options available for businesses with varying credit histories. We encourage you to apply even if you are uncertain about your eligibility.",
  },
  {
    question: "Can I finance both equipment and installation labor?",
    answer:
      "Yes. Our financing covers the full project cost, including equipment, installation labor, ductwork, controls, and any related expenses. The total amount is wrapped into one convenient monthly payment.",
  },
  {
    question: "How long does the approval process take?",
    answer:
      "Most applicants receive a credit decision within a few hours of submitting their application. In some cases, additional documentation may be requested, but we work quickly to keep things moving.",
  },
  {
    question: "Is there a minimum or maximum financing amount?",
    answer:
      "Financing is available for projects ranging from $1,500 to $100,000+. For larger commercial projects, we can work with you on customized financing arrangements through our lending partners.",
  },
  {
    question: "What happens if I want to pay off the balance early?",
    answer:
      "There are absolutely no prepayment penalties on any of our financing plans. You are free to pay off your balance at any time, and you will only pay interest on the remaining balance up to that point.",
  },
  {
    question: "Do you offer financing for maintenance plans?",
    answer:
      "Our financing options are designed for equipment purchases and installations. For ongoing maintenance, check out our Membership Plans page, which offers monthly payment options for preventive maintenance services.",
  },
];

export default function FinancingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0a1628] via-[#142548] to-[#0a1628] py-24 sm:py-32">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute left-1/4 top-1/3 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/3 h-64 w-64 rounded-full bg-accent-500/5 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div {...fadeInUp} className="text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-400">
              <DollarSign className="h-4 w-4" />
              Financing Available
            </div>
            <h1 className="heading-hero bg-gradient-to-b from-white to-slate-300 bg-clip-text text-transparent">
              Flexible Financing Options
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
              We make major HVAC investments affordable. Protect your cash flow
              with monthly payments that fit your budget, and get the comfort and
              reliability your business deserves today.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Financing Tier Cards */}
      <section className="relative border-b border-white/5 bg-[#0a1628] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div {...fadeInUp} className="text-center">
            <h2 className="heading-section text-white">
              Choose Your Plan
            </h2>
            <div className="mx-auto mt-4 divider-accent" />
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
              Three flexible options to fit the size of your project and your
              preferred payment timeline.
            </p>
          </motion.div>

          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {tiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className={`relative overflow-hidden rounded-2xl ${
                  tier.highlight
                    ? "ring-2 ring-accent-500/50 shadow-lg shadow-accent-500/10"
                    : ""
                }`}
              >
                {tier.highlight && (
                  <div className="absolute left-0 right-0 top-0 bg-gradient-to-r from-accent-500 to-orange-400 py-1.5 text-center text-xs font-bold uppercase tracking-wider text-white">
                    Most Popular
                  </div>
                )}
                <div
                  className={`glass-card h-full rounded-2xl p-8 ${
                    tier.highlight ? "pt-12" : ""
                  }`}
                >
                  <h3 className="text-lg font-semibold text-slate-300">
                    {tier.name}
                  </h3>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span
                      className={`text-5xl font-extrabold ${
                        tier.highlight ? "text-accent-400" : "text-white"
                      }`}
                    >
                      {tier.rate}
                    </span>
                    <span className="text-sm text-slate-400">APR</span>
                  </div>
                  <div className="mt-1 text-sm font-medium text-slate-500">
                    for {tier.term}
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-slate-400">
                    {tier.description}
                  </p>
                  <ul className="mt-6 space-y-3">
                    {tier.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2.5 text-sm text-slate-300"
                      >
                        <CheckCircle2
                          className={`mt-0.5 h-4 w-4 shrink-0 ${
                            tier.highlight
                              ? "text-accent-400"
                              : "text-blue-400"
                          }`}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <Link
                      href="/contact"
                      className={`inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all ${
                        tier.highlight
                          ? "bg-gradient-to-r from-accent-500 to-orange-500 text-white shadow-lg shadow-accent-500/20 hover:shadow-accent-500/30 hover:brightness-110"
                          : "border border-white/10 bg-white/5 text-white hover:bg-white/10"
                      }`}
                    >
                      Apply Now
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative border-b border-white/5 bg-[#0c1a30] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div {...fadeInUp} className="text-center">
            <h2 className="heading-section text-white">
              How It Works
            </h2>
            <div className="mx-auto mt-4 divider-accent" />
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
              Getting approved for financing is fast and straightforward. Here is
              how the process works from start to finish.
            </p>
          </motion.div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass-card relative rounded-2xl p-7 text-center"
                >
                  <div className="absolute -top-3 left-6 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 px-3 py-1 text-xs font-bold text-white">
                    Step {step.step}
                  </div>
                  <div className="mx-auto mb-4 mt-3 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/10 ring-1 ring-blue-500/20">
                    <Icon className="h-7 w-7 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="relative border-b border-white/5 bg-[#0a1628] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div {...fadeInUp} className="text-center">
            <h2 className="heading-section text-white">
              Why Finance with FD Pierce?
            </h2>
            <div className="mx-auto mt-4 divider-accent" />
          </motion.div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
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
                      {benefit.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative border-b border-white/5 bg-[#0c1a30] py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <motion.div {...fadeInUp} className="text-center">
            <h2 className="heading-section text-white">
              Frequently Asked Questions
            </h2>
            <div className="mx-auto mt-4 divider-accent" />
          </motion.div>

          <div className="mt-12 space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className="glass-card overflow-hidden rounded-xl"
              >
                <button
                  type="button"
                  onClick={() =>
                    setOpenFaq(openFaq === index ? null : index)
                  }
                  className="flex w-full items-center justify-between px-6 py-5 text-left"
                  aria-expanded={openFaq === index}
                >
                  <span className="pr-4 text-sm font-semibold text-white">
                    {faq.question}
                  </span>
                  {openFaq === index ? (
                    <ChevronUp className="h-5 w-5 shrink-0 text-blue-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 shrink-0 text-slate-500" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="border-t border-white/5 px-6 py-5">
                    <p className="text-sm leading-relaxed text-slate-400">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Apply CTA */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0a1628] via-[#142548] to-[#0a1628] py-20 sm:py-28">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/5 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
          <motion.div {...fadeInUp}>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent-500/20 bg-accent-500/10 px-4 py-1.5 text-sm font-medium text-accent-400">
              <Shield className="h-4 w-4" />
              No Obligation
            </div>
            <h2 className="heading-section text-white">
              Ready to Get Started?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-400">
              Applying is free and will not affect your credit score. Find out
              in minutes whether financing is right for your next HVAC project.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/contact"
                className="btn-accent inline-flex items-center gap-2 text-base"
              >
                <span>Apply for Financing</span>
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

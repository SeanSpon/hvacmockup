"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Crown,
  CheckCircle2,
  X,
  ArrowRight,
  Phone,
  Shield,
  Wrench,
  Truck,
  Clock,
  Star,
  ChevronDown,
  ChevronUp,
  Zap,
  Heart,
} from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" as const },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

interface PlanFeature {
  label: string;
  bronze: boolean;
  silver: boolean;
  gold: boolean;
  platinum: boolean;
}

const plans = [
  {
    name: "Bronze",
    price: 29,
    description: "Essential coverage for basic maintenance needs.",
    color: "from-amber-700/30 to-amber-800/10",
    ring: "ring-amber-700/30",
    badge: "bg-amber-700/20 text-amber-400",
    accent: "text-amber-400",
    btn: "border border-white/10 bg-white/5 text-white hover:bg-white/10",
    popular: false,
  },
  {
    name: "Silver",
    price: 49,
    description: "Enhanced protection with more frequent service visits.",
    color: "from-slate-400/20 to-slate-500/10",
    ring: "ring-slate-400/30",
    badge: "bg-slate-400/20 text-slate-300",
    accent: "text-slate-300",
    btn: "border border-white/10 bg-white/5 text-white hover:bg-white/10",
    popular: false,
  },
  {
    name: "Gold",
    price: 79,
    description:
      "Our most popular plan with premium benefits and priority service.",
    color: "from-yellow-500/20 to-amber-500/10",
    ring: "ring-yellow-500/40",
    badge: "bg-yellow-500/20 text-yellow-400",
    accent: "text-yellow-400",
    btn: "bg-gradient-to-r from-yellow-500 to-amber-500 text-white shadow-lg shadow-yellow-500/20 hover:shadow-yellow-500/30 hover:brightness-110",
    popular: true,
  },
  {
    name: "Platinum",
    price: 129,
    description:
      "The ultimate in HVAC care with VIP treatment and dedicated support.",
    color: "from-blue-500/20 to-cyan-500/10",
    ring: "ring-blue-500/30",
    badge: "bg-blue-500/20 text-blue-400",
    accent: "text-blue-400",
    btn: "border border-white/10 bg-white/5 text-white hover:bg-white/10",
    popular: false,
  },
];

const features: PlanFeature[] = [
  {
    label: "Annual maintenance visits",
    bronze: true,
    silver: true,
    gold: true,
    platinum: true,
  },
  {
    label: "Parts discount",
    bronze: true,
    silver: true,
    gold: true,
    platinum: true,
  },
  {
    label: "Priority scheduling",
    bronze: true,
    silver: true,
    gold: true,
    platinum: true,
  },
  {
    label: "Filter delivery service",
    bronze: false,
    silver: true,
    gold: true,
    platinum: true,
  },
  {
    label: "Emergency priority dispatch",
    bronze: false,
    silver: false,
    gold: true,
    platinum: true,
  },
  {
    label: "Extended labor warranty",
    bronze: false,
    silver: false,
    gold: true,
    platinum: true,
  },
  {
    label: "VIP emergency response",
    bronze: false,
    silver: false,
    gold: false,
    platinum: true,
  },
  {
    label: "All filters included",
    bronze: false,
    silver: false,
    gold: false,
    platinum: true,
  },
  {
    label: "Dedicated technician",
    bronze: false,
    silver: false,
    gold: false,
    platinum: true,
  },
];

const featureDetails: Record<string, string> = {
  Bronze: "1 visit/year, 10% parts discount",
  Silver: "2 visits/year, 15% parts discount",
  Gold: "2 visits/year, 20% parts discount",
  Platinum: "4 visits/year, 25% parts discount",
};

const membershipBenefits = [
  {
    icon: Wrench,
    title: "Prevent Costly Breakdowns",
    description:
      "Regular maintenance catches small problems before they turn into expensive emergencies. Our members experience 70% fewer unexpected breakdowns.",
  },
  {
    icon: Zap,
    title: "Lower Energy Bills",
    description:
      "Well-maintained HVAC systems run more efficiently. Members typically see 10-15% reduction in energy costs after their first tune-up.",
  },
  {
    icon: Clock,
    title: "Extended Equipment Life",
    description:
      "Proper maintenance can add 5-10 years to the lifespan of your HVAC equipment, protecting your capital investment for the long term.",
  },
  {
    icon: Truck,
    title: "Priority When It Matters",
    description:
      "Members jump to the front of the line when scheduling service. During peak season, this means the difference between same-day and next-week.",
  },
  {
    icon: Shield,
    title: "Peace of Mind",
    description:
      "Know that your HVAC system is being professionally maintained on a schedule. No more guessing when your last service was.",
  },
  {
    icon: Heart,
    title: "Preferred Pricing",
    description:
      "Enjoy exclusive member discounts on parts, labor, and new equipment. The savings often pay for the membership itself.",
  },
];

const memberFaqs = [
  {
    question: "Can I cancel my membership at any time?",
    answer:
      "Yes. Our memberships are month-to-month with no long-term contracts. You can cancel at any time with 30 days written notice. We want you to stay because the value is clear, not because you are locked in.",
  },
  {
    question: "When does my first maintenance visit happen?",
    answer:
      "We schedule your first visit within 30 days of enrollment. After that, visits are scheduled according to your plan level and the optimal maintenance timing for your specific equipment.",
  },
  {
    question: "Does my membership cover multiple units?",
    answer:
      "Each membership covers one HVAC system. If you have multiple units, we offer multi-system discounts. Contact us for a custom quote that covers your entire facility.",
  },
  {
    question: "What if I need service between scheduled visits?",
    answer:
      "Members receive priority scheduling for any additional service calls at their discounted rate. Gold and Platinum members also get emergency priority dispatch for after-hours situations.",
  },
  {
    question: "Are the parts discounts in addition to any manufacturer warranties?",
    answer:
      "Yes. Your membership discount applies to any parts not covered under manufacturer warranty. If a part is under warranty, you pay nothing for that part regardless of membership level.",
  },
];

export default function MembershipsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0a1628] via-[#142548] to-[#0a1628] py-24 sm:py-32">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute left-1/3 top-1/3 h-96 w-96 rounded-full bg-yellow-500/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-blue-500/5 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div {...fadeInUp} className="text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-yellow-500/20 bg-yellow-500/10 px-4 py-1.5 text-sm font-medium text-yellow-400">
              <Crown className="h-4 w-4" />
              Membership Plans
            </div>
            <h1 className="heading-hero bg-gradient-to-b from-white to-slate-300 bg-clip-text text-transparent">
              Maintenance Membership Plans
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
              Keep your HVAC system running at peak performance year-round.
              Choose the plan that fits your needs and budget, and let us handle
              the rest.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="relative border-b border-white/5 bg-[#0a1628] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative overflow-hidden rounded-2xl ${
                  plan.popular
                    ? "ring-2 ring-yellow-500/50 shadow-lg shadow-yellow-500/10"
                    : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute left-0 right-0 top-0 bg-gradient-to-r from-yellow-500 to-amber-400 py-1.5 text-center text-xs font-bold uppercase tracking-wider text-white">
                    Most Popular
                  </div>
                )}
                <div
                  className={`glass-card flex h-full flex-col rounded-2xl p-7 ${
                    plan.popular ? "pt-11" : ""
                  }`}
                >
                  <div
                    className={`mb-3 inline-flex w-fit rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${plan.badge}`}
                  >
                    {plan.name}
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className={`text-4xl font-extrabold ${plan.accent}`}>
                      ${plan.price}
                    </span>
                    <span className="text-sm text-slate-500">/mo</span>
                  </div>
                  <p className="mt-2 text-xs text-slate-500">
                    {featureDetails[plan.name]}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">
                    {plan.description}
                  </p>

                  <ul className="mt-6 flex-1 space-y-3">
                    {features.map((feature) => {
                      const key =
                        plan.name.toLowerCase() as keyof PlanFeature;
                      const included = feature[key] as boolean;
                      return (
                        <li
                          key={feature.label}
                          className={`flex items-start gap-2.5 text-sm ${
                            included ? "text-slate-300" : "text-slate-600"
                          }`}
                        >
                          {included ? (
                            <CheckCircle2
                              className={`mt-0.5 h-4 w-4 shrink-0 ${plan.accent}`}
                            />
                          ) : (
                            <X className="mt-0.5 h-4 w-4 shrink-0 text-slate-700" />
                          )}
                          <span className={included ? "" : "line-through"}>
                            {feature.label}
                          </span>
                        </li>
                      );
                    })}
                  </ul>

                  <div className="mt-8">
                    <Link
                      href="/contact"
                      className={`inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all ${plan.btn}`}
                    >
                      Join Now
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits of Membership */}
      <section className="relative border-b border-white/5 bg-[#0c1a30] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div {...fadeInUp} className="text-center">
            <h2 className="heading-section text-white">
              Benefits of Membership
            </h2>
            <div className="mx-auto mt-4 divider-accent" />
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
              A maintenance membership is the smartest investment you can make
              in your commercial HVAC system. Here is why our members love
              their plans.
            </p>
          </motion.div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {membershipBenefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="glass-card rounded-2xl p-7"
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/10 ring-1 ring-blue-500/20">
                    <Icon className="h-6 w-6 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    {benefit.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    {benefit.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative border-b border-white/5 bg-[#0a1628] py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <motion.div {...fadeInUp} className="text-center">
            <h2 className="heading-section text-white">
              Membership FAQ
            </h2>
            <div className="mx-auto mt-4 divider-accent" />
          </motion.div>

          <div className="mt-12 space-y-4">
            {memberFaqs.map((faq, index) => (
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

      {/* Bottom CTA */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0a1628] via-[#142548] to-[#0a1628] py-20 sm:py-28">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
          <motion.div {...fadeInUp}>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-yellow-500/20 bg-yellow-500/10 px-4 py-1.5 text-sm font-medium text-yellow-400">
              <Star className="h-4 w-4" />
              Start Saving Today
            </div>
            <h2 className="heading-section text-white">
              Protect Your Investment
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-400">
              Join the hundreds of Louisville businesses that trust FD Pierce
              maintenance memberships to keep their HVAC systems running smoothly.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/contact"
                className="btn-accent inline-flex items-center gap-2 text-base"
              >
                <span>Choose a Plan</span>
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

"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  Thermometer,
  Snowflake,
  IceCream2,
  Shield,
  Zap,
  Building2,
  Phone,
  ArrowRight,
  CheckCircle2,
  Star,
  MapPin,
  Clock,
  Award,
  Users,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  ANIMATION VARIANTS                                                 */
/* ------------------------------------------------------------------ */

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.1,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

/* ------------------------------------------------------------------ */
/*  SNOWFLAKE / ICE PARTICLE COMPONENT                                 */
/* ------------------------------------------------------------------ */

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  drift: number;
}

/* Simple seeded pseudo-random for deterministic particles (no hydration mismatch) */
function seededRandom(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

function IceParticles() {
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: 35 }, (_, i) => ({
      id: i,
      x: seededRandom(i * 7 + 1) * 100,
      y: seededRandom(i * 13 + 2) * 100,
      size: seededRandom(i * 17 + 3) * 4 + 2,
      duration: seededRandom(i * 23 + 4) * 15 + 10,
      delay: seededRandom(i * 29 + 5) * 10,
      opacity: seededRandom(i * 31 + 6) * 0.4 + 0.1,
      drift: seededRandom(i * 37 + 7) * 60 - 30,
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: `radial-gradient(circle, rgba(147,197,253,${p.opacity}) 0%, rgba(96,165,250,${p.opacity * 0.5}) 100%)`,
            boxShadow: `0 0 ${p.size * 2}px rgba(96,165,250,${p.opacity * 0.5})`,
          }}
          animate={{
            y: [0, -120, -240],
            x: [0, p.drift, p.drift * 0.5],
            opacity: [0, p.opacity, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const services = [
  {
    icon: Thermometer,
    title: "Commercial HVAC",
    desc: "Complete heating, ventilation & air conditioning solutions for commercial properties.",
    color: "from-blue-500 to-cyan-400",
    iconBg: "bg-blue-500/15",
    iconColor: "text-blue-400",
  },
  {
    icon: Snowflake,
    title: "Refrigeration",
    desc: "Walk-in coolers, freezers, and commercial refrigeration systems.",
    color: "from-cyan-400 to-sky-400",
    iconBg: "bg-cyan-500/15",
    iconColor: "text-cyan-400",
  },
  {
    icon: IceCream2,
    title: "Ice Machines",
    desc: "Installation, repair & maintenance for all ice machine brands.",
    color: "from-sky-400 to-indigo-400",
    iconBg: "bg-sky-500/15",
    iconColor: "text-sky-400",
  },
  {
    icon: Shield,
    title: "Preventive Maintenance",
    desc: "Keep your systems running efficiently with scheduled maintenance plans.",
    color: "from-emerald-400 to-teal-400",
    iconBg: "bg-emerald-500/15",
    iconColor: "text-emerald-400",
  },
  {
    icon: Zap,
    title: "24/7 Emergency Repair",
    desc: "Round-the-clock emergency service when you need it most.",
    color: "from-orange-400 to-amber-400",
    iconBg: "bg-orange-500/15",
    iconColor: "text-orange-400",
  },
  {
    icon: Building2,
    title: "New Installations",
    desc: "Expert design and installation of new commercial HVAC systems.",
    color: "from-violet-400 to-purple-400",
    iconBg: "bg-violet-500/15",
    iconColor: "text-violet-400",
  },
];

const whyUsFeatures = [
  "47 Years of Experience",
  "BBB A+ Accredited Since 1987",
  "Licensed & Certified Technicians",
  "24/7 Emergency Response",
  "Preventive Maintenance Programs",
  "Serving All of Louisville Metro",
];

const testimonials = [
  {
    quote:
      "FD Pierce has been our go-to HVAC partner for over a decade. Their technicians are always professional, and their 24/7 service has saved us from costly downtime more than once.",
    name: "Robert Chen",
    company: "Louisville Convention Center",
    rating: 5,
  },
  {
    quote:
      "When our walk-in cooler went down on a Friday night, FD Pierce had a tech on-site within the hour. They saved thousands of dollars in product. Absolutely outstanding service.",
    name: "Maria Torres",
    company: "Derby City Market",
    rating: 5,
  },
  {
    quote:
      "Their preventive maintenance program has cut our energy costs by nearly 20%. The team is knowledgeable, punctual, and a pleasure to work with every single time.",
    name: "James Whitfield",
    company: "Norton Healthcare",
    rating: 5,
  },
];

const serviceAreas = [
  "Louisville",
  "Jeffersontown",
  "Shively",
  "Okolona",
  "Hillview",
  "Shepherdsville",
  "St. Matthews",
  "Middletown",
  "Fern Creek",
  "Bardstown",
  "Elizabethtown",
  "Radcliff",
];

const stats = [
  { value: "47+", label: "Years", icon: Clock },
  { value: "16+", label: "Technicians", icon: Users },
  { value: "A+", label: "BBB Rating", icon: Award },
  { value: "24/7", label: "Emergency", icon: Zap },
];

/* ------------------------------------------------------------------ */
/*  SECTION WRAPPER                                                    */
/* ------------------------------------------------------------------ */

function Section({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={staggerContainer}
      className={`relative ${className}`}
    >
      {children}
    </motion.section>
  );
}

/* ------------------------------------------------------------------ */
/*  MAIN PAGE COMPONENT                                                */
/* ------------------------------------------------------------------ */

export default function HomePage() {
  return (
    <main className="relative bg-[#060e1a] text-white overflow-x-hidden">
      {/* ============================================================ */}
      {/*  HERO SECTION                                                 */}
      {/* ============================================================ */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
        {/* Gradient mesh background */}
        <div className="absolute inset-0" aria-hidden="true">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#0f1d32] to-[#0a1628]" />
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-600/8 rounded-full blur-[128px]" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-500/6 rounded-full blur-[128px]" />
          <div className="absolute top-1/3 right-1/3 w-[400px] h-[400px] bg-orange-500/4 rounded-full blur-[100px]" />
          {/* Subtle grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        {/* Ice particles */}
        <IceParticles />

        {/* Hero content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-32 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-medium mb-8 backdrop-blur-sm"
            >
              <Snowflake className="w-4 h-4" />
              <span>Keeping Louisville Cool Since 1978</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6"
            >
              Louisville&apos;s Most Trusted{" "}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Commercial HVAC
              </span>{" "}
              Partner
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              Keeping Louisville Cool Since 1978. Commercial HVAC, Refrigeration
              &amp; Ice Machine Experts.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <a
                href="/contact"
                className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-lg shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:from-blue-500 hover:to-cyan-400 transition-all duration-300 hover:-translate-y-0.5"
              >
                Request Service
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="tel:5029693377"
                className="relative inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold text-lg shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:from-orange-400 hover:to-red-400 transition-all duration-300 hover:-translate-y-0.5 animate-pulse-glow-accent"
              >
                <Phone className="w-5 h-5" />
                24/7 Emergency
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="relative z-10 mt-auto"
        >
          <div className="max-w-5xl mx-auto px-6 pb-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-2xl p-6 md:divide-x md:divide-white/10">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-center justify-center gap-1 py-2"
                >
                  <stat.icon className="w-5 h-5 text-blue-400 mb-1" />
                  <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    {stat.value}
                  </span>
                  <span className="text-xs md:text-sm text-gray-400 uppercase tracking-wider font-medium">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#060e1a] to-transparent pointer-events-none" />
      </section>

      {/* ============================================================ */}
      {/*  SERVICES SECTION                                             */}
      {/* ============================================================ */}
      <Section className="py-24 md:py-32" id="services">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Section header */}
          <motion.div variants={fadeInUp} custom={0} className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-4">
              What We Do
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Our{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Services
              </span>
            </h2>
            <div className="mx-auto w-20 h-1 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 mb-6" />
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Comprehensive commercial HVAC solutions backed by 47 years of
              expertise and a commitment to excellence.
            </p>
          </motion.div>

          {/* Service cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                variants={fadeInUp}
                custom={i + 1}
                className="group relative rounded-2xl bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] p-8 hover:bg-white/[0.07] hover:border-white/[0.15] transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/5"
              >
                {/* Gradient hover glow */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-[0.04] transition-opacity duration-500`}
                />

                {/* Icon */}
                <div
                  className={`relative w-14 h-14 rounded-xl ${service.iconBg} flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110`}
                >
                  <service.icon className={`w-7 h-7 ${service.iconColor}`} />
                </div>

                {/* Content */}
                <h3 className="relative text-xl font-semibold text-white mb-3">
                  {service.title}
                </h3>
                <p className="relative text-gray-400 leading-relaxed mb-5">
                  {service.desc}
                </p>

                {/* Link */}
                <a
                  href="/services"
                  className="relative inline-flex items-center gap-1.5 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors group/link"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ============================================================ */}
      {/*  WHY CHOOSE US                                                */}
      {/* ============================================================ */}
      <Section className="py-24 md:py-32 bg-gradient-to-b from-transparent via-blue-950/20 to-transparent" id="why-us">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Features */}
            <motion.div variants={fadeInUp} custom={0}>
              <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-4">
                Why FD Pierce
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
                Why Choose{" "}
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Us
                </span>
              </h2>
              <p className="text-gray-400 text-lg mb-10 leading-relaxed">
                For nearly five decades, FD Pierce Company has been the name
                Louisville businesses trust for commercial HVAC, refrigeration,
                and ice machine services.
              </p>

              <ul className="space-y-5">
                {whyUsFeatures.map((feature, i) => (
                  <motion.li
                    key={feature}
                    variants={fadeInUp}
                    custom={i + 1}
                    className="flex items-center gap-4"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    </div>
                    <span className="text-gray-200 text-lg font-medium">
                      {feature}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Right: Stats card */}
            <motion.div variants={scaleIn} className="relative">
              {/* Glow behind card */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-3xl blur-2xl opacity-50" />

              <div className="relative bg-gradient-to-br from-[#0f1d32] to-[#0a1628] border border-white/10 rounded-3xl p-10 overflow-hidden">
                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-bl-full" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-cyan-500/10 to-transparent rounded-tr-full" />

                <h3 className="text-2xl font-bold mb-8 relative">
                  By the Numbers
                </h3>

                <div className="grid grid-cols-2 gap-8 relative">
                  <div className="text-center p-4">
                    <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                      47
                    </div>
                    <div className="text-gray-400 text-sm uppercase tracking-wider font-medium">
                      Years in Business
                    </div>
                  </div>
                  <div className="text-center p-4">
                    <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
                      16
                    </div>
                    <div className="text-gray-400 text-sm uppercase tracking-wider font-medium">
                      Expert Technicians
                    </div>
                  </div>
                  <div className="text-center p-4">
                    <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent mb-2">
                      A+
                    </div>
                    <div className="text-gray-400 text-sm uppercase tracking-wider font-medium">
                      BBB Rating
                    </div>
                  </div>
                  <div className="text-center p-4">
                    <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-2">
                      24/7
                    </div>
                    <div className="text-gray-400 text-sm uppercase tracking-wider font-medium">
                      Emergency Service
                    </div>
                  </div>
                </div>

                {/* Dividers */}
                <div className="absolute inset-x-10 top-1/2 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" style={{ marginTop: "1.5rem" }} />
                <div className="absolute inset-y-10 left-1/2 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" style={{ marginTop: "3rem" }} />
              </div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* ============================================================ */}
      {/*  EMERGENCY CTA BANNER                                         */}
      {/* ============================================================ */}
      <Section className="py-16 md:py-20">
        <motion.div
          variants={fadeInUp}
          custom={0}
          className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12"
        >
          <div className="relative rounded-3xl overflow-hidden">
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600 via-red-500 to-orange-600" />
            {/* Animated pulse overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-white/10 to-orange-500/0 animate-shimmer" style={{ backgroundSize: "200% 100%" }} />
            {/* Noise texture overlay */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')" }} />

            <div className="relative px-8 py-12 md:py-16 text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Zap className="w-8 h-8 text-yellow-200" />
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                  HVAC Emergency? We&apos;re Here 24/7
                </h2>
                <Zap className="w-8 h-8 text-yellow-200" />
              </div>
              <p className="text-orange-100 text-lg mb-6 max-w-xl mx-auto">
                Don&apos;t let a breakdown disrupt your business. Our emergency
                team is standing by around the clock.
              </p>
              <a
                href="tel:5029693377"
                className="inline-flex items-center gap-3 text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 hover:text-yellow-200 transition-colors"
              >
                <Phone className="w-8 h-8 md:w-10 md:h-10" />
                (502) 969-3377
              </a>
              <div className="mt-4">
                <a
                  href="tel:5029693377"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-orange-600 font-bold text-lg hover:bg-yellow-50 transition-all duration-300 hover:-translate-y-0.5 shadow-xl"
                >
                  <Phone className="w-5 h-5" />
                  Call Now
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </Section>

      {/* ============================================================ */}
      {/*  TESTIMONIALS SECTION                                         */}
      {/* ============================================================ */}
      <Section className="py-24 md:py-32" id="testimonials">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Section header */}
          <motion.div variants={fadeInUp} custom={0} className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-4">
              Testimonials
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              What Our{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Clients
              </span>{" "}
              Say
            </h2>
            <div className="mx-auto w-20 h-1 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500" />
          </motion.div>

          {/* Testimonial cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                variants={fadeInUp}
                custom={i + 1}
                className="relative rounded-2xl bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] p-8 hover:bg-white/[0.07] hover:border-white/[0.15] transition-all duration-500"
              >
                {/* Quote mark decorative */}
                <div className="absolute top-6 right-8 text-6xl font-serif text-blue-500/10 leading-none select-none" aria-hidden="true">
                  &ldquo;
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: t.rating }).map((_, si) => (
                    <Star
                      key={si}
                      className="w-5 h-5 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-gray-300 leading-relaxed mb-6 relative">
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm">
                    {t.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <div className="font-semibold text-white">{t.name}</div>
                    <div className="text-sm text-gray-400">{t.company}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ============================================================ */}
      {/*  SERVICE AREA SECTION                                         */}
      {/* ============================================================ */}
      <Section className="py-24 md:py-32 bg-gradient-to-b from-transparent via-blue-950/20 to-transparent" id="service-area">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div variants={fadeInUp} custom={0} className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-4">
              Service Area
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Proudly Serving{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Louisville
              </span>{" "}
              &amp; Surrounding Areas
            </h2>
            <div className="mx-auto w-20 h-1 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 mb-6" />
            <p className="text-gray-400 max-w-xl mx-auto text-lg">
              Our fleet of 16 technicians covers the entire Louisville metro and
              beyond.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto"
          >
            {serviceAreas.map((area, i) => (
              <motion.span
                key={area}
                variants={fadeInUp}
                custom={i}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.05] border border-white/10 text-gray-300 font-medium hover:bg-blue-500/10 hover:border-blue-500/25 hover:text-blue-300 transition-all duration-300 cursor-default"
              >
                <MapPin className="w-4 h-4 text-blue-400" />
                {area}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* ============================================================ */}
      {/*  BOTTOM CTA SECTION                                           */}
      {/* ============================================================ */}
      <Section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            variants={fadeInUp}
            custom={0}
            className="text-center"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Ready to{" "}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Get Started
              </span>
              ?
            </h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              Whether you need routine maintenance or an emergency repair,
              Louisville&apos;s most trusted commercial HVAC team is ready to
              help.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/contact"
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-lg shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:from-blue-500 hover:to-cyan-400 transition-all duration-300 hover:-translate-y-0.5"
              >
                Request Service
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="tel:5029693377"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/15 text-white font-semibold text-lg hover:bg-white/5 hover:border-white/25 transition-all duration-300 hover:-translate-y-0.5"
              >
                <Phone className="w-5 h-5" />
                Call (502) 969-3377
              </a>
            </div>

            {/* Trust badges */}
            <motion.div
              variants={fadeInUp}
              custom={2}
              className="flex flex-wrap items-center justify-center gap-6 mt-12 text-sm text-gray-500"
            >
              <span className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-500" />
                Licensed &amp; Insured
              </span>
              <span className="w-1 h-1 rounded-full bg-gray-600" aria-hidden="true" />
              <span className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-500" />
                BBB A+ Rated
              </span>
              <span className="w-1 h-1 rounded-full bg-gray-600" aria-hidden="true" />
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-500" />
                24/7 Service
              </span>
            </motion.div>
          </motion.div>
        </div>
      </Section>

      {/* Bottom spacing / fade out */}
      <div className="h-20" />
    </main>
  );
}

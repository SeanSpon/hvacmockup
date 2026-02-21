"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Wind,
  Thermometer,
  Snowflake,
  Wrench,
  AlertTriangle,
  Building2,
  CheckCircle2,
  ArrowRight,
  Phone,
  Clock,
  Shield,
} from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" as const },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

const services = [
  {
    icon: Wind,
    title: "Commercial HVAC",
    image: "/images/service-hvac.jpg",
    description:
      "At FD Pierce Co, we offer commercial services for all of your HVAC, refrigeration and ice machine issues. We work hard to get your equipment back up in running in a timely manner. From initial system design through ongoing maintenance, our certified technicians ensure your facility stays comfortable year-round while maximizing energy efficiency and minimizing operational costs.",
    features: [
      "Heating system installation, repair, and maintenance",
      "Commercial cooling and air conditioning services",
      "Ventilation design and indoor air quality solutions",
      "Building automation and control systems",
      "Ductwork fabrication, installation, and sealing",
      "Energy audits and efficiency optimization",
      "Rooftop unit (RTU) service and replacement",
    ],
    industries:
      "Offices, retail stores, warehouses, restaurants, hospitals, schools, and multi-tenant facilities.",
  },
  {
    icon: Thermometer,
    title: "Commercial Refrigeration",
    image: "/images/mission-hvac.jpg",
    description:
      "Protect your perishable inventory and maintain strict temperature compliance with our expert commercial refrigeration services. Our team specializes in every type of commercial cooling equipment, from small reach-in coolers to massive refrigerated warehouse systems. We understand that refrigeration failure means lost product and lost revenue, so we respond quickly and get it right the first time.",
    features: [
      "Walk-in cooler and freezer installation and repair",
      "Reach-in refrigeration unit service",
      "Display case maintenance and retrofitting",
      "Refrigerated warehouse systems",
      "Temperature monitoring and alarm systems",
      "Compressor and condenser replacement",
      "Refrigerant leak detection and repair",
    ],
    industries:
      "Grocery stores, restaurants, convenience stores, floral shops, pharmaceutical facilities, and food distribution centers.",
  },
  {
    icon: Snowflake,
    title: "Ice Machines",
    image: "/images/service-consultation.jpg",
    description:
      "Not sure what type of refrigeration equipment your business needs? Our team of experts can provide consultation services to help you make the right decision. We'll assess your business's needs and recommend the best equipment for you. As authorized dealers and service providers for the industry's leading ice machine manufacturers, FD Pierce Company handles everything from selecting the right machine for your volume needs to ongoing preventive maintenance that keeps your ice clean and your machine running efficiently.",
    features: [
      "Hoshizaki sales, installation, and service",
      "Manitowoc ice machine repair and maintenance",
      "Scotsman equipment support and parts",
      "Water filtration system installation",
      "Ice machine cleaning and sanitization",
      "Bin and dispenser service",
      "Production capacity assessment and upgrades",
    ],
    industries:
      "Restaurants, bars, hotels, hospitals, convenience stores, and any business requiring reliable ice production.",
  },
  {
    icon: Wrench,
    title: "Preventive Maintenance",
    image: "/images/service-maintenance.jpg",
    description:
      "Regular maintenance is crucial to keeping your commercial HVAC, refrigeration and ice machine equipment working efficiently. We offer preventative maintenance plans to ensure your equipment is always in top condition, reducing the risk of breakdowns and costly repairs. Our comprehensive maintenance programs catch small problems before they become expensive emergencies, extend equipment lifespan, and keep your systems running at peak efficiency.",
    features: [
      "Seasonal tune-ups (spring cooling prep, fall heating prep)",
      "Air filter replacement and upgrade programs",
      "Evaporator and condenser coil cleaning",
      "Comprehensive system inspections and diagnostics",
      "Efficiency optimization and calibration",
      "Belt and bearing inspection and replacement",
      "Drain line clearing and condensate management",
    ],
    industries:
      "Every commercial facility benefits from preventive maintenance. Ask about our membership plans for recurring savings.",
  },
  {
    icon: AlertTriangle,
    title: "24/7 Emergency Service",
    image: "/images/service-emergency.jpg",
    description:
      "We understand that downtime can be costly for your business. That's why we offer 24/7 emergency repair services for all types of commercial HVAC, refrigeration and ice equipment. Our team is always on call to get your equipment up and running as quickly as possible. When your cooling system fails on the hottest day of summer or your walk-in freezer stops holding temperature at 2 AM, FD Pierce Company is ready to respond with the parts and expertise to get you back up and running fast.",
    features: [
      "Round-the-clock emergency dispatch, 365 days a year",
      "Rapid response times throughout the Louisville area",
      "All brands and equipment types serviced",
      "Temporary cooling and heating solutions available",
      "Priority scheduling for critical failures",
      "Emergency refrigerant recharging",
      "After-hours diagnostic and repair services",
    ],
    industries:
      "Any business facing a critical HVAC or refrigeration failure that cannot wait until regular business hours.",
  },
  {
    icon: Building2,
    title: "New Installations",
    image: "/images/service-quality.jpg",
    description:
      "At FD Pierce Co, we pride ourselves on providing top-notch customer service. Whether you are building a new facility, renovating an existing space, or replacing aging equipment, FD Pierce Company manages your installation project from concept to commissioning. Our engineers perform detailed load calculations to ensure your new system is properly sized, and our project managers keep everything on schedule and on budget.",
    features: [
      "Custom system design and engineering",
      "Manual J load calculations and energy modeling",
      "Equipment selection and procurement",
      "Ductwork design, fabrication, and installation",
      "Project management and coordination",
      "Commissioning, testing, and balancing",
      "Warranty registration and documentation",
    ],
    industries:
      "New construction, tenant build-outs, equipment replacement, facility expansions, and retrofit projects.",
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0a1628] via-[#142548] to-[#0a1628] py-24 sm:py-32">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-accent-500/5 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div {...fadeInUp} className="text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-400">
              <Wrench className="h-4 w-4" />
              What We Do
            </div>
            <h1 className="heading-hero bg-gradient-to-b from-white to-slate-300 bg-clip-text text-transparent">
              Our Services
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
              Comprehensive commercial HVAC, refrigeration, and ice machine
              services backed by 47 years of expertise and an A+ BBB rating.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Service Sections */}
      <section className="relative bg-[#0a1628]">
        {services.map((service, index) => {
          const Icon = service.icon;
          const isEven = index % 2 === 0;

          return (
            <div
              key={service.title}
              className={`relative border-b border-white/5 ${
                index % 2 === 0 ? "bg-[#0a1628]" : "bg-[#0c1a30]"
              }`}
            >
              <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
                <div
                  className={`flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-20 ${
                    !isEven ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Text Content */}
                  <motion.div
                    {...fadeInUp}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="flex-1"
                  >
                    <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/10 ring-1 ring-blue-500/20">
                      <Icon className="h-7 w-7 text-blue-400" />
                    </div>
                    <h2 className="heading-section text-white">
                      {service.title}
                    </h2>
                    <p className="mt-4 text-lg leading-relaxed text-slate-400">
                      {service.description}
                    </p>
                    <p className="mt-4 text-sm text-slate-500">
                      <span className="font-semibold text-slate-300">
                        Industries served:{" "}
                      </span>
                      {service.industries}
                    </p>
                    <div className="mt-8">
                      <Link
                        href="/contact"
                        className="btn-accent inline-flex items-center gap-2 text-sm"
                      >
                        <span>Request a Quote</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </motion.div>

                  {/* Image & Feature List */}
                  <motion.div
                    {...fadeInUp}
                    transition={{ duration: 0.6, delay: 0.25 }}
                    className="flex-1 space-y-8"
                  >
                    {/* Service Image */}
                    <div className="relative h-64 md:h-80 w-full overflow-hidden rounded-2xl">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/60 to-transparent" />
                    </div>

                    {/* Feature List */}
                    <div className="glass-card rounded-2xl p-8">
                      <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-slate-300">
                        Services Included
                      </h3>
                      <ul className="space-y-3.5">
                        {service.features.map((feature) => (
                          <li
                            key={feature}
                            className="flex items-start gap-3 text-slate-300"
                          >
                            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-400" />
                            <span className="text-sm leading-relaxed">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Bottom CTA Banner */}
      <section className="relative overflow-hidden border-t border-white/5 bg-gradient-to-br from-[#0c1a30] via-[#142548] to-[#0a1628] py-20 sm:py-28">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/5 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
          <motion.div {...fadeInUp}>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent-500/20 bg-accent-500/10 px-4 py-1.5 text-sm font-medium text-accent-400">
              <Shield className="h-4 w-4" />
              BBB A+ Rated Since 1987
            </div>
            <h2 className="heading-section text-white">
              Ready to Get Started?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-400">
              Whether you need routine maintenance, emergency repair, or a
              complete system installation, FD Pierce Company has the experience
              and expertise to handle it. Contact us today for a free
              consultation and quote.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/contact"
                className="btn-accent inline-flex items-center gap-2 text-base"
              >
                <span>Request a Quote</span>
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
            <p className="mt-6 flex items-center justify-center gap-2 text-sm text-slate-500">
              <Clock className="h-4 w-4" />
              M-F 8:00 AM - 4:30 PM | Weekends by appointment | 24/7 Emergency
              Service
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

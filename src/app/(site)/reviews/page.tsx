"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Star,
  Quote,
  ArrowRight,
  Phone,
  ExternalLink,
  Shield,
  ThumbsUp,
  MessageSquare,
} from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" as const },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 ${
            star <= rating
              ? "fill-yellow-400 text-yellow-400"
              : "text-slate-600"
          }`}
        />
      ))}
    </div>
  );
}

const reviews = [
  {
    name: "Michael Torres",
    company: "Torres Restaurant Group",
    rating: 5,
    text: "FD Pierce has been servicing our three restaurant locations for over 10 years. When our walk-in freezer went down at midnight on a Saturday, they had a tech there within an hour. Saved us thousands in inventory. You cannot put a price on that kind of reliability.",
    date: "January 2025",
    source: "Google",
  },
  {
    name: "Jennifer Walsh",
    company: "Walsh Properties LLC",
    rating: 5,
    text: "We manage 12 commercial properties in the Louisville area and FD Pierce handles all of our HVAC needs. Their preventive maintenance program has reduced our emergency calls by at least 60%. Professional, punctual, and always fair on pricing.",
    date: "December 2024",
    source: "Google",
  },
  {
    name: "Robert Chen",
    company: "Louisville Medical Associates",
    rating: 5,
    text: "Our medical office requires precise temperature control for patient comfort and equipment calibration. FD Pierce installed our new system and their maintenance team keeps it running perfectly. The attention to detail is exceptional.",
    date: "November 2024",
    source: "BBB",
  },
  {
    name: "Amanda Brooks",
    company: "Fresh Market Grocers",
    rating: 4,
    text: "Great refrigeration service. They maintain all of our display cases and walk-in coolers across two locations. Scheduling is easy and their techs always explain what they are doing and why. Minor scheduling issue once but they made it right immediately.",
    date: "October 2024",
    source: "Google",
  },
  {
    name: "David Patterson",
    company: "Patterson Warehousing",
    rating: 5,
    text: "FD Pierce designed and installed the HVAC system for our new 40,000 sq ft warehouse facility. The project was completed on time and under budget. Six months later, the system is running flawlessly and our energy costs are lower than projected.",
    date: "September 2024",
    source: "Yelp",
  },
  {
    name: "Karen Mitchell",
    company: "Bluegrass Event Center",
    rating: 5,
    text: "We host events year-round and climate control is critical to our business. FD Pierce installed a new system that handles everything from intimate dinners to 500-person galas. Their team was incredibly professional throughout the entire project.",
    date: "August 2024",
    source: "Google",
  },
  {
    name: "James Nakamura",
    company: "Sakura Sushi & Ramen",
    rating: 5,
    text: "Our ice machine kept breaking down and other companies could never figure out why. FD Pierce sent a tech who diagnosed the real problem in 20 minutes. New water filtration system and six months of perfect ice production. Highly recommend.",
    date: "July 2024",
    source: "Yelp",
  },
  {
    name: "Lisa Hernandez",
    company: "Comfort Inn Louisville South",
    rating: 4,
    text: "We have used FD Pierce for emergency repairs and maintenance for three years. Their 24/7 service is genuinely 24/7 and not just a voicemail like some companies. Response times have been excellent. Only wish they offered Saturday morning appointments more regularly.",
    date: "June 2024",
    source: "Google",
  },
  {
    name: "Thomas Baker",
    company: "Baker Automotive Group",
    rating: 5,
    text: "Three dealership locations, all maintained by FD Pierce. They understand the unique challenges of showroom and service bay climate control. Their maintenance membership pays for itself every year in prevented breakdowns and energy savings.",
    date: "May 2024",
    source: "BBB",
  },
  {
    name: "Sandra Williams",
    company: "Louisville Community Church",
    rating: 5,
    text: "FD Pierce has taken care of our church's HVAC for 15 years. They are always respectful of our schedule, work around services and events, and have been incredibly fair with pricing. They truly treat us like family. BBB A+ rating well deserved.",
    date: "April 2024",
    source: "Google",
  },
  {
    name: "Mark Sullivan",
    company: "Sullivan Law Offices",
    rating: 5,
    text: "Switched to FD Pierce after years of mediocre service from another provider. The difference was immediate. Thorough inspections, clear reports, honest recommendations. They told us our system had more life in it when others were pushing a full replacement. That integrity earned our trust.",
    date: "March 2024",
    source: "Yelp",
  },
  {
    name: "Diana Foster",
    company: "Riverfront Retirement Living",
    rating: 4,
    text: "Managing climate control for a senior living facility is no small task. FD Pierce maintains our systems with the urgency and care our residents deserve. Their technicians are always respectful and courteous when working in our common areas. Very satisfied with the partnership.",
    date: "February 2024",
    source: "Google",
  },
];

const sources = [
  { name: "Google", count: "150+", color: "text-blue-400" },
  { name: "Yelp", count: "35+", color: "text-red-400" },
  { name: "BBB", count: "20+", color: "text-green-400" },
];

export default function ReviewsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0a1628] via-[#142548] to-[#0a1628] py-24 sm:py-32">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute left-1/4 top-1/3 h-96 w-96 rounded-full bg-yellow-500/5 blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 h-64 w-64 rounded-full bg-blue-500/5 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div {...fadeInUp} className="text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-yellow-500/20 bg-yellow-500/10 px-4 py-1.5 text-sm font-medium text-yellow-400">
              <MessageSquare className="h-4 w-4" />
              Client Testimonials
            </div>
            <h1 className="heading-hero bg-gradient-to-b from-white to-slate-300 bg-clip-text text-transparent">
              What Our Clients Say
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
              Do not just take our word for it. Hear from the Louisville
              businesses that rely on FD Pierce Company for their commercial
              HVAC, refrigeration, and ice machine needs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Overall Rating */}
      <section className="border-b border-white/5 bg-[#0c1a30] py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div
            {...fadeInUp}
            className="flex flex-col items-center gap-8 sm:flex-row sm:justify-center sm:gap-16"
          >
            {/* Rating Score */}
            <div className="text-center">
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-6xl font-extrabold text-white">4.8</span>
                <span className="text-2xl font-bold text-slate-400">/5</span>
              </div>
              <div className="mt-2 flex items-center justify-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-6 w-6 ${
                      star <= 4
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-yellow-400/60 text-yellow-400/60"
                    }`}
                  />
                ))}
              </div>
              <p className="mt-2 text-sm text-slate-400">
                Based on 200+ verified reviews
              </p>
            </div>

            <div className="hidden h-16 w-px bg-white/10 sm:block" />

            {/* Sources */}
            <div className="flex items-center gap-8">
              {sources.map((source) => (
                <div key={source.name} className="text-center">
                  <div className={`text-2xl font-bold ${source.color}`}>
                    {source.count}
                  </div>
                  <div className="mt-1 text-xs text-slate-500">
                    {source.name} Reviews
                  </div>
                </div>
              ))}
            </div>

            <div className="hidden h-16 w-px bg-white/10 sm:block" />

            {/* BBB Badge */}
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/15 ring-1 ring-blue-500/25">
                <Shield className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">BBB A+ Rated</div>
                <div className="text-xs text-slate-500">Since 1987</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Review Grid */}
      <section className="relative border-b border-white/5 bg-[#0a1628] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review, index) => (
              <motion.div
                key={review.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: (index % 6) * 0.08 }}
                className="glass-card flex flex-col rounded-2xl p-7"
              >
                {/* Stars + Source */}
                <div className="flex items-center justify-between">
                  <StarRating rating={review.rating} />
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                      review.source === "Google"
                        ? "bg-blue-500/10 text-blue-400"
                        : review.source === "Yelp"
                        ? "bg-red-500/10 text-red-400"
                        : "bg-green-500/10 text-green-400"
                    }`}
                  >
                    {review.source}
                  </span>
                </div>

                {/* Quote */}
                <div className="mt-4 flex-1">
                  <Quote className="mb-2 h-5 w-5 text-slate-600" />
                  <p className="text-sm leading-relaxed text-slate-400">
                    {review.text}
                  </p>
                </div>

                {/* Author */}
                <div className="mt-6 flex items-center gap-3 border-t border-white/5 pt-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/10 text-sm font-bold text-blue-400">
                    {review.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">
                      {review.name}
                    </div>
                    <div className="text-xs text-slate-500">
                      {review.company}
                    </div>
                  </div>
                  <div className="ml-auto text-xs text-slate-600">
                    {review.date}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leave a Review CTA */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0a1628] via-[#142548] to-[#0a1628] py-20 sm:py-28">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-500/3 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
          <motion.div {...fadeInUp}>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-yellow-500/20 bg-yellow-500/10 px-4 py-1.5 text-sm font-medium text-yellow-400">
              <ThumbsUp className="h-4 w-4" />
              Share Your Experience
            </div>
            <h2 className="heading-section text-white">
              Had a Great Experience?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-400">
              Your review helps other Louisville businesses find reliable HVAC
              service. We appreciate every customer who takes the time to share
              their experience.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href="https://www.google.com/search?q=fd+pierce+company+louisville+ky+reviews"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-accent inline-flex items-center gap-2 text-base"
              >
                <span>Leave a Google Review</span>
                <ExternalLink className="h-4 w-4" />
              </a>
              <a
                href="https://facebook.com/fdpiercecompany"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost inline-flex items-center gap-2 text-base"
              >
                <span>Review on Facebook</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Secondary CTA */}
        <div className="relative mx-auto mt-16 max-w-2xl px-4 sm:px-6">
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="glass-card rounded-2xl p-8 text-center"
          >
            <h3 className="text-lg font-semibold text-white">
              Ready to Experience the FD Pierce Difference?
            </h3>
            <p className="mt-2 text-sm text-slate-400">
              Join the hundreds of Louisville businesses that trust us for their
              commercial HVAC needs.
            </p>
            <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:shadow-blue-500/30 hover:brightness-110"
              >
                Request Service
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="tel:5029693377"
                className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition-colors hover:text-white"
              >
                <Phone className="h-4 w-4" />
                (502) 969-3377
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

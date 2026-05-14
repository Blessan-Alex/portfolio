"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const pricingData = [
  { service: "Page Design & Development", desc: "Custom design and development per individual webpage. Includes mobile optimization.", price: "₹2,500 / page" },
  { service: "Domain & Hosting", desc: "Server space and domain name (e.g., .com, .in). Price varies based on the specific name and hosting tier chosen.", price: "₹500 – ₹2,500 / year" },
  { service: "Professional Email", desc: "Custom business email (e.g., you@yourdomain.com) with 10GB of storage.", price: "₹600 – ₹1,000 / year" },
  { service: "Comprehensive SEO", desc: "Full on-page and technical optimization, plus off-page strategy.", price: "₹10,000" },
];

export default function QuotePage() {
  const [generating, setGenerating] = useState(false);

  const handleDownloadPDF = async () => {
    setGenerating(true);
    try {
      const { default: generateQuotePDF } = await import("@/lib/generateQuotePDF");
      generateQuotePDF();
    } catch (e) {
      console.error("PDF generation failed", e);
    } finally {
      setGenerating(false);
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1, y: 0,
      transition: { delay: i * 0.07, duration: 0.5, ease: "easeOut" },
    }),
  };

  return (
    <main className="relative min-h-screen bg-black-100 overflow-hidden">
      {/* Background decorations */}
      <div className="fixed inset-0 dark:bg-black-100 bg-white dark:bg-grid-white/[0.015] bg-grid-black-100/[0.2] pointer-events-none" />
      <div className="fixed inset-0 dark:bg-black-100 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] pointer-events-none" />
      <div className="fixed top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-purple/[0.04] blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-blue-100/[0.03] blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-[880px] mx-auto px-5 sm:px-10 py-12 sm:py-24">

        {/* ─── HEADER ─── */}
        <motion.header custom={0} initial="hidden" animate="visible" variants={fadeUp} className="mb-14 sm:mb-20">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 pb-8 border-b border-white/[0.07]">
            <div>
              <h1 className="text-2xl sm:text-[2rem] font-semibold text-white tracking-tight leading-tight">Blessan Alex</h1>
              <p className="text-sm sm:text-[1.05rem] text-purple mt-1.5 font-medium">Freelance Web Developer &amp; Consultant</p>
            </div>
            <div className="text-xs sm:text-[0.9rem] text-white-100/60 sm:text-right space-y-1">
              <p>📧 contact@blessanalex.dev</p>
              <p>📞 +91 9188563150</p>
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-[11px] sm:text-[0.88rem] uppercase tracking-[0.25em] text-purple/70 font-medium">Proposal</p>
            <h2 className="text-xl sm:text-[1.85rem] md:text-[2.1rem] font-semibold text-white leading-snug">
              Website Design &amp;<br className="hidden sm:block" /> Development Proposal
            </h2>
            <p className="text-[0.9rem] sm:text-[1.05rem] text-white-100/55 leading-[1.75] max-w-[640px]">
              Thank you for considering my services for your new website. Whether you are looking for a simple digital identity or a robust, search-optimized platform that grows with your business, I have tailored the options below to give you complete transparency and control over your investment.
            </p>
          </div>
        </motion.header>

        {/* ─── PRICING TABLE ─── */}
        <motion.section custom={1} initial="hidden" animate="visible" variants={fadeUp} className="mb-14 sm:mb-20">
          <h3 className="text-[0.88rem] sm:text-[0.93rem] uppercase tracking-[0.2em] text-purple/70 font-medium mb-5">Investment Breakdown</h3>
          <p className="text-[0.9rem] sm:text-[0.95rem] text-white-100/45 mb-7 leading-relaxed">Below is the itemized pricing for the website development, infrastructure, and optimization services.</p>

          <div className="rounded-xl border border-white/[0.07] overflow-hidden bg-white/[0.015]">
            <div className="hidden sm:grid grid-cols-[1fr_1.8fr_1fr] gap-5 px-6 lg:px-8 py-4 bg-white/[0.03] border-b border-white/[0.06]">
              <span className="text-[0.82rem] uppercase tracking-wider text-white-100/40 font-medium">Service</span>
              <span className="text-[0.82rem] uppercase tracking-wider text-white-100/40 font-medium">Description</span>
              <span className="text-[0.82rem] uppercase tracking-wider text-white-100/40 font-medium text-right">Investment</span>
            </div>
            {pricingData.map((row, i) => (
              <div key={i} className={`grid sm:grid-cols-[1fr_1.8fr_1fr] gap-1.5 sm:gap-5 px-5 sm:px-6 lg:px-8 py-4 sm:py-5 ${i < 3 ? "border-b border-white/[0.04]" : ""} hover:bg-white/[0.02] transition-colors duration-200`}>
                <span className="text-[0.9rem] sm:text-[0.95rem] font-medium text-white">{row.service}</span>
                <span className="text-[0.93rem] sm:text-[0.95rem] text-white-100/50 leading-relaxed">{row.desc}</span>
                <span className="text-[0.9rem] sm:text-[0.95rem] font-semibold text-purple whitespace-nowrap sm:text-right mt-1 sm:mt-0">{row.price}</span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ─── STRATEGIC PATHWAYS ─── */}
        <motion.section custom={2} initial="hidden" animate="visible" variants={fadeUp} className="mb-14 sm:mb-20">
          <h3 className="text-[0.88rem] sm:text-[0.93rem] uppercase tracking-[0.2em] text-purple/70 font-medium mb-3">Strategic Pathways</h3>
          <p className="text-[0.9rem] sm:text-[0.95rem] text-white-100/45 mb-8 leading-relaxed">To help you decide, I have broken down the two most common approaches clients take depending on their current business goals.</p>

          <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
            {/* Option 1 */}
            <div className="group rounded-xl border border-white/[0.07] p-5 sm:p-7 bg-white/[0.015] hover:bg-white/[0.03] transition-all duration-300">
              <div className="flex items-center gap-3 mb-5">
                <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-purple/10 text-purple text-[0.8rem] font-bold">01</span>
                <h4 className="text-[1.05rem] font-semibold text-white">The Digital Identity</h4>
              </div>
              <p className="text-[0.9rem] text-white-100/50 leading-[1.7] mb-5">If you only need a digital business card for people to find your contact details when they already know your name, a single-page setup is perfect.</p>
              <div className="space-y-3">
                <div className="flex items-start gap-2.5">
                  <span className="text-purple/60 mt-0.5 text-[0.78rem]">◆</span>
                  <p className="text-[0.9rem] text-white-100/45 leading-relaxed"><span className="text-white-100/65 font-medium">Includes:</span> Website design (₹2,500/page) + Domain/Hosting + Professional Email</p>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="text-purple/60 mt-0.5 text-[0.78rem]">◆</span>
                  <p className="text-[0.9rem] text-white-100/45 leading-relaxed"><span className="text-white-100/65 font-medium">Best for:</span> Establishing a quick, professional online presence</p>
                </div>
              </div>
            </div>

            {/* Option 2 */}
            <div className="group relative rounded-xl border border-purple/20 p-5 sm:p-7 bg-purple/[0.03] hover:bg-purple/[0.05] transition-all duration-300">
              <div className="absolute top-3.5 right-3.5">
                <span className="text-[0.72rem] uppercase tracking-wider bg-purple/15 text-purple/80 px-2.5 py-1 rounded-full font-medium">Recommended</span>
              </div>
              <div className="flex items-center gap-3 mb-5">
                <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-purple/15 text-purple text-[0.8rem] font-bold">02</span>
                <h4 className="text-[1.05rem] font-semibold text-white">The Growth Engine</h4>
              </div>
              <p className="text-[0.9rem] text-white-100/50 leading-[1.7] mb-5">If you want your website to actively work for you—acting as a magnet for new clients—I highly recommend pairing your website with Comprehensive SEO.</p>
              <div className="space-y-3">
                {[
                  { label: "Technical & On-Page SEO:", text: "Complete backend and content optimization for search engines" },
                  { label: "Keyword Optimization:", text: "Targeting relevant, low-to-medium competition keywords" },
                  { label: "Off-Page Strategy:", text: "Actionable roadmap for building off-page authority" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <span className="text-purple/60 mt-0.5 text-[0.78rem]">◆</span>
                    <p className="text-[0.9rem] text-white-100/45 leading-relaxed"><span className="text-white-100/65 font-medium">{item.label}</span> {item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SEO Note */}
          <div className="mt-7 rounded-lg border border-white/[0.05] bg-white/[0.015] px-6 py-5">
            <p className="text-[0.9rem] sm:text-[0.95rem] text-white-100/35 leading-[1.75]">
              <span className="text-white-100/55 font-medium">A note on SEO expectations:</span>{" "}
              SEO is not a magic bullet. It is a long-term investment. Just as a physical store needs a solid business reputation to attract foot traffic, your website will grow organically alongside your business.
            </p>
          </div>
        </motion.section>

        {/* ─── NEXT STEPS ─── */}
        <motion.section custom={3} initial="hidden" animate="visible" variants={fadeUp} className="mb-14 sm:mb-20">
          <h3 className="text-[0.88rem] sm:text-[0.93rem] uppercase tracking-[0.2em] text-purple/70 font-medium mb-5">Next Steps</h3>
          <p className="text-[0.9rem] sm:text-[1.02rem] text-white-100/50 leading-[1.75]">
            Please review the pricing and let me know how many pages you envision for the site and whether you would like to proceed with the SEO integration. Once we finalize the scope, I will send over the final invoice and project timeline.
          </p>
          <p className="text-[0.95rem] sm:text-[1.05rem] text-white-100/65 mt-5 font-medium">Looking forward to building something great together!</p>
        </motion.section>

        {/* ─── SIGNATURE ─── */}
        <motion.footer custom={4} initial="hidden" animate="visible" variants={fadeUp} className="pt-10 border-t border-white/[0.07]">
          <p className="text-[0.9rem] text-white-100/45 mb-1.5">Best regards,</p>
          <p className="text-xl font-semibold text-white">Blessan</p>
          <p className="text-[0.93rem] text-white-100/45 mt-1">Freelance Web Developer</p>
          <p className="text-[0.9rem] text-white-100/35 mt-1.5">contact@blessanalex.dev &nbsp;|&nbsp; +91 9188563150</p>
        </motion.footer>

        {/* ─── DOWNLOAD BUTTON ─── */}
        <motion.div custom={5} initial="hidden" animate="visible" variants={fadeUp} className="mt-14 flex justify-center">
          <button
            onClick={handleDownloadPDF}
            disabled={generating}
            className="group relative inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-[0.95rem] font-medium text-white hover:bg-white/[0.07] hover:border-white/[0.15] transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-wait"
          >
            {generating ? (
              <>
                <svg className="w-4 h-4 text-purple animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Generating PDF…
              </>
            ) : (
              <>
                <svg className="w-4 h-4 text-purple group-hover:translate-y-0.5 transition-transform duration-200 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span className="whitespace-nowrap">Download Quote as PDF</span>
              </>
            )}
          </button>
        </motion.div>
      </div>
    </main>
  );
}

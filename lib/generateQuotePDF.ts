import jsPDF from "jspdf";

// Colors
const BG = [0, 3, 25] as const;
const WHITE = [255, 255, 255] as const;
const PURPLE = [203, 172, 249] as const;
const MUTED = [160, 163, 185] as const;
const SUBTLE = [130, 133, 155] as const;
const DIVIDER = [40, 43, 65] as const;

const PW = 210; // A4 width
const PH = 297; // A4 height
const ML = 22;
const CW = PW - ML * 2; // 166mm

function bg(pdf: jsPDF) {
  pdf.setFillColor(...BG);
  pdf.rect(0, 0, PW, PH, "F");
}

function newPage(pdf: jsPDF): number {
  pdf.addPage();
  bg(pdf);
  return 26;
}

function ensureSpace(pdf: jsPDF, y: number, need: number): number {
  return y + need > PH - 22 ? newPage(pdf) : y;
}

function divider(pdf: jsPDF, y: number): number {
  pdf.setDrawColor(...DIVIDER);
  pdf.setLineWidth(0.3);
  pdf.line(ML, y, PW - ML, y);
  return y;
}

function wrap(pdf: jsPDF, text: string, w: number): string[] {
  return pdf.splitTextToSize(text, w);
}

// Simple bullet character that works in helvetica
const BULLET = "-";

export default function generateQuotePDF() {
  const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  bg(pdf);

  let y = 28;

  // ═══════════════════════════════════
  // PAGE 1: Header + Table
  // ═══════════════════════════════════

  // ── HEADER ──
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(24);
  pdf.setTextColor(...WHITE);
  pdf.text("Blessan Alex", ML, y);

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(12);
  pdf.setTextColor(...PURPLE);
  pdf.text("Freelance Web Developer & Consultant", ML, y + 9);

  pdf.setFontSize(10);
  pdf.setTextColor(...MUTED);
  pdf.text("contact@blessanalex.dev", PW - ML, y + 1, { align: "right" });
  pdf.text("+91 9188563150", PW - ML, y + 6, { align: "right" });

  y += 20;
  divider(pdf, y);
  y += 16;

  // ── PROPOSAL LABEL + TITLE ──
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(9);
  pdf.setTextColor(...PURPLE);
  pdf.text("P R O P O S A L", ML, y);
  y += 10;

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(22);
  pdf.setTextColor(...WHITE);
  pdf.text("Website Design &", ML, y);
  y += 9;
  pdf.text("Development Proposal", ML, y);
  y += 14;

  // ── INTRO ──
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(11);
  pdf.setTextColor(...MUTED);
  const intro = "Thank you for considering my services for your new website. Whether you are looking for a simple digital identity or a robust, search-optimized platform that grows with your business, I have tailored the options below to give you complete transparency and control over your investment.";
  const iL = wrap(pdf, intro, CW);
  iL.forEach((l: string) => { pdf.text(l, ML, y); y += 5.5; });

  y += 16;

  // ── INVESTMENT BREAKDOWN ──
  pdf.setFontSize(9);
  pdf.setTextColor(...PURPLE);
  pdf.text("I N V E S T M E N T   B R E A K D O W N", ML, y);
  y += 8;

  pdf.setFontSize(10.5);
  pdf.setTextColor(...SUBTLE);
  pdf.text("Below is the itemized pricing for the website development, infrastructure, and optimization services.", ML, y);
  y += 10;

  // Table
  const c1 = 48, c2 = 66, c3 = CW - c1 - c2;

  // Header row
  pdf.setFillColor(15, 18, 40);
  pdf.roundedRect(ML, y, CW, 11, 2, 2, "F");
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(8.5);
  pdf.setTextColor(...SUBTLE);
  pdf.text("SERVICE", ML + 6, y + 7);
  pdf.text("DESCRIPTION", ML + c1 + 5, y + 7);
  pdf.text("INVESTMENT", ML + c1 + c2 + 5, y + 7);
  y += 11;
  const tStart = y - 11;

  const rows = [
    { s: "Page Design & Development", d: "Custom design and development per individual webpage. Includes mobile optimization.", p: "Rs.2,500 / page" },
    { s: "Domain & Hosting", d: "Server space and domain name (e.g., .com, .in). Price varies by name and hosting tier.", p: "Rs.500 - Rs.2,500 / yr" },
    { s: "Professional Email", d: "Custom business email (e.g., you@yourdomain.com) with 10GB storage.", p: "Rs.600 - Rs.1,000 / yr" },
    { s: "Comprehensive SEO", d: "Full on-page and technical optimization, plus off-page strategy.", p: "Rs.10,000" },
  ];

  rows.forEach((row, i) => {
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(10);
    const dLines = wrap(pdf, row.d, c2 - 10);
    const rH = Math.max(16, 10 + dLines.length * 5);

    if (i % 2 === 0) {
      pdf.setFillColor(8, 11, 33);
      pdf.rect(ML, y, CW, rH, "F");
    }
    if (i < rows.length - 1) {
      pdf.setDrawColor(30, 33, 55);
      pdf.setLineWidth(0.2);
      pdf.line(ML, y + rH, ML + CW, y + rH);
    }

    // Service
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(10);
    pdf.setTextColor(...WHITE);
    const sLines = wrap(pdf, row.s, c1 - 10);
    sLines.forEach((l: string, li: number) => {
      pdf.text(l, ML + 6, y + 8 + li * 5);
    });

    // Description
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(9.5);
    pdf.setTextColor(...MUTED);
    dLines.forEach((l: string, li: number) => {
      pdf.text(l, ML + c1 + 5, y + 8 + li * 5);
    });

    // Price
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(10);
    pdf.setTextColor(...PURPLE);
    pdf.text(row.p, ML + c1 + c2 + 5, y + 8);

    y += rH;
  });

  // Table border
  pdf.setDrawColor(...DIVIDER);
  pdf.setLineWidth(0.3);
  pdf.roundedRect(ML, tStart, CW, y - tStart, 2, 2, "S");

  // ═══════════════════════════════════
  // PAGE 2: Pathways + Next Steps + Sig
  // ═══════════════════════════════════
  y = newPage(pdf);

  // ── STRATEGIC PATHWAYS ──
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(9);
  pdf.setTextColor(...PURPLE);
  pdf.text("S T R A T E G I C   P A T H W A Y S", ML, y);
  y += 8;

  pdf.setFontSize(10.5);
  pdf.setTextColor(...SUBTLE);
  const pDesc = "To help you decide, I have broken down the two most common approaches clients take depending on their current business goals.";
  const pL = wrap(pdf, pDesc, CW);
  pL.forEach((l: string) => { pdf.text(l, ML, y); y += 5.5; });
  y += 10;

  // Cards
  const gap = 8;
  const cardW = (CW - gap) / 2;
  const pad = 7;
  const tw = cardW - pad * 2; // text width inside card

  // Pre-measure card content to get equal heights
  pdf.setFontSize(9.5);
  const c1Desc = "If you only need a digital business card for people to find your contact details, a single-page setup is perfect.";
  const c1DL = wrap(pdf, c1Desc, tw);
  const b1L1 = wrap(pdf, "Website design (Rs.2,500/page) + Domain/Hosting + Professional Email", tw - 4);
  const c1H_calc = 22 + c1DL.length * 5 + 8 + b1L1.length * 4.5 + 6 + 4.5 + 8;

  const c2Desc = "If you want your website to actively work for you as a magnet for new clients, pair it with Comprehensive SEO.";
  const c2DL = wrap(pdf, c2Desc, tw);
  const c2H_calc = 22 + c2DL.length * 5 + 8 + 3 * 14 + 4;

  const cardH = Math.max(c1H_calc, c2H_calc);
  const x1 = ML;
  const x2 = ML + cardW + gap;

  // ─── Card 1: Digital Identity ───
  pdf.setDrawColor(...DIVIDER);
  pdf.setFillColor(8, 11, 33);
  pdf.roundedRect(x1, y, cardW, cardH, 3, 3, "FD");

  // Badge
  pdf.setFillColor(25, 20, 50);
  pdf.roundedRect(x1 + pad, y + pad, 11, 11, 2, 2, "F");
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(9);
  pdf.setTextColor(...PURPLE);
  pdf.text("01", x1 + pad + 2.8, y + pad + 7.5);

  // Title
  pdf.setFontSize(12);
  pdf.setTextColor(...WHITE);
  pdf.text("The Digital Identity", x1 + pad + 15, y + pad + 7.5);

  // Description
  let cy = y + 24;
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(9.5);
  pdf.setTextColor(...MUTED);
  c1DL.forEach((l: string) => { pdf.text(l, x1 + pad, cy); cy += 5; });

  cy += 6;

  // Bullet 1 - Includes
  pdf.setFontSize(9.5);
  pdf.setFont("helvetica", "bold");
  pdf.setTextColor(...PURPLE);
  pdf.text(BULLET, x1 + pad, cy);
  pdf.setTextColor(180, 183, 200);
  pdf.text("Includes:", x1 + pad + 5, cy);
  cy += 5;
  pdf.setFont("helvetica", "normal");
  pdf.setTextColor(...MUTED);
  b1L1.forEach((l: string) => { pdf.text(l, x1 + pad + 5, cy); cy += 4.5; });

  cy += 4;

  // Bullet 2 - Best for
  pdf.setFont("helvetica", "bold");
  pdf.setTextColor(...PURPLE);
  pdf.text(BULLET, x1 + pad, cy);
  pdf.setTextColor(180, 183, 200);
  pdf.text("Best for:", x1 + pad + 5, cy);
  cy += 5;
  pdf.setFont("helvetica", "normal");
  pdf.setTextColor(...MUTED);
  pdf.text("Quick, professional online presence", x1 + pad + 5, cy);

  // ─── Card 2: Growth Engine ───
  pdf.setDrawColor(80, 60, 120);
  pdf.setFillColor(12, 8, 30);
  pdf.roundedRect(x2, y, cardW, cardH, 3, 3, "FD");

  // Recommended badge — top-right corner, above the title
  pdf.setFillColor(40, 30, 65);
  pdf.roundedRect(x2 + cardW - 32, y + 3, 28, 7, 2, 2, "F");
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(6);
  pdf.setTextColor(...PURPLE);
  pdf.text("RECOMMENDED", x2 + cardW - 30, y + 7.5);

  // Badge
  pdf.setFillColor(35, 25, 60);
  pdf.roundedRect(x2 + pad, y + pad, 11, 11, 2, 2, "F");
  pdf.setFontSize(9);
  pdf.setTextColor(...PURPLE);
  pdf.text("02", x2 + pad + 2.8, y + pad + 7.5);

  // Title
  pdf.setFontSize(12);
  pdf.setTextColor(...WHITE);
  pdf.text("The Growth Engine", x2 + pad + 15, y + pad + 7.5);

  // Description
  let cy2 = y + 24;
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(9.5);
  pdf.setTextColor(...MUTED);
  c2DL.forEach((l: string) => { pdf.text(l, x2 + pad, cy2); cy2 += 5; });

  cy2 += 6;

  // Bullets
  const bullets = [
    { label: "Technical & On-Page SEO:", desc: "Backend and content optimization" },
    { label: "Keyword Optimization:", desc: "Low-to-medium competition keywords" },
    { label: "Off-Page Strategy:", desc: "Roadmap for building authority" },
  ];

  bullets.forEach((b) => {
    pdf.setFontSize(9.5);
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(...PURPLE);
    pdf.text(BULLET, x2 + pad, cy2);
    pdf.setTextColor(180, 183, 200);
    pdf.text(b.label, x2 + pad + 5, cy2);
    cy2 += 5;
    pdf.setFont("helvetica", "normal");
    pdf.setTextColor(...MUTED);
    pdf.text(b.desc, x2 + pad + 5, cy2);
    cy2 += 9;
  });

  y += cardH + 14;

  // ── SEO NOTE ──
  pdf.setFontSize(9.5);
  const seoText = "SEO is not a magic bullet. It is a long-term investment. Just as a physical store needs a solid reputation to attract foot traffic, your website will grow organically alongside your business.";
  const seoL = wrap(pdf, seoText, CW - 18);
  const noteH = 16 + seoL.length * 5.5;

  pdf.setDrawColor(...DIVIDER);
  pdf.setFillColor(8, 11, 33);
  pdf.roundedRect(ML, y, CW, noteH, 2, 2, "FD");

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(9.5);
  pdf.setTextColor(180, 183, 200);
  pdf.text("A note on SEO expectations:", ML + 8, y + 9);
  pdf.setFont("helvetica", "normal");
  pdf.setTextColor(...SUBTLE);
  seoL.forEach((l: string, i: number) => {
    pdf.text(l, ML + 8, y + 16 + i * 5.5);
  });

  y += noteH + 18;

  // ── NEXT STEPS ──
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(9);
  pdf.setTextColor(...PURPLE);
  pdf.text("N E X T   S T E P S", ML, y);
  y += 10;

  pdf.setFontSize(11);
  pdf.setTextColor(...MUTED);
  const nL = wrap(pdf, "Please review the pricing and let me know how many pages you envision for the site and whether you would like to proceed with the SEO integration. Once we finalize the scope, I will send over the final invoice and project timeline.", CW);
  nL.forEach((l: string) => { pdf.text(l, ML, y); y += 6; });

  y += 6;
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(11);
  pdf.setTextColor(190, 193, 210);
  pdf.text("Looking forward to building something great together!", ML, y);

  y += 20;

  // ── SIGNATURE ──
  divider(pdf, y);
  y += 10;

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10.5);
  pdf.setTextColor(...MUTED);
  pdf.text("Best regards,", ML, y);
  y += 9;

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(18);
  pdf.setTextColor(...WHITE);
  pdf.text("Blessan", ML, y);
  y += 7;

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10);
  pdf.setTextColor(...MUTED);
  pdf.text("Freelance Web Developer", ML, y);
  y += 6;

  pdf.setFontSize(9.5);
  pdf.setTextColor(...SUBTLE);
  pdf.text("contact@blessanalex.dev  |  +91 9188563150", ML, y);

  pdf.save("Website Quote.pdf");
}

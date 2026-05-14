import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Website Design & Development Quote | Blessan Alex",
  description:
    "Professional website design and development proposal by Blessan Alex — Freelance Web Developer & Consultant. Transparent pricing, SEO strategy, and tailored digital solutions.",
  openGraph: {
    title: "Website Design & Development Quote | Blessan Alex",
    description:
      "Professional website design and development proposal with transparent pricing and SEO strategy.",
    type: "website",
    locale: "en_US",
    url: "https://blessan.vercel.app/quote",
    siteName: "Blessan Alex — Web Developer",
  },
  twitter: {
    card: "summary_large_image",
    title: "Website Design & Development Quote | Blessan Alex",
    description:
      "Professional website design and development proposal with transparent pricing and SEO strategy.",
  },
};

export default function QuoteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

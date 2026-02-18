import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "./provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blessan | Full Stack Web & App Developer",
  description: "About me, Full Stack Web Developer and App Developer.",
  openGraph: {
    title: "Blessan | Full Stack Web & App Developer",
    description: "About me, Full Stack Web Developer and App Developer.",
    type: "website",
    locale: "en_US",
    url: "https://blessan.vercel.app/", // Replace with actual URL if known, or omit
    siteName: "Blessan's Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blessan | Full Stack Web & App Developer",
    description: "About me, Full Stack Web Developer and App Developer.",
    creator: "@blessan", // Replace with actual handle if known
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/blesstitle.png" sizes="any" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

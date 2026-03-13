import type { Metadata, Viewport } from "next";

import { PERSONAL_INFO } from "@/constants/portfolio";
import "./globals.css";
import { Cursor } from "@/components/layout/Cursor";
import { Navbar } from "@/components/layout/Navbar";

/* ─── Metadata ───────────────────────────────── */
export const metadata: Metadata = {
  title: {
    default: `${PERSONAL_INFO.name} — ${PERSONAL_INFO.role}`,
    template: `%s | ${PERSONAL_INFO.name}`,
  },
  description: PERSONAL_INFO.bio,
  keywords: [
    "MERN Stack Developer",
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "Full Stack Developer",
    "Ahmedabad",
  ],
  authors: [{ name: PERSONAL_INFO.name, url: PERSONAL_INFO.linkedin }],
  creator: PERSONAL_INFO.name,
  openGraph: {
    title: `${PERSONAL_INFO.name} — ${PERSONAL_INFO.role}`,
    description: PERSONAL_INFO.bio,
    type: "website",
    locale: "en_IN",
    siteName: `${PERSONAL_INFO.name} Portfolio`,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0d0d0d",
  width: "device-width",
  initialScale: 1,
};

/* ─── Layout ─────────────────────────────────── */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {/* Cursor — client only, no SSR */}
        <Cursor />
        <Navbar />
        {children}
      </body>
    </html>
  );
}

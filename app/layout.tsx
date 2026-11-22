import type { Metadata, Viewport } from "next";
import { Anek_Latin } from "next/font/google";

import { NAV_LINKS, PERSONAL_INFO } from "@/constants/portfolio";
import { Navbar } from "@/components/layout/Navbar";
import "./globals.css";

const anek = Anek_Latin({
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
  variable: "--font",
});

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
  themeColor: "#32103f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={anek.variable} data-scroll-behavior="smooth" suppressHydrationWarning>
      <body>
        <Navbar links={NAV_LINKS} />
        {children}
      </body>
    </html>
  );
}


import type { Metadata, Viewport } from "next";
import { Manrope, Space_Grotesk, DM_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : undefined);

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title: {
    default: "Nikhil Kumar — Software, AI & Ideas",
    template: "%s — Nikhil Kumar",
  },
  description:
    "The personal website of Nikhil Kumar, a Computer Science and Data Science student building across AI/ML, full-stack development, data analytics, and competitive programming.",
  applicationName: "Nikhil Kumar — Personal Website",
  authors: [
    {
      name: "Nikhil Kumar",
      url: "https://github.com/nikhilkyumar",
    },
  ],
  creator: "Nikhil Kumar",
  keywords: [
    "Nikhil Kumar",
    "software developer",
    "computer science",
    "data science",
    "AI/ML",
    "computer vision",
    "full-stack development",
    "C++",
    "competitive programming",
    "portfolio",
  ],
  ...(siteUrl ? { alternates: { canonical: "/" } } : {}),
  openGraph: {
    type: "website",
    locale: "en_IN",
    ...(siteUrl ? { url: "/" } : {}),
    title: "Nikhil Kumar — Software, AI & Ideas",
    description:
      "Projects, experiments, C++ problem solving, and what I'm learning along the way.",
    siteName: "Nikhil Kumar",
    ...(siteUrl
      ? {
          images: [
            {
              url: `${siteUrl}/og-card.svg`,
              width: 1200,
              height: 630,
              alt: "Nikhil Kumar — Software, AI & Ideas",
            },
          ],
        }
      : {}),
  },
  twitter: {
    card: "summary_large_image",
    title: "Nikhil Kumar — Software, AI & Ideas",
    description:
      "Projects, experiments, C++ problem solving, and what I'm learning along the way.",
    ...(siteUrl ? { images: [`${siteUrl}/og-card.svg`] } : {}),
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f7f5ef",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Nikhil Kumar",
    ...(siteUrl ? { url: siteUrl } : {}),
    email: "mailto:nikhilkumar.cout@gmail.com",
    ...(siteUrl
      ? { image: `${siteUrl}/images/nikhil-portrait.webp` }
      : {}),
    description:
      "Computer Science and Data Science student exploring software engineering, AI/ML, data analytics, and competitive programming.",
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "GL Bajaj Institute of Technology and Management",
    },
    sameAs: [
      "https://github.com/nikhilkyumar",
      "https://www.linkedin.com/in/nikhilkyumar/",
      "https://codolio.com/profile/nikhilkyumar",
      "https://codeforces.com/profile/nikhilkyumar",
    ],
    knowsAbout: [
      "Python",
      "Java",
      "C++",
      "SQL",
      "JavaScript",
      "React",
      "Node.js",
      "Next.js",
      "FastAPI",
      "Flutter",
      "TensorFlow",
      "Computer Vision",
      "Data Analytics",
      "Football Analytics",
      "Competitive Programming",
      "Full-Stack Development",
    ],
  };

  return (
    <html
      lang="en-IN"
      className={`${manrope.variable} ${spaceGrotesk.variable} ${dmMono.variable}`}
    >
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>

        {children}

        {/* Vercel Web Analytics */}
        <Analytics />

        {/* Person structured data for search engines */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}

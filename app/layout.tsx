import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Marcello Lienarta | Senior Multipurpose Developer",
  description: "Professional portfolio of a senior multipurpose developer with 5 years of experience.",
  keywords: ["Marcello Lienarta", "Senior Developer", "Multipurpose Developer", "Web Development", "Portfolio", "Frontend", "Backend", "Fullstack", "React", "Next.js"],
  authors: [{ name: "Marcello Lienarta" }],
  creator: "Marcello Lienarta",
  openGraph: {
    title: "Marcello Lienarta | Senior Multipurpose Developer",
    description: "Professional portfolio of a senior multipurpose developer with 5 years of experience.",
    url: "https://celloportfolio.vercel.app/",
    siteName: "Marcello Lienarta Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Marcello Lienarta | Senior Multipurpose Developer",
    description: "Professional portfolio of a senior multipurpose developer with 5 years of experience.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: "https://celloportfolio.vercel.app/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <ThemeProvider>
          {children}
          <div className="scanline"></div>
        </ThemeProvider>
      </body>
    </html>
  );
}

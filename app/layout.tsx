import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
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
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans overflow-x-hidden">
        <ThemeProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow pt-16">
              {children}
            </main>
            <Footer />
          </div>
          <div className="scanline"></div>
        </ThemeProvider>
      </body>
    </html>
  );
}

import "./globals.css";
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import { Space_Grotesk } from "next/font/google";
import { EdgeStoreProvider } from "@/lib/edgestore";
import { ThemeProvider } from "@/components/theme-provider";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "DevBlog - Modern Tech Blog",
  description:
    "A modern tech blog built with Next.js, featuring the latest in web development, programming, and technology trends.",
  keywords: ["blog", "tech", "web development", "programming", "next.js"],
  authors: [{ name: "DevBlog Team" }],
  openGraph: {
    title: "DevBlog - Modern Tech Blog",
    description: "A modern tech blog built with Next.js",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "DevBlog - Modern Tech Blog",
    description: "A modern tech blog built with Next.js",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${spaceGrotesk.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <EdgeStoreProvider>{children}</EdgeStoreProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

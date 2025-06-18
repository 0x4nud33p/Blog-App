import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { AuthProvider } from '@/components/auth-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DevBlog - Modern Tech Blog',
  description: 'A modern tech blog built with Next.js, featuring the latest in web development, programming, and technology trends.',
  keywords: ['blog', 'tech', 'web development', 'programming', 'next.js'],
  authors: [{ name: 'DevBlog Team' }],
  openGraph: {
    title: 'DevBlog - Modern Tech Blog',
    description: 'A modern tech blog built with Next.js',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DevBlog - Modern Tech Blog',
    description: 'A modern tech blog built with Next.js',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ghazi Rabeh | Full Stack Developer',
  description: 'Portfolio of Ghazi Rabeh, a full stack web developer specializing in Next.js, React, Angular, Spring Boot, Laravel, Node.js, MySQL, and MongoDB.',
  keywords: ['web developer', 'full stack', 'Next.js', 'React', 'Angular', 'Spring Boot', 'Laravel'],
  authors: [{ name: 'Ghazi Rabeh' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ghazirabeh.com',
    title: 'Ghazi Rabeh | Full Stack Developer',
    description: 'Portfolio of Ghazi Rabeh, a full stack web developer specializing in Next.js, React, Angular, Spring Boot, Laravel, Node.js, MySQL, and MongoDB.',
    siteName: 'Ghazi Rabeh Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ghazi Rabeh | Full Stack Developer',
    description: 'Portfolio of Ghazi Rabeh, a full stack web developer specializing in Next.js, React, Angular, Spring Boot, Laravel, Node.js, MySQL, and MongoDB.',
  },
  robots: {
    index: true,
    follow: true,
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
          disableTransitionOnChange={false}
        >
          <div className="relative flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
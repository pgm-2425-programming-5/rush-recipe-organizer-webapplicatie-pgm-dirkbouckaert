import type { Metadata } from 'next';
import { Quicksand } from 'next/font/google';

import './globals.css';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const quicksand = Quicksand({
  weight: ['400', '700'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Recipe Organizer',
  description: 'Organiseer jouw recepten met gemak.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${quicksand.className} flex h-screen flex-col bg-slate-50 antialiased`}
      >
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

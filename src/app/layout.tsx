import '../styles/globals.css';
import '../styles/mdx.css';
import { type ReactNode } from 'react';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import { cn } from '~/utils/cn';

import { SiteHeader } from '~/components/site-header';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const cal = localFont({
  src: '../styles/calsans.ttf',
  variable: '--font-cal',
  display: 'swap',
});

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <title>tRPC Kitchen Sink</title>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta
          name="description"
          content="Your go-to place to find out how to find solutions to common problems."
        />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={cn(
          'min-h-screen bg-white font-sans text-zinc-900 antialiased dark:bg-zinc-900 dark:text-zinc-50',
          cal.variable,
          inter.variable,
        )}
      >
        <SiteHeader />
        <main className="container mx-auto flex-1 px-4">{children}</main>
      </body>
    </html>
  );
}

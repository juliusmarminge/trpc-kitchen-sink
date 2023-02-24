import type { AppProps } from 'next/app';
import { Inter as FontSans } from 'next/font/google';
import Head from 'next/head';

import { SiteHeader } from '~/components/site-header';
import '~/styles/globals.css';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>tRPC Kitchen Sink</title>
        <meta
          name="description"
          content="Your go-to place to find out how to find solutions to common problems."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <style jsx global>{`
				:root {
					--font-sans: ${fontSans.style.fontFamily};
				}
			}`}</style>

      <SiteHeader />
      <main>
        <Component {...pageProps} />
      </main>
    </>
  );
}

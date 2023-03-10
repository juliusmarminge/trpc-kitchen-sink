import * as React from 'react';
import Link from 'next/link';

import { buttonVariants } from '~/components/ui/button';

export default function IndexPage() {
  return (
    <section className="container grid items-center gap-6 pt-6 pb-8 md:py-10">
      <div className="max-w-5xlxl flex flex-col items-start gap-2">
        <h1 className="font-cal text-3xl font-extrabold sm:text-3xl md:text-5xl lg:text-6xl">
          A collection of tRPC usage patterns
        </h1>
        <p className="max-w-[700px] font-cal text-lg text-zinc-700 dark:text-zinc-400 sm:text-xl">
          Your go-to place to find solutions to common problems integrating tRPC
          with other libraries.
        </p>
      </div>
      <div className="flex gap-4">
        <Link href="/features/forms" className={buttonVariants({ size: 'lg' })}>
          See the samples
        </Link>
        <a
          href="https://github.com/trpc/examples-kitchen-sink"
          target="_blank"
          rel="noreferrer"
          className={buttonVariants({ variant: 'outline', size: 'lg' })}
        >
          View source on GitHub
        </a>
      </div>
      <div>{'<insert something great here>'}</div>
    </section>
  );
}

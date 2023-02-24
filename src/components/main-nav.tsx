import * as React from 'react';
import Link from 'next/link';

import { TRPCIcon } from './icons';

type Navitem = {
  title: string;
  href: string;
};
const items: Navitem[] = [
  { title: 'Home', href: '/' },
  {
    title: 'Documentation',
    href: 'https://trpc.io/docs',
  },
];

export function MainNav() {
  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="hidden items-center space-x-2 md:flex">
        <TRPCIcon className="h-6 w-6" />
        <span className="hidden font-bold sm:inline-block">Kitchen Sink</span>
      </Link>

      <nav className="hidden gap-6 md:flex">
        {items?.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center text-lg font-semibold text-zinc-600 hover:text-zinc-900 dark:text-zinc-100 sm:text-sm"
          >
            {item.title}
          </Link>
        ))}
      </nav>
    </div>
  );
}

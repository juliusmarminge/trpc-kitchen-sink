import * as React from 'react';
import Link from 'next/link';
import { navItems } from '~/app/site.config';

import { TRPCIcon } from './icons';

export function MainNav() {
  return (
    <div className="hidden gap-6 md:flex md:gap-10">
      <Link href="/" className="flex items-center space-x-2">
        <TRPCIcon className="h-8 w-8" />
        <span className="hidden font-cal text-2xl font-bold tracking-wide sm:inline-block">
          tRPC
        </span>
      </Link>

      <nav className="flex gap-6">
        {navItems.map((item) =>
          item.href ? (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center text-lg font-semibold text-zinc-600 hover:text-zinc-900 dark:text-zinc-100 sm:text-sm"
            >
              {item.title}
              {item.label && (
                <span className="ml-2 rounded-md bg-yellow-200 px-1.5 py-0.5 text-xs no-underline group-hover:no-underline dark:text-zinc-900">
                  {item.label}
                </span>
              )}
            </Link>
          ) : (
            <p
              key={item.title}
              className="flex cursor-default items-center text-lg font-semibold text-zinc-600 dark:text-zinc-400 sm:text-sm"
            >
              {item.title}
              {item.label && (
                <span className="ml-2 rounded-md bg-amber-200 px-1 py-0.5 text-xs dark:text-zinc-900">
                  {item.label}
                </span>
              )}
            </p>
          ),
        )}
      </nav>
    </div>
  );
}

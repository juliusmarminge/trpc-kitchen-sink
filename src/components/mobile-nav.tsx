import React from 'react';
import Link from 'next/link';
import { docSidebar, navItems } from '~/app/site.config';
import { cn } from '~/utils/cn';

import { TRPCIcon } from './icons';
import { Button } from './ui/button';
import { Sheet, SheetClose, SheetContent, SheetTrigger } from './ui/sheet';

export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="space-x-2 md:hidden">
          <TRPCIcon className="h-8 w-8" />
          <span className="font-cal text-2xl font-bold tracking-wide">
            tRPC
          </span>
        </Button>
      </SheetTrigger>
      <SheetContent position="left" size="lg" className="py-12">
        <div className="space-y-2">
          {navItems.map((item) =>
            item.href ? (
              <SheetClose asChild key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center text-lg font-semibold text-zinc-600 hover:text-zinc-900 dark:text-zinc-100 sm:text-sm"
                >
                  {item.title}
                  {item.label && (
                    <span className="ml-2 rounded-md bg-amber-200 px-1.5 py-0.5 text-xs no-underline group-hover:no-underline dark:text-zinc-900">
                      {item.label}
                    </span>
                  )}
                </Link>
              </SheetClose>
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
        </div>
        <div className="my-4 h-1 w-full bg-zinc-700" />
        <div className="space-y-4">
          {Object.entries(docSidebar).map(([title, items]) => (
            <div key={title}>
              <h3 className="mb-2 text-base font-semibold text-zinc-900 dark:text-zinc-100">
                {title}
              </h3>
              {items.map((item, index) => (
                <SheetClose asChild key={item.href}>
                  <Link
                    key={index}
                    href={item.href}
                    className={cn(
                      'group flex w-full items-center rounded-l-md py-1.5 px-2 hover:bg-zinc-50 dark:hover:bg-zinc-800',
                    )}
                  >
                    {item.title}
                  </Link>
                </SheetClose>
              ))}
            </div>
          ))}

          {/* {docSidebar.map((item) => (
            <SheetClose asChild key={item.href}>
              <Link
                href={item.href}
                className="flex items-center text-lg font-semibold text-zinc-600 hover:text-zinc-900 dark:text-zinc-100 sm:text-sm"
              >
                {item.title}
              </Link>
            </SheetClose>
          ))} */}
        </div>
      </SheetContent>
    </Sheet>
  );
}

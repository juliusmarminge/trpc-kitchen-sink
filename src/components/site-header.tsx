import Link from 'next/link';
import { Github, Twitter } from 'lucide-react';

import { MainNav } from '~/components/main-nav';
import { ThemeToggle } from '~/components/theme-toggle';
import { buttonVariants } from '~/components/ui/button';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-b-zinc-200 bg-white dark:border-b-zinc-700 dark:bg-zinc-900">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <Link
              href="https://github.com/trpc/examples-kitchen-sink"
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={buttonVariants({
                  size: 'sm',
                  variant: 'ghost',
                  className: 'text-zinc-700 dark:text-zinc-400',
                })}
              >
                <Github className="h-5 w-5" />
              </div>
            </Link>
            <Link
              href="https://twitter.com/trpcio"
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={buttonVariants({
                  size: 'sm',
                  variant: 'ghost',
                  className: 'text-zinc-700 dark:text-zinc-400',
                })}
              >
                <Twitter className="h-5 w-5 fill-current" />
              </div>
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}

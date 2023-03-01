import { Github, Twitter } from 'lucide-react';

import { MainNav } from '~/components/desktop-nav';
import { ThemeToggle } from '~/components/theme-toggle';
import { buttonVariants } from '~/components/ui/button';
import { MobileNav } from './mobile-nav';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-b-zinc-200 bg-white dark:border-b-zinc-700 dark:bg-zinc-900">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav />
        <MobileNav />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <a
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
            </a>
            <a
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
            </a>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}

import Link from 'next/link';
import { docSidebar } from '~/app/site.config';
import { cn } from '~/utils/cn';

import { buttonVariants } from './ui/button';

export interface DocsSidebarNavProps {
  pathname: string;
}

export function DocsSidebarNav({ pathname }: DocsSidebarNavProps) {
  return (
    <div className="w-full space-y-4">
      {Object.entries(docSidebar).map(([title, items]) => (
        <div key={title}>
          <h3 className="mb-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            {title}
          </h3>
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={cn(
                buttonVariants({ variant: 'ghost' }),
                'w-full justify-start rounded-r-none',
                pathname === item.href && 'bg-zinc-100 dark:bg-zinc-800',
              )}
            >
              {item.title}
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
}

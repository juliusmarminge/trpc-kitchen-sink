import Link from 'next/link';
import { Home } from 'lucide-react';
import { cn } from '~/utils/cn';

import { buttonVariants } from '~/components/ui/button';

export function Breadcrumbs(props: { slug: string[] }) {
  return (
    <nav className="flex items-center text-sm font-medium text-zinc-500 dark:text-zinc-400">
      <Link href="/" className={cn(buttonVariants({ variant: 'ghost' }))}>
        <Home size={16} className="mr-1" />
      </Link>
      <span className="mx-2" aria-hidden="true">
        /
      </span>
      <Link
        href="/docs/introduction"
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'font-cal text-base capitalize',
        )}
      >
        Docs
      </Link>
      <span className="mx-2" aria-hidden="true">
        /
      </span>
      {props.slug.map((slug, index) => (
        <span key={slug}>
          <Link
            href={`/docs/${props.slug.slice(0, index + 1).join('/')}`}
            className={cn(
              buttonVariants({ variant: 'ghost' }),
              'font-cal text-base capitalize',
            )}
          >
            {slug}
          </Link>
          {index < props.slug.length - 1 && (
            <span className="mx-2" aria-hidden="true">
              /
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}

import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { docSidebar } from '~/app/site.config';
import { cn } from '~/utils/cn';

import { buttonVariants } from '~/components/ui/button';

export default function Pagination(props: { pathname: string }) {
  console.log(props.pathname);
  const current = docSidebar.findIndex((item) => item.href === props.pathname);
  const prev = docSidebar[current - 1];
  const next = docSidebar[current + 1];

  return (
    <div className="mt-10 flex w-full items-center justify-between border-t border-zinc-100 py-4 dark:border-zinc-700">
      {prev ? (
        <Link
          href={prev.href}
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            'self-start text-base',
          )}
        >
          <ChevronLeft size={16} className="text-md mr-2" />
          {prev.title}
        </Link>
      ) : (
        <div />
      )}

      {next && (
        <Link
          href={next.href}
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            'self-end text-base',
          )}
        >
          {next.title}
          <ChevronRight size={16} className="ml-2" />
        </Link>
      )}
    </div>
  );
}

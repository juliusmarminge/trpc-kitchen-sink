import Link from 'next/link';
import { cn } from '~/utils/cn';

export interface DocsSidebarNavProps {
  items: {
    title: string;
    href: string;
    external?: boolean;
    disabled?: boolean;
    label?: string;
  }[];
  pathname: string;
}

export function DocsSidebarNav({ items, pathname }: DocsSidebarNavProps) {
  if (!items.length) return null;
  return (
    <div className="w-full">
      {items.map((item, index) => (
        <Link
          key={index}
          href={item.href}
          className={cn(
            'group flex w-full items-center rounded-l-md py-1.5 px-2 hover:bg-zinc-50 dark:hover:bg-zinc-800',
            item.disabled && 'cursor-not-allowed opacity-60',
            {
              'bg-zinc-100 dark:bg-zinc-800': pathname === item.href,
            },
          )}
          target={item.external ? '_blank' : ''}
          rel={item.external ? 'noreferrer' : ''}
        >
          {item.title}
          {item.label && (
            <span className="ml-2 rounded-md bg-teal-100 px-1.5 py-0.5 text-xs no-underline group-hover:no-underline dark:text-zinc-900">
              {item.label}
            </span>
          )}
        </Link>
      ))}
    </div>
  );
}

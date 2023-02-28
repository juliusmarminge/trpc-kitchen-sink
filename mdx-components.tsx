import type { MDXComponents } from 'mdx/types';

// Currently not used, using client-side MDX instead.
/* @see file://./src/app/docs/use-mdx.tsx */

// This file is required to use MDX in `app` directory.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    h1: ({ children }) => (
      <h1 className="scroll-m-20 font-cal text-4xl lg:text-5xl">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="mt-10 scroll-m-20 border-b border-b-zinc-200 pb-2 font-cal text-3xl transition-colors first:mt-0 dark:border-b-zinc-700">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 scroll-m-20 font-cal text-2xl">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="leading-7 [&:not(:first-child)]:mt-6">{children}</p>
    ),
    code: ({ children }) => (
      <code className="relative rounded bg-zinc-100 py-[0.2rem] px-[0.3rem] font-mono text-sm font-semibold text-zinc-900 dark:bg-zinc-800 dark:text-zinc-400">
        {children}
      </code>
    ),

    ...components,
  };
}

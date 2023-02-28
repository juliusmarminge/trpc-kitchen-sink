'use client';

import { useMDXComponent } from 'next-contentlayer/hooks';

// TODO: use root `useMDXComponents` instead for RSC

export function MdxComponent(props: { code: string }) {
  const Component = useMDXComponent(props.code);
  return (
    <Component
      components={{
        // Allows customizing built-in components, e.g. to add styling.
        h1: ({ children }) => (
          <h1 className="scroll-m-20 font-cal text-4xl lg:text-5xl">
            {children}
          </h1>
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
          <code className="relative rounded-lg bg-zinc-100 px-1.5 py-0.5 font-mono text-sm font-semibold text-zinc-900 dark:bg-zinc-800 dark:text-zinc-400">
            {children}
          </code>
        ),
        pre: ({ children }) => (
          <pre className="relative rounded-lg bg-zinc-100 p-4 font-mono text-sm font-semibold text-zinc-900 dark:bg-zinc-800 dark:text-zinc-400">
            {children}
          </pre>
        ),
      }}
    />
  );
}

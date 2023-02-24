import { httpBatchLink, loggerLink } from '@trpc/client';
import { createTRPCNext } from '@trpc/next';
import superjson from 'superjson';
import type { AppRouter } from '~/server/trpc/routers/index';

function getBaseUrl() {
  if (typeof window !== 'undefined') return '';

  // reference for vercel.com
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;

  // reference for render.com
  if (process.env.RENDER_INTERNAL_HOSTNAME)
    return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`;

  // assume localhost in dev
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export const trpc = createTRPCNext<AppRouter>({
  /**
   * Config options:
   * @link https://trpc.io/docs/nextjs#createtrpcnext-options
   */
  config() {
    return {
      /** @link https://trpc.io/docs/data-transformers */
      transformer: superjson,
      /** @link https://trpc.io/docs/links */
      links: [
        // adds pretty logs to your console in development and logs errors in production
        loggerLink({
          enabled: () => true,
        }),
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
        }),
      ],
    };
  },
  /** @link https://trpc.io/docs/ssr */
  ssr: false,
});

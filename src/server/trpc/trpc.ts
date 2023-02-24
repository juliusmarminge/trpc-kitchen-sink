import { initTRPC } from '@trpc/server';
import superjson from 'superjson';
import { ZodError } from 'zod';

import { type createTRPCContext } from './context';

const t = initTRPC.context<typeof createTRPCContext>().create({
  /** @link https://trpc.io/docs/data-transformers */
  transformer: superjson,

  /** @link https://trpc.io/docs/error-formatting */
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        /** Fully inferred, typesafe errors using Zod */
        ZodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const router = t.router;
export const middleware = t.middleware;
export const publicProcedure = t.procedure;

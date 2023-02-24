/**
 * This file contains tRPC's HTTP response handler
 */
import { createNextApiHandler } from '@trpc/server/adapters/next';
import { createTRPCContext } from '~/server/trpc/context';
import { appRouter } from '~/server/trpc/routers';

export default createNextApiHandler({
  router: appRouter,
  /**
   * @link https://trpc.io/docs/context
   */
  createContext: createTRPCContext,
  /**
   * @link https://trpc.io/docs/error-handling
   */
  onError({ error }) {
    if (error.code === 'INTERNAL_SERVER_ERROR') {
      // send to bug reporting
      console.error('Something went wrong', error);
    }
  },
  /**
   * @link https://trpc.io/docs/caching#api-response-caching
   */
  // responseMeta() {
  //   // ...
  // },
});

import { type CreateNextContextOptions } from '@trpc/server/adapters/next';
import { getServerSession } from 'next-auth';
import { authOptions as nextAuthOptions } from '~/pages/api/auth/[...nextauth]';

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export const createTRPCContext = async (opts?: CreateNextContextOptions) => {
  const req = opts?.req;
  const res = opts?.res;

  // const session = opts && (await getServerSession(opts, nextAuthOptions));
  const session =
    req && res && (await getServerSession(req, res, nextAuthOptions));

  // for API-response caching see https://trpc.io/docs/caching
  return {
    req,
    res,
    session,
  };
};

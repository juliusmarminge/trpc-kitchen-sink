import { WebContainer } from '@webcontainer/api';

/**
 * Workaround to make sure that the WebContainer is only booted once.
 */
const globalForWc = globalThis as unknown as { wc?: Promise<WebContainer> };

export const wc = globalForWc.wc ?? WebContainer.boot();
if (process.env.NODE_ENV !== 'production') globalForWc.wc = wc;

import { NextResponse } from 'next/server';

export function middleware(req: Request) {
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set('Cross-Origin-Embedder-Policy', 'require-corp');
  requestHeaders.set('Cross-Origin-Opener-Policy', 'same-origin');

  console.log('running middleware', req.url);

  return NextResponse.next({
    headers: requestHeaders,
  });
}

export const config = {
  matcher: '/features/:feature*',
};

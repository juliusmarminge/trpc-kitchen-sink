import { NextResponse } from 'next/server';

export function middleware(req: Request) {
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set('Cross-Origin-Embedder-Policy', 'require-corp');
  requestHeaders.set('Cross-Origin-Opener-Policy', 'same-origin');

  return NextResponse.next({
    headers: requestHeaders,
  });
}

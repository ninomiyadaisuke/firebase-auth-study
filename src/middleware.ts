import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const nextUrl = req.nextUrl;
  const cookie = req.cookies.get('session')?.value;
  if (nextUrl.pathname === '/dashboard') {
    if (!cookie) {
      return NextResponse.rewrite(new URL('/dashboard', req.url));
    } else {
      return NextResponse.rewrite(new URL('/login', req.url));
    }
  }
}

export const config = {
  matcher: '/dashboard',
};

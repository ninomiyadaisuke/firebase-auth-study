import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const cookie = req.cookies.get('session')?.value;
  if (req.nextUrl.pathname.startsWith('/dashboard')) {
    if (!cookie) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: '/dashboard',
};

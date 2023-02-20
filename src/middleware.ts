import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const login = `${url.origin}/login`;
  // const cookie = req.cookies.get('session')?.value;
  // if (!cookie) {
  // if (authenticatedPaths.includes(url.pathname)) {
  return NextResponse.redirect(login);
  // }
  // }
  // return NextResponse.next();
}

export const config = {
  matcher: '/dashboard',
};

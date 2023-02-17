import { NextURL } from 'next/dist/server/web/next-url';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const authenticatedPaths: string[] = ['/dashboard'];

export function middleware(req: NextRequest) {
  const url: NextURL = req.nextUrl.clone();
  const login = `${url.origin}/login`;
  const cookie = req.cookies.get('session')?.value;
  if (!cookie) {
    if (authenticatedPaths.includes(url.pathname)) {
      return NextResponse.redirect(login);
    }
  }
  return NextResponse.next();
}

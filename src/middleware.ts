import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const login = () => {
    if (process.env.NODE_ENV === 'production') {
      return 'https://firebase-auth-study.vercel.app/login';
    }
    return 'http://localhost:3000/login';
  };
  const cookie = req.cookies.get('session')?.value;

  if (!cookie) {
    return NextResponse.redirect(new URL(login(), req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: '/dashboard',
};

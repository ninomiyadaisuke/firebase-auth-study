import { NextApiResponse } from 'next';
import { setCookie } from 'nookies';

export const logout = async () => {
  // セッションCookieを削除するため、Firebase SDKでなくREST APIでログアウトさせる
  await fetch('/api/sessionLogout', { method: 'POST' });
};

// 全てバックエンドのみで認証
export const assignSession = async (res: NextApiResponse, idToken: string, expiresIn: number) => {
  const SESSION_KEY = 'session';
  const COOKIE_OPTIONS = {
    maxAge: expiresIn,
    httpOnly: true,
    secure: true,
    path: '/',
  };
  setCookie({ res }, SESSION_KEY, idToken, COOKIE_OPTIONS);
};

export const signUp = async (email: string, password: string) => {
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  const body = JSON.stringify({ email, password, returnSecureToken: true });
  return await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  });
};

export const logIn = async (email: string, password: string) => {
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  const body = JSON.stringify({ email, password, returnSecureToken: true });
  return await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  });
};

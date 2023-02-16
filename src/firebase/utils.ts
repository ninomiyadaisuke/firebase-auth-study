import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { NextApiResponse } from 'next';
import { setCookie } from 'nookies';

import { auth } from './config';

// フロントエンドで認証し、バックエンドでcookieを設定する

export const signup = async (email: string, password: string) => {
  const result = await createUserWithEmailAndPassword(auth, email, password);
  const id = await result.user.getIdToken();
  // Cookieにセッションを付与するようにAPIを投げる
  await fetch('/api/session', { method: 'POST', body: JSON.stringify({ id }) });
};

export const login = async (email: string, password: string) => {
  // FirebaseAuthを取得する

  // メールアドレスとパスワードでログインする
  const result = await signInWithEmailAndPassword(auth, email, password);
  // セッションIDを作成するためのIDを作成する
  const id = await result.user.getIdToken();
  // Cookieにセッションを付与するようにAPIを投げる
  await fetch('/api/session', { method: 'POST', body: JSON.stringify({ id }) });
};

export const logout = async () => {
  // セッションCookieを削除するため、Firebase SDKでなくREST APIでログアウトさせる
  await fetch('/api/sessionLogout', { method: 'POST' });
};

// 全てバックエンドのみで認証
const apiKey = process.env.FIREBASE_API_KEY;

export const assignSession = (res: NextApiResponse, idToken: string) => {
  const SESSION_KEY = 'session';
  const COOKIE_OPTIONS = {
    maxAge: 60 * 60 * 24, // 1日
    httpOnly: true,
    secure: true,
    path: '/',
  };
  setCookie({ res }, SESSION_KEY, idToken, COOKIE_OPTIONS);
};

export const signUp = async (email: string, password: string) => {
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
  const body = JSON.stringify({ email, password, returnSecureToken: true });
  return await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  });
};

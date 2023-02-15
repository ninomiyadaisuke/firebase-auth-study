import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';

import { auth } from './config';

const provider = new GoogleAuthProvider();

export const googleLogin = async () => {
  const result = await signInWithPopup(auth, provider);
  // Firebase側のオブジェクトログイン済みユーザーのIdTokenをCookieに渡すようにする
  const id = await result.user.getIdToken();
  await fetch('/api/session', { method: 'POST', body: JSON.stringify({ id }) });
};

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

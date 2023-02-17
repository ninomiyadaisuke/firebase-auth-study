import type { NextApiHandler } from 'next';

import { firebaseAdmin } from '@/firebase/firebaseAdmin';
import { assignSession, logIn, signUp } from '@/firebase/utils';

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== 'POST') return res.status(404).send('Not Found');

  const auth = firebaseAdmin.auth();
  // Tokenの有効期限
  const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5日

  const { email, password, authentication } = req.body;

  if (authentication === 'signup') {
    const response = await signUp(email, password);
    if (!response.ok) {
      throw new Error('認証エラー');
    }
    const { idToken } = await response.json();
    const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn });
    await assignSession(res, sessionCookie, expiresIn);
    return res.send(JSON.stringify({ status: 'success' }));
  }

  if (authentication === 'login') {
    const response = await logIn(email, password);
    if (!response.ok) {
      throw new Error('認証エラー');
    }
    const { idToken } = await response.json();
    await assignSession(res, idToken, expiresIn);
    return res.send(JSON.stringify({ status: 'success' }));
  }
};

export default handler;

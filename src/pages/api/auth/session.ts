import type { NextApiHandler, NextApiRequest as Req, NextApiResponse as Res } from 'next';

import { assignSession, logIn,signUp } from '@/firebase/utils';

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== 'POST') return res.status(404).send('Not Found');
  const { email, password, authentication } = req.body;

  if (authentication === 'signup') {
    const response = await signUp(email, password);
    if (!response.ok) {
      throw new Error('認証エラー');
    }
    const { idToken } = await response.json();
    assignSession(res, idToken);
  }

  if (authentication === 'login') {
    const response = await logIn(email, password);
    if (!response.ok) {
      throw new Error('認証エラー');
    }
    const { idToken } = await response.json();
    assignSession(res, idToken);
  }

  res.send(JSON.stringify({ status: 'success' }));
};

export default handler;

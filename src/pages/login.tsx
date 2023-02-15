import type { NextPageWithLayout } from 'next';

import LoginForm from '@/features/auth/LoginForm';
import { baseLayout } from '@/pages/index';

const Login: NextPageWithLayout = () => {
  return <LoginForm />;
};

Login.getLayout = baseLayout;

export default Login;

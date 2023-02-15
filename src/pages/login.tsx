import type { NextPageWithLayout } from 'next';
import { ReactElement } from 'react';

import Layout from '@/components/layout/Layout';
import LoginForm from '@/features/auth/LoginForm';

const Login: NextPageWithLayout = () => {
  return <LoginForm />;
};

export const baseLayout = (page: ReactElement) => <Layout title="Login page">{page}</Layout>;

Login.getLayout = baseLayout;

export default Login;

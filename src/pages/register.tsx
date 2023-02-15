import type { NextPageWithLayout } from 'next';
import { ReactElement } from 'react';

import Layout from '@/components/layout/Layout';
import RegisterForm from '@/features/auth/RegisterForm';

const Register: NextPageWithLayout = () => {
  return <RegisterForm />;
};

export const baseLayout = (page: ReactElement) => <Layout title="Signup page">{page}</Layout>;

Register.getLayout = baseLayout;

export default Register;

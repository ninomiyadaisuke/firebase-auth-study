import type { NextPageWithLayout } from 'next';

import RegisterForm from '@/features/auth/RegisterForm';
import { baseLayout } from '@/pages/index';

const Register: NextPageWithLayout = () => {
  return <RegisterForm />;
};

Register.getLayout = baseLayout;

export default Register;

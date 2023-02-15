import type { NextPageWithLayout } from 'next';

import { baseLayout } from '@/pages/index';

const Register: NextPageWithLayout = () => {
  return <div>signup</div>;
};

Register.getLayout = baseLayout;

export default Register;

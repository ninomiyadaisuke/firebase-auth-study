import type { NextPageWithLayout } from 'next';

import { baseLayout } from '@/pages/index';

const Login: NextPageWithLayout = () => {
  return <div>login</div>;
};

Login.getLayout = baseLayout;

export default Login;

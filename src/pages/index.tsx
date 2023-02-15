import type { NextPageWithLayout } from 'next';
import { ReactElement } from 'react';

import Layout from '@/components/layout/Layout';

const Home: NextPageWithLayout = () => {
  return <div>top</div>;
};

export const baseLayout = (page: ReactElement) => <Layout>{page}</Layout>;

Home.getLayout = baseLayout;

export default Home;

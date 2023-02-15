import type { NextPageWithLayout } from 'next';
import { ReactElement } from 'react';

import Layout from '@/layout/Layout';

const Home: NextPageWithLayout = () => {
  return <div>test</div>;
};

export const baseLayout = (page: ReactElement) => <Layout>{page}</Layout>;

Home.getLayout = baseLayout;

export default Home;

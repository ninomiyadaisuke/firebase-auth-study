import type { GetServerSideProps, NextPageWithLayout } from 'next';
import { useRouter } from 'next/router';
import nookies from 'nookies';
import { ReactElement } from 'react';
import styled from 'styled-components';

import Layout from '@/components/layout/Layout';
import { firebaseAdmin } from '@/firebase/firebaseAdmin';
import { logout } from '@/firebase/utils';

const DashboardPage: NextPageWithLayout<{ user: { email: string; uid: string } }> = ({ user }) => {
  const router = useRouter();

  const onLogout = async () => {
    if (confirm('ログアウトしますか？')) {
      await logout();
      router.push('/login');
    }
  };

  return (
    <Wrapper>
      <Title>Dashboard Pages</Title>
      <Text>Email:{user.email}</Text>
      <Text>Uid:{user.uid}</Text>
      <Btn onClick={onLogout}>Logout</Btn>
    </Wrapper>
  );
};

export default DashboardPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx);
  const session = cookies.session || '';
  const user = await firebaseAdmin
    .auth()
    .verifySessionCookie(session, true)
    .catch((e) => console.error(e.message));

  if (!user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  return { props: { user: { email: user.email, uid: user.uid } } };
};

const Wrapper = styled.div`
  width: 80%;
  padding: 15px;
  border-radius: 5px;
  background-color: white;
  margin: 40px auto;
`;

const Title = styled.h2`
  font-size: 25px;
  color: #384459;
  margin-top: 0;
  margin-bottom: 20px;
`;

const Text = styled.p`
  color: #384459;
  font-size: 18px;
`;

const Btn = styled.button`
  margin-top: 15px;
  border: 0;
  background-color: #fb3c3c;
  color: white;
  border-radius: 5px;
  width: 100%;
  padding: 10px;
  font-weight: bold;
`;

export const baseLayout = (page: ReactElement) => <Layout title="Dashboard page">{page}</Layout>;

DashboardPage.getLayout = baseLayout;

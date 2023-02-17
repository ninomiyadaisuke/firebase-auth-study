import type { NextPageWithLayout } from 'next';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import styled from 'styled-components';

import Layout from '@/components/layout/Layout';
import { logout } from '@/firebase/utils';

const DashboardPage: NextPageWithLayout = () => {
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
      <EmailText>Email:</EmailText>
      <Btn onClick={onLogout}>Logout</Btn>
    </Wrapper>
  );
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

const EmailText = styled.p`
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

export default DashboardPage;

import type { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import nookies from 'nookies';
import styled from 'styled-components';

import { firebaseAdmin } from '@/firebase/firebaseAdmin';
import { logout } from '@/firebase/utils';

const DashboardPage: NextPage<{ email: string }> = ({ email }) => {
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
      <EmailText>Email</EmailText>
      <Btn onClick={onLogout}>Logout</Btn>
    </Wrapper>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx);
  const session = cookies.session || '';

  const user = await firebaseAdmin
    .auth()
    .verifySessionCookie(session, true)
    .catch(() => null);

  if (!user) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return {
    props: {
      email: user.email,
    },
  };
};

const Wrapper = styled.div`
  width: 600px;
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

export default DashboardPage;

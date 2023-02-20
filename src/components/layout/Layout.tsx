import Link from 'next/link';
import { parseCookies } from 'nookies';
import { FC, ReactNode } from 'react';
import styled from 'styled-components';

type Props = {
  children: ReactNode;
  title: string;
};

const Layout: FC<Props> = ({ children, title }) => {
  const isAuthed = true;
  const path = isAuthed ? '/dashboard' : '/login';
  return (
    <>
      <Header>
        <Title>{title}</Title>
        <Links>
          <Link href={'/'}>Top</Link>
          <Link href={'/login'}>Login</Link>
          <Link href={'/register'}>Signup</Link>
          <Link href={path}>Dashboard</Link>
        </Links>
      </Header>
      {children}
    </>
  );
};

const Header = styled.header`
  width: 100%;
  padding: 15px;
  border-radius: 5px;
  background-color: #094067;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 25px;
  color: #fffffe;
  margin-top: 0;
  margin-bottom: 20px;
`;

const Links = styled.nav`
  margin: 0 auto;
  width: 60%;
  display: flex;
  justify-content: space-between;
`;

const HeaderLink = styled.a`
  display: block;
  color: #fffffe !important;
  text-decoration: none;
`;

export default Layout;

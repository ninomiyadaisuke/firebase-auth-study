import Link from 'next/link';
import { FC, ReactNode } from 'react';
import styled from 'styled-components';

type Props = {
  children: ReactNode;
  title: string;
};

const Layout: FC<Props> = ({ children, title }) => {
  return (
    <>
      <Header>
        <Title>{title}</Title>
        <Links>
          <Link href={'/'} passHref legacyBehavior>
            <HeaderLink>Top</HeaderLink>
          </Link>
          <Link href={'/login'} passHref legacyBehavior>
            <HeaderLink>Login</HeaderLink>
          </Link>
          <Link href={'/register'} passHref legacyBehavior>
            <HeaderLink>Signup</HeaderLink>
          </Link>
          <Link href={'/dashboard'} passHref legacyBehavior>
            <HeaderLink>Dashboard</HeaderLink>
          </Link>
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

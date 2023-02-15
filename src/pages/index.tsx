import type { NextPage } from 'next';

import styles from '../styles/components/test.module.scss';

const Home: NextPage = () => {
  return <div className={styles.test}>Hello world</div>;
};

export default Home;

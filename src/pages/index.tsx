import type { NextPage } from 'next';
import Head from 'next/head';
import { Home } from '../components';

const HomePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Board - Organizando suas tarefas</title>
      </Head>
      <Home />
    </>
  );
};

export default HomePage;

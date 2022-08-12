import type { GetStaticProps, NextPage } from 'next';
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

export const getStaticProps: GetStaticProps = async () => {
  const refreshTimeInSeconds = 60 * 60;
  return {
    props: {},
    revalidate: refreshTimeInSeconds,
  };
};

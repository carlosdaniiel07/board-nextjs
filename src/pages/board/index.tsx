import type { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import { Board, SupportButton, ThankYou } from '../../components';

const BoardPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Minhas tarefas - Board</title>
      </Head>
      <section>
        <Board />
        <ThankYou />
        <SupportButton />
      </section>
    </>
  );
};

export default BoardPage;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({
    req,
  });
  const isAuthenticated = !!session?.userId;

  if (!isAuthenticated) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

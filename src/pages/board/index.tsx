import type { NextPage } from 'next';
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

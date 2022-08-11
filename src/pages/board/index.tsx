import type { NextPage } from 'next';
import Head from 'next/head';
import { Board, ThankYou } from '../../components';

const BoardPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Minhas tarefas - Board</title>
      </Head>
      <section>
        <Board />
        <ThankYou />
      </section>
    </>
  );
};

export default BoardPage;

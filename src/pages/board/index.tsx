import type { NextPage } from 'next';
import Head from 'next/head';
import { Board } from '../../components';

const BoardPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Minhas tarefas - Board</title>
      </Head>
      <Board />
    </>
  );
};

export default BoardPage;

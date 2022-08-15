import type { NextPage } from 'next';
import Head from 'next/head';
import { Board, SupportButton, ThankYou } from '../../components';
import { useDonate } from '../../context';
import authMiddleware from '../../middlewares/auth.middleware';

const BoardPage: NextPage = () => {
  const { isDonator } = useDonate();

  return (
    <>
      <Head>
        <title>Minhas tarefas - Board</title>
      </Head>
      <section>
        <Board />
        {isDonator && <ThankYou />}
        <SupportButton />
      </section>
    </>
  );
};

export default BoardPage;

export const getServerSideProps = authMiddleware;

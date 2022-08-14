import { NextPage } from 'next';
import Head from 'next/head';
import { Donate } from '../../components';
import authMiddleware from '../../middlewares/auth.middleware';

const DonatePage: NextPage = (props) => {
  return (
    <>
      <Head>
        <title>Seja um apoiador - Board</title>
      </Head>
      <section>
        <Donate />
      </section>
    </>
  );
};

export default DonatePage;

export const getServerSideProps = authMiddleware;

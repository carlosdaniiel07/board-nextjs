import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';

const authMiddleware: GetServerSideProps = async ({ req }) => {
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

export default authMiddleware;

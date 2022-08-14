import { GetServerSideProps } from 'next';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';

const authMiddleware: GetServerSideProps = async ({ req }) => {
  const session = await getSession({
    req,
  });
  const { userId } = (session ?? {}) as Session & { userId: string };
  const isAuthenticated = !!userId;

  if (!isAuthenticated) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      userId: Number(userId),
    },
  };
};

export default authMiddleware;

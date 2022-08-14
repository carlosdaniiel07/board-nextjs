import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { TaskDetails } from '../../components';
import { useTask } from '../../context';
import { TaskModel } from '../../models';

const TaskDetailsPage: NextPage = () => {
  const [task, setTask] = useState<TaskModel>();

  const { tasks } = useTask();
  const router = useRouter();

  useEffect(() => {
    const { query } = router;
    const taskId = query.id;

    if (!taskId) {
      return;
    }

    setTask(tasks.find(({ id }) => id === taskId));
  }, [router, tasks]);

  return (
    <>
      <Head>
        <title>{task?.description ?? 'Detalhes da tarefa'} - Board</title>
      </Head>
      <section>
        <TaskDetails data={task} />
      </section>
    </>
  );
};

export default TaskDetailsPage;

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

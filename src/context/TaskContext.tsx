import React, { ReactElement, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { toast } from 'react-toastify';

import { TaskModel } from '../models';
import { firestore } from '../services/firebase';

type TaskContextProps = {
  tasks: TaskModel[];
  addTask(description: string): Promise<void>;
  removeTask(id: string): Promise<void>;
};

const DEFAULT_VALUE: TaskContextProps = {
  tasks: [],
  addTask: async () => {},
  removeTask: async () => {},
};

export const TaskContext = React.createContext<TaskContextProps>(DEFAULT_VALUE);

export function TaskProvider({
  children,
}: {
  children: ReactElement | ReactElement[];
}) {
  const [tasks, setTasks] = useState<TaskModel[]>([]);
  const { data: session } = useSession();

  useEffect(() => {
    const loadTasks = async (): Promise<void> => {
      try {
        const userId = Number(session?.userId);
        const dbQuery = query(
          collection(firestore, 'tasks'),
          where('userId', '==', userId)
        );
        const querySnapshot = await getDocs(dbQuery);
        const data: TaskModel[] = [];

        querySnapshot.forEach((doc) => {
          const docData = doc.data();
          data.push({
            ...(docData as TaskModel),
            createdAt: new Date(docData.createdAt.seconds * 1000),
            id: doc.id,
          });
        });

        setTasks(data);
      } catch (err) {
        toast.error('Ocorreu um erro ao carregar a lista de tarefas');
      }
    };

    loadTasks();
  }, [session?.userId]);

  const addTask = async (description: string): Promise<void> => {
    try {
      const task: TaskModel = {
        description,
        userId: Number(session?.userId),
        createdAt: new Date(),
      };
      const document = await addDoc(collection(firestore, 'tasks'), task);
      const createdTask: TaskModel = {
        ...task,
        id: document.id,
      };

      toast.success('Tarefa registrada com sucesso');
      setTasks([...tasks, createdTask]);
    } catch (err) {
      toast.error('Ocorreu um erro ao registrar a tarefa');
    }
  };

  const removeTask = async (id: string): Promise<void> => {
    try {
      const newTasks = [...tasks.filter((task) => task.id !== id)];

      await deleteDoc(doc(firestore, 'tasks', id));
      toast.success('Tarefa removida com sucesso');
      setTasks(newTasks);
    } catch (err) {
      toast.error('Ocorreu um erro ao remover a tarefa');
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        removeTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export const useTask = () => React.useContext<TaskContextProps>(TaskContext);

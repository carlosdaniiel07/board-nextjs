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
  setDoc,
} from 'firebase/firestore';
import { toast } from 'react-toastify';

import { TaskModel } from '../models';
import { firestore } from '../services/firebase';

type TaskContextProps = {
  tasks: TaskModel[];
  taskInEditing?: TaskModel;
  addTask(description: string): Promise<void>;
  updateTask(id: string, task: TaskModel): Promise<void>;
  setEdit(task?: TaskModel): void;
  removeTask(id: string): Promise<void>;
};

const DEFAULT_VALUE: TaskContextProps = {
  tasks: [],
  addTask: async () => {},
  updateTask: async () => {},
  setEdit: () => {},
  removeTask: async () => {},
};

export const TaskContext = React.createContext<TaskContextProps>(DEFAULT_VALUE);

export function TaskProvider({
  children,
}: {
  children: ReactElement | ReactElement[];
}) {
  const [tasks, setTasks] = useState<TaskModel[]>([]);
  const [taskInEditing, setTaskInEditing] = useState<TaskModel>();

  const { data: session } = useSession();

  useEffect(() => {
    const loadTasks = async (): Promise<void> => {
      try {
        console.debug('Carregando tarefas...');

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
      console.debug('Gravando tarefa...');

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

  const updateTask = async (id: string, task: TaskModel): Promise<void> => {
    try {
      console.debug('Atualizando tarefa...');

      await setDoc(doc(firestore, 'tasks', id), task);
      toast.success('Tarefa alterada com sucesso');

      const newTasks = [...tasks];
      const index = newTasks.findIndex((t) => t.id === id);

      index !== -1 && (newTasks[index] = task);

      setTasks(newTasks);
      setEdit(undefined);
    } catch (err) {
      toast.error('Ocorreu um erro ao alterar a tarefa');
    }
  };

  const setEdit = (task?: TaskModel) => {
    setTaskInEditing(task);
  };

  const removeTask = async (id: string): Promise<void> => {
    try {
      console.debug('Removendo tarefa...');

      const newTasks = [...tasks.filter((task) => task.id !== id)];

      await deleteDoc(doc(firestore, 'tasks', id));
      toast.success('Tarefa removida com sucesso');

      setTasks(newTasks);
      setEdit(undefined);
    } catch (err) {
      toast.error('Ocorreu um erro ao remover a tarefa');
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        taskInEditing,
        addTask,
        updateTask,
        setEdit,
        removeTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export const useTask = () => React.useContext<TaskContextProps>(TaskContext);

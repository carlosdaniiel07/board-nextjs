import { addDoc, collection } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import React, { ReactElement, useState } from 'react';
import { toast } from 'react-toastify';

import { TaskModel } from '../models';
import { firestore } from '../services/firebase';

type TaskContextProps = {
  tasks: TaskModel[];
  addTask(description: string): Promise<void>;
  removeTask(id: string): void;
};

const DEFAULT_VALUE: TaskContextProps = {
  tasks: [],
  addTask: async () => {},
  removeTask: () => {},
};

export const TaskContext = React.createContext<TaskContextProps>(DEFAULT_VALUE);

export function TaskProvider({
  children,
}: {
  children: ReactElement | ReactElement[];
}) {
  const [tasks, setTasks] = useState<TaskModel[]>([]);
  const { data: session } = useSession();

  const addTask = async (description: string): Promise<void> => {
    const task: TaskModel = {
      description,
      userId: Number(session?.userId),
      createdAt: new Date(),
    };
    const document = await toast.promise(
      addDoc(collection(firestore, 'tasks'), task),
      {
        pending: 'Criando tarefa...',
        success: 'Tarefa criada com sucesso',
        error: 'Ocorreu um erro ao criar a tarefa',
      }
    );
    const createdTask: TaskModel = {
      ...task,
      id: document.id,
    };

    setTasks([...tasks, createdTask]);
  };

  const removeTask = (id: string): void => {
    const newTasks = [...tasks.filter((task) => task.id !== id)];
    setTasks(newTasks);
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

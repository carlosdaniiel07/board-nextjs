import React, { ReactElement, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { TaskModel } from '../models';

type TaskContextProps = {
  tasks: TaskModel[];
  addTask(description: string): void;
  removeTask(id: string): void;
};

const DEFAULT_VALUE: TaskContextProps = {
  tasks: [],
  addTask: () => {},
  removeTask: () => {},
};

export const TaskContext = React.createContext<TaskContextProps>(DEFAULT_VALUE);

export function TaskProvider({ children }: { children: ReactElement }) {
  const [tasks, setTasks] = useState<TaskModel[]>([]);

  const addTask = (description: string): void => {
    const task: TaskModel = {
      id: uuidv4(),
      description,
      createdAt: new Date(),
    };
    console.debug(task);
    setTasks([...tasks, task]);
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

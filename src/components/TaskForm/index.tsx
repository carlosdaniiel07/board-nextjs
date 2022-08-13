import { FormEvent, useState, useCallback, useEffect } from 'react';
import { FiCheck } from 'react-icons/fi';
import { useTask } from '../../context';

import styles from './styles.module.scss';

type TaskFormProps = {};

export function TaskForm(props: TaskFormProps) {
  const [description, setDescription] = useState('');
  const { taskInEditing, addTask, updateTask } = useTask();

  useEffect(() => {
    taskInEditing && setDescription(taskInEditing.description);
  }, [taskInEditing]);

  const handleSubmit = useCallback(
    async (event?: FormEvent<HTMLFormElement>): Promise<void> => {
      event?.preventDefault();

      const isValidDescription = description?.trim().length > 0;

      if (!isValidDescription) {
        return;
      }

      taskInEditing &&
        (await updateTask(taskInEditing.id as string, {
          ...taskInEditing,
          description,
        }));
      !taskInEditing && (await addTask(description));
      setDescription('');
    },
    [description, taskInEditing, updateTask, addTask]
  );

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Qual sua tarefa?'
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <button type='button' onClick={() => handleSubmit()}>
          <FiCheck size={24} />
        </button>
      </form>
      {taskInEditing && (
        <span>
          Você está editando a tarefa {`"${taskInEditing?.description}"`}
        </span>
      )}
    </div>
  );
}

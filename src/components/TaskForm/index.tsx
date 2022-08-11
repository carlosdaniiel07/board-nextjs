import { FormEvent, useState, useCallback } from 'react';
import { FiCheck } from 'react-icons/fi';
import { useTask } from '../../context';

import styles from './styles.module.scss';

type TaskFormProps = {};

export function TaskForm(props: TaskFormProps) {
  const [description, setDescription] = useState('');
  const { addTask } = useTask();

  const handleSubmit = useCallback(
    (event?: FormEvent<HTMLFormElement>): void => {
      event?.preventDefault();

      const isValidDescription = description?.trim().length > 0;

      if (!isValidDescription) {
        return;
      }

      addTask(description);
      setDescription('');
    },
    [addTask, description]
  );

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
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
  );
}

import { FormEvent, useState } from 'react';
import { FiCheck } from 'react-icons/fi';
import { useTask } from '../../context';

import styles from './styles.module.scss';

type TaskFormProps = {};

export function TaskForm(props: TaskFormProps) {
  const [description, setDescription] = useState('');
  const { addTask } = useTask();

  const handleSubmit = (event?: FormEvent<HTMLFormElement>): void => {
    event?.preventDefault();

    addTask(description);
    setDescription('');
  };

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

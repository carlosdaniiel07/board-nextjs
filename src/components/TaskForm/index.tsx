import { FiCheck } from 'react-icons/fi';

import styles from './styles.module.scss';

type TaskFormProps = {};

export function TaskForm(props: TaskFormProps) {
  return (
    <form className={styles.form}>
      <input type='text' placeholder='Qual sua tarefa?' />
      <button type='button'>
        <FiCheck size={24} />
      </button>
    </form>
  );
}

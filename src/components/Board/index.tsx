import { TaskForm } from '../TaskForm';
import { TaskList } from '../TaskList';
import styles from './styles.module.scss';

type BoardProps = {};

export function Board(props: BoardProps) {
  return (
    <section className={styles.container}>
      <TaskForm />
      <TaskList />
    </section>
  );
}

import { TaskForm } from '../TaskForm';
import styles from './styles.module.scss';

type BoardProps = {};

export function Board(props: BoardProps) {
  return (
    <section className={styles.container}>
      <TaskForm />
    </section>
  );
}

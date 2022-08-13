import { ReactElement } from 'react';
import { FiCalendar, FiEdit2, FiTrash } from 'react-icons/fi';
import { useTask } from '../../context';
import helpers from '../../helpers';
import { TaskModel } from '../../models';

import styles from './styles.module.scss';

type TaskListProps = {};

export function TaskList(props: TaskListProps) {
  const { tasks, removeTask } = useTask();

  return (
    <div className={styles.container}>
      {tasks.length ? (
        tasks.map((task) => (
          <TaskItem key={task.id} data={task} onRemove={removeTask} />
        ))
      ) : (
        <div className={styles.info}>
          <span>Você ainda não tem nenhuma tarefa cadastrada!</span>
        </div>
      )}
    </div>
  );
}

type TaskItemProps = {
  data: TaskModel;
  onRemove(id: string): Promise<void>;
};

function TaskItem({ data, onRemove }: TaskItemProps) {
  const formatDate = (date?: Date): string => {
    return helpers.format(date, 'DD [de] MMMM YYYY');
  };

  return (
    <div className={styles.task}>
      <p>{data.description}</p>
      <div className={styles.footer}>
        <div>
          <div className={styles.date}>
            <FiCalendar color='#FFB800' size={18} />
            <span>{formatDate(data.createdAt)}</span>
          </div>
          <ActionButton label='Editar'>
            <FiEdit2 color='#FFFFFF' size={18} />
          </ActionButton>
        </div>
        <ActionButton label='Excluir' onClick={() => onRemove(data.id as string)}>
          <FiTrash color='#FF3636' size={18} />
        </ActionButton>
      </div>
    </div>
  );
}

type ActionButtonProps = {
  label: string;
  onClick?(): void;
  children: ReactElement;
};

function ActionButton({ label, onClick, children }: ActionButtonProps) {
  return (
    <button
      type='button'
      className={styles.actionButton}
      onClick={() => onClick?.()}
    >
      {children}
      <span>{label}</span>
    </button>
  );
}

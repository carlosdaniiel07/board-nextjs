import { ReactElement, useEffect } from 'react';
import { FiCalendar, FiEdit2, FiTrash } from 'react-icons/fi';
import { useTask } from '../../context';
import { TaskModel } from '../../models';

import styles from './styles.module.scss';

type TaskListProps = {};

export function TaskList(props: TaskListProps) {
  const { tasks, removeTask } = useTask();

  return (
    <div className={styles.container}>
      {tasks.length ? (
        tasks.map((task) => (
          <TaskItem
            key={task.id}
            data={task}
            onRemove={() => removeTask(task.id as string)}
          />
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
  onRemove(): void;
};

function TaskItem({ data, onRemove }: TaskItemProps) {
  return (
    <div className={styles.task}>
      <p>{data.description}</p>
      <div className={styles.footer}>
        <div>
          <div className={styles.date}>
            <FiCalendar color='#FFB800' size={18} />
            <span>17 de Julho 2021</span>
          </div>
          <ActionButton label='Editar'>
            <FiEdit2 color='#FFFFFF' size={18} />
          </ActionButton>
        </div>
        <ActionButton label='Excluir' onClick={onRemove}>
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

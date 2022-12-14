import Link from 'next/link';
import { ReactElement } from 'react';
import { FiCalendar, FiEdit2, FiTrash } from 'react-icons/fi';
import { useDonate, useTask } from '../../context';
import helpers from '../../helpers';
import { TaskModel } from '../../models';

import styles from './styles.module.scss';

type TaskListProps = {};

export function TaskList(props: TaskListProps) {
  const { tasks, setEdit, removeTask } = useTask();
  const { isDonator } = useDonate();

  return (
    <div className={styles.container}>
      {tasks.length ? (
        tasks.map((task) => (
          <TaskItem
            key={task.id}
            data={task}
            canEdit={isDonator}
            onEdit={() => {
              helpers.scrollToTop();
              setEdit(task);
            }}
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
  canEdit: boolean;
  onEdit(): void;
  onRemove(): Promise<void>;
};

function TaskItem({ data, canEdit, onEdit, onRemove }: TaskItemProps) {
  const formatDate = (date?: Date): string | null => {
    return helpers.format(date, 'DD [de] MMMM YYYY');
  };

  return (
    <div className={styles.task}>
      {canEdit ? (
        <Link href={`/board/${data.id}`}>
          <p>{data.description}</p>
        </Link>
      ) : (
        <p>{data.description}</p>
      )}
      <div className={styles.footer}>
        <div>
          <div className={styles.date}>
            <FiCalendar color='#FFB800' size={18} />
            <span>{formatDate(data.createdAt)}</span>
          </div>
          {canEdit && (
            <ActionButton label='Editar' onClick={onEdit}>
              <FiEdit2 color='#FFFFFF' size={18} />
            </ActionButton>
          )}
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

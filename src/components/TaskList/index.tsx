import { ReactElement } from 'react';
import { FiCalendar, FiEdit2, FiTrash } from 'react-icons/fi';

import styles from './styles.module.scss';

type TaskListProps = {};

export function TaskList(props: TaskListProps) {
  return (
    <div className={styles.container}>
      <TaskItem />
      <TaskItem />
      <TaskItem />
    </div>
  );
}

function TaskItem() {
  return (
    <div className={styles.task}>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tenetur
        aliquam tempora blanditiis dolorem, fugit repudiandae voluptatibus
        autem, vel id a soluta ipsum quod distinctio quae exercitationem,
        tempore veniam quasi et?
      </p>
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
        <ActionButton label='Excluir'>
          <FiTrash color='#FF3636' size={18} />
        </ActionButton>
      </div>
    </div>
  );
}

type ActionButtonProps = {
  label: string;
  children: ReactElement;
};

function ActionButton({ label, children }: ActionButtonProps) {
  return (
    <button type='button' className={styles.actionButton}>
      {children}
      <span>{label}</span>
    </button>
  );
}

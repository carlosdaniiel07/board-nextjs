import { FiCalendar } from 'react-icons/fi';
import helpers from '../../helpers';
import { TaskModel } from '../../models';

import styles from './styles.module.scss';

type TaskDetailsProps = {
  data?: TaskModel;
};

export function TaskDetails({ data }: TaskDetailsProps) {
  return (
    <div className={styles.container}>
      <p>{data?.description}</p>

      <div className={styles.footer}>
        <FiCalendar color='#FFB800' size={16} />
        <span>
          Criado em {helpers.format(data?.createdAt, 'DD/MM/YYYY HH:mm')}
        </span>
      </div>
    </div>
  );
}

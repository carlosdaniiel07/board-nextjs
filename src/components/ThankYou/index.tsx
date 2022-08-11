import { FiClock } from 'react-icons/fi';

import styles from './styles.module.scss';

type ThankYouProps = {};

export function ThankYou(props: ThankYouProps) {
  return (
    <div className={styles.container}>
      <h3>Obrigado por apoiar esse projeto.</h3>
      <div>
        <FiClock color='#fff' size={22} />
        <span>Última doação cerca de 2 horas</span>
      </div>
    </div>
  );
}

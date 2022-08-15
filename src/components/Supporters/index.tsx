import Image from 'next/image';
import { useDonate } from '../../context';

import styles from './styles.module.scss';

type SupportersProps = {};

export function Supporters(props: SupportersProps) {
  const { donators } = useDonate();

  return (
    <div className={styles.container}>
      <span>Apoiadores:</span>
      <div className={styles.supporters}>
        {(donators ?? []).map(({ userImageUrl }, index) => (
          <div key={String(index)}>
            <Image
              src={userImageUrl}
              alt='Apoiador'
              title='Apoiador'
              width={51}
              height={50}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

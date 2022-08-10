import Image from 'next/image';

import styles from './styles.module.scss';

type SupportersProps = {
  count: number;
};

export function Supporters({ count }: SupportersProps) {
  const supporters: Array<{ imageUrl: string }> = new Array(count)
    .fill({})
    .map(() => ({
      imageUrl:
        'https://images.unsplash.com/photo-1518577915332-c2a19f149a75?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=862&q=80',
    }));
  return (
    <div className={styles.container}>
      <span>Apoiadores:</span>
      <div className={styles.supporters}>
        {supporters.map(({ imageUrl }, index) => (
          <div key={String(index)}>
            <Image
              src={imageUrl}
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

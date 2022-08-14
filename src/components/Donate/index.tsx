import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { ThankYouForDonate } from '../ThankYouForDonate/inde';
import styles from './styles.module.scss';

type DonateProps = {};

export function Donate(props: DonateProps) {
  const { data: session } = useSession();

  return (
    <div className={styles.container}>
      <Image
        src='/images/rocket.svg'
        width={125}
        height={286}
        title='Apoie o projeto'
        alt='Apoie o projeto'
      />
      <div className={styles.content}>
        <ThankYouForDonate user={session?.user} />

        <span className={styles.title}>Seja um apoiador deste projeto! 🏆</span>
        <span className={styles.subtitle}>
          Contribua com apenas <strong>R$ 1,00</strong>
        </span>
        <span className={styles.info}>
          Apareça na nossa home, tenha funcionalidades exclusivas.
        </span>
      </div>
    </div>
  );
}

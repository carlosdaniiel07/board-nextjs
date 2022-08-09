import Image from 'next/image';
import styles from './styles.module.scss';

type HomeProps = {};

export function Home(props: HomeProps) {
  return (
    <div className={styles.container}>
      <Image
        src='/images/board-user.svg'
        width={504}
        height={325}
        alt='Board'
        title='Board'
      />
      <span className={styles.title}>
        Uma ferramenta para seu dia a dia Escreva, planeje e organize-se..
      </span>
      <span className={styles.helper}>
        <strong>100% Gratuita</strong> e online
      </span>
    </div>
  );
}

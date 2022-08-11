import Link from 'next/link';
import styles from './styles.module.scss';

type SupportButtonProps = {};

export function SupportButton(props: SupportButtonProps) {
  return (
    <div className={styles.container}>
      <Link href='/donate'>
        <button type='button'>Apoiar</button>
      </Link>
    </div>
  );
}

import Link from 'next/link';
import Image from 'next/image';

import { SignInButton } from '../SignInButton';

import styles from './styles.module.scss';

type HeaderProps = {};

export function Header(props: HeaderProps) {
  return (
    <header className={styles.container}>
      <div className={styles.content}>
        <Link href='/'>
          <Image
            src='/images/logo.svg'
            width={48}
            height={52}
            alt='Board'
            title='Board'
          />
        </Link>

        <nav>
          <Link href='/'>
            <a>Home</a>
          </Link>
          <Link href='/board'>
            <a>Meu Board</a>
          </Link>
        </nav>

        <SignInButton />
      </div>
    </header>
  );
}

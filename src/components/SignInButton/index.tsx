import Image from 'next/image';
import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';

import styles from './styles.module.scss';

type SignInButtonProps = {
  isLogged: boolean;
  toggleLogin(): void;
};

export function SignInButton({ isLogged, toggleLogin }: SignInButtonProps) {
  return (
    <button type='button' className={styles.button} onClick={toggleLogin}>
      {isLogged ? (
        <>
          <Image
            src='https://images.unsplash.com/photo-1518577915332-c2a19f149a75?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=862&q=80'
            width={30}
            height={30}
            alt='Foto de perfil'
            title='Foto de perfil'
          />
          <span>Olá, Joanna</span>
          <FiX color='#737380' className={styles.closeIcon} />
        </>
      ) : (
        <>
          <FaGithub color='#ffb800' />
          Entrar com GitHub
        </>
      )}
    </button>
  );
}

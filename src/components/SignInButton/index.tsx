import Image from 'next/image';
import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';

import styles from './styles.module.scss';

type SignInButtonProps = {
  logged: boolean;
};

export function SignInButton({ logged }: SignInButtonProps) {
  return (
    <button type='button' className={styles.button} onClick={() => {}}>
      {logged ? (
        <>
          <Image
            src='https://sujeitoprogramador.com/steve.png'
            width={30}
            height={30}
            alt='Foto de perfil'
            title='Foto de perfil'
          />
          <span>Olá, Steve</span>
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

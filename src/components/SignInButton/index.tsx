import { useMemo } from 'react';
import Image from 'next/image';
import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';
import { signIn, signOut, useSession } from 'next-auth/react';

import styles from './styles.module.scss';

type SignInButtonProps = {};

export function SignInButton(props: SignInButtonProps) {
  const { data: session } = useSession();

  const isLogged = useMemo((): boolean => {
    return !!session?.user;
  }, [session]);

  const toggleLogin = async (): Promise<void> => {
    if (isLogged) {
      await signOut();
      return;
    }

    await signIn('github');
  };

  return (
    <button type='button' className={styles.button} onClick={toggleLogin}>
      {isLogged ? (
        <>
          <Image
            src={session?.user?.image as string}
            width={30}
            height={30}
            alt='Foto de perfil'
            title='Foto de perfil'
          />
          <span>Olá, {session?.user?.name}</span>
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

import Image from 'next/image';
import styles from './styles.module.scss';

type ThankYouForDonateProps = {
  name?: string | null;
  user?: {
    email?: string | null;
    image?: string | null;
  };
};

export function ThankYouForDonate({ user }: ThankYouForDonateProps) {
  return (
    <div className={styles.container}>
      <Image
        src={user?.image as string}
        width={30}
        height={30}
        alt='Foto de perfil'
        title='Foto de perfil'
      />
      <span>Parabéns agora você é um apoiador!</span>
    </div>
  );
}

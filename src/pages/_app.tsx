import type { AppProps } from 'next/app';

import '../styles/global.scss';

import { Header, Content } from '../components';
import { SessionProvider } from 'next-auth/react';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Header />
      <Content>
        <Component {...pageProps} />
      </Content>
    </SessionProvider>
  );
}

export default MyApp;

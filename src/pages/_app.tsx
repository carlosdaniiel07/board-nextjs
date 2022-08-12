import type { AppProps } from 'next/app';

import '../styles/global.scss';

import { Header, Content } from '../components';
import { SessionProvider } from 'next-auth/react';
import { TaskProvider } from '../context';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <TaskProvider>
        <Header />
        <Content>
          <Component {...pageProps} />
        </Content>
      </TaskProvider>
    </SessionProvider>
  );
}

export default MyApp;

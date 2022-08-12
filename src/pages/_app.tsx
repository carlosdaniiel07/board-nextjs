import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { ToastContainer } from 'react-toastify';

import { Header, Content } from '../components';
import { TaskProvider } from '../context';

import '../styles/global.scss';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <TaskProvider>
        <Header />
        <Content>
          <Component {...pageProps} />
        </Content>
        <ToastContainer position='top-center' autoClose={3000} />
      </TaskProvider>
    </SessionProvider>
  );
}

export default MyApp;

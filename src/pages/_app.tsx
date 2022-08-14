import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { ToastContainer } from 'react-toastify';

import { Header, Content } from '../components';
import { DonateProvider, TaskProvider } from '../context';

import '../styles/global.scss';
import 'react-toastify/dist/ReactToastify.css';

import environment from '../config/environment';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <PayPalScriptProvider
        options={{
          'client-id': environment.PAYPAL_CLIENT_ID,
          currency: 'BRL',
          intent: 'capture',
        }}
      >
        <TaskProvider>
          <DonateProvider>
            <Header />
            <Content>
              <Component {...pageProps} />
            </Content>
            <ToastContainer position='top-center' autoClose={3000} />
          </DonateProvider>
        </TaskProvider>
      </PayPalScriptProvider>
    </SessionProvider>
  );
}

export default MyApp;

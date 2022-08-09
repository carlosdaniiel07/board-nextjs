import type { AppProps } from 'next/app';

import '../styles/global.scss';

import { Header, Content } from '../components';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Content>
        <Component {...pageProps} />
      </Content>
    </>
  );
}

export default MyApp;

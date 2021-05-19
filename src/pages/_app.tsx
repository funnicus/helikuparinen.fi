import { AppProps } from 'next/app';

import Layout from '@components/layout';

import '@styles/globals.css';
import '@styles/nav.css';
import '@styles/home.css';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
}

export default MyApp;

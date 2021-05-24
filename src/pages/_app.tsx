import { AppProps } from 'next/app';

import Layout from '@components/layout';
import { reducer, StateProvider } from '@state/index';

import '@styles/globals.css';
import '@styles/nav.css';
import '@styles/about.css';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <StateProvider reducer={reducer}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </StateProvider>
    );
}

export default MyApp;

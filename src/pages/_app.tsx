import { AppProps } from 'next/app';
import Router from 'next/router';

import Layout from '@/components/layout';
import Analytics from '@/components/analytics';
import * as gtag from '@/helpers/gtag';
import { reducer, StateProvider } from '@/state/index';

import '@/styles/globals.css';
import '@/styles/about.css';

//we track pageview when route is changed
Router.events.on('routeChangeComplete', (url) => gtag.pageview(url));

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <StateProvider reducer={reducer}>
            <Layout>
                <Analytics />
                <Component {...pageProps} />
            </Layout>
        </StateProvider>
    );
}

export default MyApp;

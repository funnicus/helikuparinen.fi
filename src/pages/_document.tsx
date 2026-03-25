import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html>
            <Head>
                <meta charSet="utf-8" />
                <meta name="theme-color" content="#242424" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" href="/favicon.ico" />
                <link rel="manifest" href="/manifest.json" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}

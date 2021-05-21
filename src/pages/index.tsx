import { useRouter } from 'next/router';
import Head from 'next/head';

import indexStyles from './index.module.css';

export default function Home(): JSX.Element {

    const { locale } = useRouter();

    return (
        <header className={indexStyles.Header}>
            <Head >
                <title>Heli Kuparinen</title>
                <meta name='description' content='Hello! My name is Heli Kuparinen, welcome to my site!' />
            </Head>
            <hgroup>
                <h1>Heli Kuparinen</h1>
                <h3>{locale === 'fi-FI' ? 'Taidemaalari' : 'A Painter'}</h3>
            </hgroup>
        </header>
    );
}

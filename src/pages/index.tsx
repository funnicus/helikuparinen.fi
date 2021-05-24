import { useRouter } from 'next/router';
import Head from 'next/head';

import Font from '@components/font';

import indexStyles from './index.module.css';

export default function Home(): JSX.Element {

    const { locale } = useRouter();

    return (
        <header className={indexStyles.Header}>
            <Head >
                <title>Heli Kuparinen</title>
                <meta name='description' content='Heli Kuparinen, a Visual Artist/Painter.
                 Heli paints mostly with oil paints and likes to portray people on her works.' />
            </Head>
            <header>
                <Font />
                <h1>{locale === 'fi-FI' ? 'Taidemaalari' : 'Visual Artist'}</h1>
            </header>
        </header>
    );
}

import Head from 'next/head';
//import Image from 'next/image';

export default function Home(): JSX.Element {

    const lang = 'fi';

    return (
        <header className='Header'>
            <Head >
                <title>Heli Kuparinen</title>
                <meta name='description' content='Hello! my name is Heli Kuparinen, welcome to my homepage!' />
            </Head>
            <hgroup>
                <h1 className='HeaderText'>Heli Kuparinen</h1>
                <h3 className='HeaderText'>{lang === 'fi' ? 'Taidemaalari' : 'A Painter'}</h3>
            </hgroup>
        </header>
    );
}

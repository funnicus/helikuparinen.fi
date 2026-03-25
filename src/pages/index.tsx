import { useEffect } from 'react';
import { useRouter } from 'next/router';

import Font from '@/components/font';
import Seo from '@/components/seo';
import { useStateValue, setTheme } from '@/state/index';

import indexStyles from './index.module.css';

export default function Home(): JSX.Element {
    const { locale } = useRouter();
    const [, dispatch] = useStateValue();

    useEffect(() => {
        dispatch(setTheme({ color: '#242424', animation: 'fadein 2s' }));
    }, []);

    const isFi = locale === 'fi-FI';

    return (
        <div className={indexStyles.Header}>
            <Seo
                title="Heli Kuparinen"
                description={
                    isFi
                        ? 'Heli Kuparinen on helsinkiläinen taidemaalari, joka työskentelee pääasiassa öljyväreillä ja kuvaa teoksissaan ihmisiä.'
                        : 'Heli Kuparinen, a Visual Artist/Painter. Heli paints mostly with oil paints and likes to portray people on her works.'
                }
            />
            <header>
                <Font />
                <h1>{isFi ? 'Taidemaalari' : 'Visual Artist'}</h1>
            </header>
        </div>
    );
}

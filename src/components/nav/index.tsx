import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { FaBars, FaTimes } from 'react-icons/fa';
import Link from 'next/link';
import useWindowDimensions from '../../hooks/useWindowDimensions';

const Nav = (): JSX.Element => {

    const [style, setStyle] = useState(true);

    const { locale, pathname } = useRouter();
    const { width } = useWindowDimensions();

    const toggleMenu = () => setStyle(!style);

    const text = locale === 'fi-FI' ? 'In English' : 'Suomeksi';
    const nextLocale = locale === 'fi-FI' ? 'en-US' : 'fi-FI';

    return (
        <div style={{ background: '#f7f7f7' }}>
            <button id='dropdown-btn' onClick={toggleMenu}>{!style ? <FaTimes /> : <FaBars />}</button>
            <nav className="Navbar" style={style && width < 770 ? { display: 'none' } : { display: 'flex' }}>
                <ul id='Left'>
                    <li><Link href="/">Heli Kuparinen</Link></li>
                    <li><Link href="/about">{locale === 'fi-FI' ? 'Tietoa minusta' : 'About me' }</Link></li>
                    <li><Link href="/paintings">{locale === 'fi-FI' ? 'Teokset' : 'Paintings' }</Link></li>
                </ul>
                <ul id='Right'>
                    <li><Link href={pathname} locale={nextLocale}>{text}</Link></li>
                </ul>
            </nav>
        </div>
    );
};

export default Nav;
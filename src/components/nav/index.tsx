import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { FaBars, FaTimes } from 'react-icons/fa';
import Link from 'next/link';

import { useStateValue, setTheme } from '@state/index';
import useWindowDimensions from '../../hooks/useWindowDimensions';

import navStyles from './nav.module.css';

const Nav = (): JSX.Element => {

    const [style, setStyle] = useState(true);

    const [{ theme }] = useStateValue();
    const { locale, pathname } = useRouter();
    const { width } = useWindowDimensions();

    const toggleMenu = () => setStyle(!style);

    const text = locale === 'fi-FI' ? 'In English' : 'Suomeksi';
    const nextLocale = locale === 'fi-FI' ? 'en-US' : 'fi-FI';

    return (
        <div>
            <button className={navStyles.dropdownBtn} onClick={toggleMenu}>{!style ? <FaTimes /> : <FaBars />}</button>
            <nav className={navStyles.Navbar} style={style && width < 770 ? { display: 'none' } : { display: 'flex' }}>
                <ul className={navStyles.Left} style={{ color: theme.color }}>
                    <li><Link href="/">Heli Kuparinen</Link></li>
                    <li><Link href="/about">{locale === 'fi-FI' ? 'Tietoa minusta' : 'About me' }</Link></li>
                    <li><Link href="/paintings">{locale === 'fi-FI' ? 'Teokset' : 'Paintings' }</Link></li>
                    <li><Link href="/blog">{locale === 'fi-FI' ? 'Blogi' : 'Blog' }</Link></li>
                </ul>
                <ul className={navStyles.Right}>
                    <li><Link href={pathname} locale={nextLocale}>{text}</Link></li>
                </ul>
            </nav>
        </div>
    );
};

export default Nav;
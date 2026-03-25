import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FaBars, FaTimes } from 'react-icons/fa';
import Link from 'next/link';

import { useStateValue } from '@/state/index';
import useWindowDimensions from '../../hooks/useWindowDimensions';

import navStyles from './nav.module.scss';

const Nav = (): JSX.Element => {
    const [menuOpen, setMenuOpen] = useState(false);

    const [{ theme }] = useStateValue();
    //query erittäin tärkeä eikä tästä löydy tietoa mistään!
    const { locale, pathname, query, events } = useRouter();
    const { width } = useWindowDimensions();

    const toggleMenu = (state?: boolean) =>
        setMenuOpen(state !== undefined ? state : !menuOpen);

    useEffect(() => {
        const handleRouteChange = () => toggleMenu(false);

        events.on('routeChangeComplete', handleRouteChange);

        return () => events.off('routeChangeComplete', handleRouteChange);
    }, []);

    const text = locale === 'fi-FI' ? 'In English' : 'Suomeksi';
    const nextLocale = locale === 'fi-FI' ? 'en-US' : 'fi-FI';

    const isMobile = width < 770;
    const navHidden = !menuOpen && isMobile;

    return (
        <div>
            <button
                className={navStyles.dropdownBtn}
                onClick={() => toggleMenu()}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
                aria-controls="main-nav"
            >
                {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
            <nav
                id="main-nav"
                className={navStyles.Navbar}
                style={
                    navHidden
                        ? {
                              visibility: 'hidden',
                              opacity: 0,
                              pointerEvents: 'none',
                          }
                        : {
                              visibility: 'visible',
                              opacity: 1,
                              pointerEvents: 'auto',
                          }
                }
                aria-hidden={navHidden}
            >
                <ul className={navStyles.Left} style={{ color: theme.color }}>
                    <li>
                        <Link href="/">Heli Kuparinen</Link>
                    </li>
                    <li>
                        <Link href="/about">
                            {locale === 'fi-FI' ? 'Tietoa minusta' : 'About me'}
                        </Link>
                    </li>
                    <li>
                        <Link href="/paintings">
                            {locale === 'fi-FI' ? 'Teokset' : 'Paintings'}
                        </Link>
                    </li>
                    <li>
                        <Link href="/blog">
                            {locale === 'fi-FI' ? 'Blogi' : 'Blog'}
                        </Link>
                    </li>
                </ul>
                <ul className={navStyles.Right}>
                    <li>
                        <Link href={{ pathname, query }} locale={nextLocale}>
                            {text}
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Nav;

import React, { useState } from 'react';
//import '../styles/nav.css';
import { FaBars, FaTimes } from 'react-icons/fa';
import Link from 'next/link';
import useWindowDimensions from '../hooks/useWindowDimensions';

const Nav = ({ id, lang, setLang, setFadein }: NavProps): JSX.Element => {
    const [style, setStyle] = useState(true);
    const { width } = useWindowDimensions();

    const toggleMenu = () => setStyle(!style);

    return (
        <div style={{ background: '#f7f7f7' }}>
            <button id='dropdown-btn' onClick={toggleMenu}>{!style ? <FaTimes /> : <FaBars />}</button>
            <nav id={id} className="Navbar" style={style && width < 770 ? { display: 'none' } : { display: 'flex' }}>
                <ul id='Left'>
                    <li onClick={() => setFadein('none')}><Link href="/">Heli Kuparinen</Link></li>
                    <li onClick={() => setFadein('none')}><Link href="/about">{lang === 'fi' ? 'Tietoa minusta' : 'About me' }</Link></li>
                    <li onClick={() => setFadein('none')}><Link href="/paintings">{lang === 'fi' ? 'Teokset' : 'Paintings' }</Link></li>
                    <li onClick={() => setFadein('none')}><Link href="/contact">{lang === 'fi' ? 'Ota yhteyttä' : 'Contact me' }</Link></li>
                </ul>
                <ul id='Right'>
                    <li><button onClick={() => setLang('fi')}>FI</button></li>
                    <li><button onClick={() => setLang('en')}>EN</button></li>
                </ul>
            </nav>
        </div>
    );
};

interface NavProps {
    id: string;
    lang: string;
    setLang: (lang: string) => any;
    setFadein: (fade: string) => any;
}

Nav.defaultProps = {
    id: 'none',
    lang: 'fi',
    setLang: (lang) => lang,
    setFadein: (fade) => fade
};

export default Nav;
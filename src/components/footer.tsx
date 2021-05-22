import { FaFacebook, FaInstagram } from 'react-icons/fa';

import Contact from './contact';

import footerStyles from './footer.module.css';

const Footer = (): JSX.Element => {
    return (
        <footer className={footerStyles.Footer} style={{ padding: '1vh', textAlign: 'center' }}>
            <Contact />
            <div className={footerStyles.social}>
                <a className={footerStyles.fa} href='https://www.facebook.com/heli.kuparinen'><FaFacebook /></a>
                <a className={footerStyles.in} href='https://instagram.com/heli_kuparinen_art'><FaInstagram /></a>
            </div>
            <span>Copyright © Heli Kuparinen {new Date().getFullYear()}</span>
        </footer>
    );
};

export default Footer;
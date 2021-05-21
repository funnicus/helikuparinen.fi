import Contact from './contact';

import footerStyles from './footer.module.css';

const Footer = (): JSX.Element => {
    return (
        <footer className={footerStyles.Footer} style={{ padding: '1vh', textAlign: 'center' }}>
            <Contact />
            <span>Copyright © Heli Kuparinen {new Date().getFullYear()}</span>
        </footer>
    );
};

export default Footer;
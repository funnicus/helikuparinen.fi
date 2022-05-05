import { FC, ReactNode } from 'react';

import { useStateValue } from '@/state/index';

import Nav from '../nav';
import Footer from '../footer';

import layoutStyles from './layout.module.css';

const Layout: FC<Props> = ({ children }) => {
    const [{ theme }] = useStateValue();

    return (
        <div style={theme} className={layoutStyles.Layout}>
            <Nav />
            <main>{children}</main>
            <Footer />
        </div>
    );
};

interface Props {
    children: ReactNode;
}

export default Layout;

import { FC, ReactNode } from 'react';

import Nav from './nav';
import Footer from './footer';

const Layout: FC<Props> = ({ children }) => {
    return (
        <>
            <Nav />
            <main>{children}</main>
            <Footer />
        </>
    );
};

interface Props {
  children: ReactNode;
}

export default Layout;
import { FC, ReactNode } from 'react';

import Nav from './nav';

const Layout: FC<Props> = ({ children }) => {
    return (
        <>
            <Nav />
            <main>{children}</main>
            <footer style={{ padding: '1vh', textAlign: 'center' }}>
                <span>Copyright © Heli Kuparinen {new Date().getFullYear()}</span>
            </footer>
        </>
    );
};

interface Props {
  children: ReactNode;
}

export default Layout;
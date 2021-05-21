import {  FC } from 'react';

const NotFound: FC = () => {

    const style = { 
        height: '100vh', 
        fontSize: '3em', 
        textAlign: 'center',
        padding: '15%',
    };

    return (
        <div style={style}>
            <h1>404</h1>
            <p>Page not found🥺</p>
        </div>
    );
};

export default NotFound;

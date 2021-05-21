import { useState } from 'react';

export default function useMessage(): UseMessage {
    const [ message, setMessage ] = useState('');
    const [ style, setStyle ] = useState({});

    const error = { border: '1px solid red', display: 'block', background: 'red'};
    const ok = { border: '1px solid green', display: 'block', background: 'green' };
    const warning = { border: '1px solid yellow', display: 'block', background: 'yellow' };

    function messageTimeout(style: MessageStyle, message: string) {
        setMessage(message);
        setStyle(style === 'error' ? error : (style === 'ok' ? ok : warning));
        setTimeout(() => {
            setMessage('');
            setStyle({});
        }, 5000);
    }

    return { message, style, messageTimeout };
}

type UseMessage = { 
    message: string;  
    style: Style;
    messageTimeout: (style: MessageStyle, message: string) => void;
}

export type Style = { border?: string }

type MessageStyle = 'error' | 'ok' | 'warning' | '';
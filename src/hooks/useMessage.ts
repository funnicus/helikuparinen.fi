import { useState } from 'react';

export default function useMessage(): UseMessage {
    const [ message, setMessage ] = useState('');
    const [ style, setStyle ] = useState({});

    const error = { border: '1px solid red' };
    const ok = { border: '1px solid green' };
    const warning = { border: '1px solid yellow' };

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
    style: { border?: string };
    messageTimeout: (style: MessageStyle, message: string) => void;
}

type MessageStyle = 'error' | 'ok' | 'warning' | '';
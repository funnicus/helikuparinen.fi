import { FC, useState, ChangeEvent } from 'react';
import { useRouter } from 'next/router';

import Form from './form';
import Message from '@/components/message';

import useMessage from '@/hooks/useMessage';
import mail from '@/services/mail';

const Contact: FC = () => {
    const [content, setContent] = useState('');
    const [antispam, setAntispam] = useState('');
    const [email, setEmail] = useState('');

    const { locale } = useRouter();
    const { message, style, messageTimeout } = useMessage();

    const handleContentChange = (e: ChangeEvent<HTMLInputElement>) =>
        setContent(e.target.value);

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) =>
        setEmail(e.target.value);

    const handleSubmit = async (e: Event) => {
        e.preventDefault();

        try {
            const mailObj = {
                email: email,
                message: content,
                antispam,
            };

            await mail(mailObj);
            messageTimeout(
                'ok',
                locale === 'fi-FI'
                    ? 'Viesti lähetetty! Vastaan mahdollisimman pian...'
                    : 'Mail send! I will respond as soon as possible...'
            );
            setEmail('');
            setContent('');
        } catch (error) {
            const message = (error as Error).message;
            console.error();
            messageTimeout('error', locale === 'fi-FI' ? message : message);
        }
    };

    return (
        <>
            <Message message={message} style={style} />
            <Form
                handleSubmit={handleSubmit}
                content={content}
                handleContentChange={handleContentChange}
                email={email}
                handleEmailChange={handleEmailChange}
                antispam={antispam}
                setAntispam={setAntispam}
                lang={locale}
            />
        </>
    );
};

export default Contact;

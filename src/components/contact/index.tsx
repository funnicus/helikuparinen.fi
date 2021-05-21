import { FC, useState, ChangeEvent } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import Form from './form';
import Message from '@components/message';

import useMessage from '@hooks/useMessage';
import mail from '@services/mail';

const Contact: FC = () => {
    const [content, setContent] = useState('');
    const [email, setEmail] = useState('');

    const { locale } = useRouter();
    const { message, style, messageTimeout } = useMessage();

    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const handleContentChange = (e: ChangeEvent<HTMLInputElement>) => setContent(e.target.value);

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);

    const handleSubmit = async (e: Event) => {
        e.preventDefault();

        if(!re.test(email)){
            messageTimeout(
                'error', 
                (locale === 'fi-FI' ? 
                    'Sähköposti osoite ei kelpaa!' : 
                    'Email not valid!'
                )
            );
        }

        try {
            const mailObj = {
                email: email,
                message: content
            };
  
            await mail(mailObj);
            messageTimeout(
                'ok', 
                (locale === 'fi-FI' ? 
                    'Viesti lähetetty! Vastaan mahdollisimman pian...' : 
                    'Mail send! I will respond as soon as possible...'
                )
            );
            setEmail('');
            setContent('');
        }
        catch(error){
            const message = (error as Error).message;
            console.error();
            messageTimeout(
                'error', 
                (locale === 'fi-FI' ? 
                    message : 
                    message
                )
            );
        }
    };

    return (
        <>
            <Head>
                <title>Contact me</title>
                <meta 
                    name='description' 
                    content='You can contact me with the form provided. I try to reply as fast as I can :)' 
                />
            </Head>
            <Message message={message} style={style} />
            <Form
                handleSubmit={handleSubmit}
                content={content}
                handleContentChange={handleContentChange}
                email={email}
                handleEmailChange={handleEmailChange}
                lang={locale}
            />
        </>
    );
};

export default Contact;
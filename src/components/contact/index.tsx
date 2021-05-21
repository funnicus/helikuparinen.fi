import { FC, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import Form from './form';
import Message from '@components/message';

import useMessage from '@hooks/useMessage';
//import emailService from '../services/email'
//import { Helmet } from 'react-helmet'
//import './Contact.css';

const Contact: FC = () => {
    const [content, setContent] = useState('');
    const [email, setEmail] = useState('');

    const { locale } = useRouter();
    const { message, style, messageTimeout } = useMessage();

    const handleContentChange = e => setContent(e.target.value);

    const handleEmailChange = e => setEmail(e.target.value);

    const handleSubmit = async e => {
        e.preventDefault();
        messageTimeout( 'ok', 'Onnistui!');
        setEmail('');
        setContent('');
        /*if(emailRegex.test(email) === true){
            try {
                const emailObj = {
                    email: email,
                    message: content
                };
                await emailService.mail(emailObj);
                createMessageTimeout({ backgroundColor: '#99ff66', display: 'block' }, 'Viesti lähetetty! Vastaan mahdollisimman pian...', 'Mail send! I will respond as soon as possible...');
                setStyle({});
                setEmail('');
                setContent('');
            }
            catch(error){
                console.log(error);    
                createMessageTimeout({ backgroundColor: '#ff3333', display: 'block' }, error, error);  
            }
        }
        else{
            createMessageTimeout({ backgroundColor: '#ff3333', display: 'block' }, 'Sähköpostiosoite ei kelpaa...', 'Email not valid...');
        }*/
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
                style={style}
            />
        </>
    );
};

export default Contact;
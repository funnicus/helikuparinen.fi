import { FC, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import Form from '@components/form';
import Message from './Message';
//import emailService from '../services/email'
//import { Helmet } from 'react-helmet'
//import './Contact.css';

const Contact: FC = () => {
    const [content, setContent] = useState('');
    const [email, setEmail] = useState('');
    const [style, setStyle] = useState({});
    const [notification, setNotification] = useState('Viesti lähetetty!');
    const [notificationStyle, setNotificationStyle] = useState({});

    const emailRegex = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;

    const handleContentChange = e => setContent(e.target.value);

    function createMessageTimeout(messageCSS, mFi, mEn) {
        setNotification(lang === 'fi' ? mFi : mEn );
        setNotificationStyle(messageCSS);
        setTimeout(() => {
            setNotification('');
            setNotificationStyle({});
        }, 5000);
    }

    const handleEmailChange = e => {
        if(!e.target.value){
            setStyle({});
        }
        else if(emailRegex.test(e.target.value)){
            setStyle({ border: '1px solid green'});
        }
        else{
            setStyle({ border: '1px solid red'});
        }
        return setEmail(e.target.value);
    };

    const handleSubmit = async e => {
        e.preventDefault();
        if(emailRegex.test(email) === true){
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
        }
    };

    return (
        <div className="Contact">
            <Helmet >
                <title>Contact me</title>
                <meta 
                    name='description' 
                    content='You can contact me with the form provided. I try to reply as fast as I can :)' 
                />
            </Helmet>
            <Message message={notification} style={notificationStyle} />
            <Form
                handleSubmit={handleSubmit}
                content={content}
                handleContentChange={handleContentChange}
                email={email}
                handleEmailChange={handleEmailChange}
                lang={lang}
                style={style}
            />
        </div>
    );
};

export default Contact;
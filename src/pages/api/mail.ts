import nodemailer from 'nodemailer';
import type { NextApiRequest, NextApiResponse } from 'next';


function validateEmail(email: string) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

const handler = (req: NextApiRequest, res: NextApiResponse): void => {
    if(req.method === 'POST'){

        const transport = {
            host: 'smtpa.kolumbus.fi', // Don’t forget to replace with the SMTP host of your provider
            port: 587,
            auth: {
                user: process.env.EMAILUSER,
                pass: process.env.EMAILPASS
            }
        };
        
        const transporter = nodemailer.createTransport(transport);
        
        console.log(transport);
        console.log(transporter);

        transporter.verify((error, success) => {
            if (error) {
                console.log('Something went wrong with the email service...');
                console.error(error);
            } else {
                console.log(success);
                console.log('Server is ready to take on messages');
            }
        });
        
        const email = req.body.email;
        const message = req.body.message;
        const content = `${email} \n ${message} `;

        if(!validateEmail(email)) res.status(400).json({ status: 'fail' });

        const mail = {
            from: email,
            to: process.env.TO,  // Change to email address that you want to receive messages on
            subject: 'Joku on ottanut sinuun yhteyttä kotisivujesi kautta!',
            text: content
        };

        transporter.sendMail(mail, (err) => {
            if (err) {
                res.status(500).json({ status: 'fail', err });
            } else {
                res.status(200).json({ status: 'success' });
            }
        });
    }
};

export default handler;
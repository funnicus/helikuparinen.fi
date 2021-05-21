import nodemailer from 'nodemailer';
import type { NextApiRequest, NextApiResponse } from 'next';

export const handler = (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method === 'post'){
        const transport = {
            host: 'smtpa.kolumbus.fi', // Don’t forget to replace with the SMTP host of your provider
            port: 587,
            auth: {
                user: process.env.EMAILUSER,
                pass: process.env.EMAILPASS
            }
        };
        
        const transporter = nodemailer.createTransport(transport);
        
        transporter.verify(error => {
            if (error) {
                console.log('Something went wrong with email service...');
                console.error(error);
            } else {
                console.log('Server is ready to take messages');
            }
        });
        
        const email = req.body.email;
        const message = req.body.message;
        const content = `${email} \n ${message} `;

        const mail = {
            from: email,
            to: process.env.EMAILUSER,  // Change to email address that you want to receive messages on
            subject: 'Joku on ottanut sinuun yhteyttä kotisivujesi kautta!',
            text: content
        };

        transporter.sendMail(mail, (err) => {
            if (err) {
                res.json({ status: 'fail' });
            } else {
                res.json({ status: 'success' });
            }
        });
    }
};
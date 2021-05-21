import nodemailer from 'nodemailer';

import type { NextApiRequest, NextApiResponse } from 'next';

type Handler = (req: NextApiRequest, res: NextApiResponse) => Promise<void>;

const connectDB = (handler: Handler) => async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    /*if () {
    // Use current db connection
        return handler(req, res);
    }
    // Use new db connection
    try{
        
    } catch(error){
        const message = (error as Error).message;
        console.log('couldn\'t connect to email server!');
        console.error(message);
    }
  
    return handler(req, res);*/
};

export default connectDB;

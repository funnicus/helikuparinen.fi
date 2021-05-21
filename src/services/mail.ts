import axios from 'axios';
const baseUrl = '/api/mail/';

const mail = async (mailObject: Mail): Promise<Response> => {
    const response = await axios.post(baseUrl, mailObject);
    return response.data as Response;
};

export type Mail = {
    email: string;
    message: string;
}

export type Response = {
    status: 'success' | 'fail';
}

export default mail;
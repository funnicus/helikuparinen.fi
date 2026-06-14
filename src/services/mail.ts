const baseUrl = '/api/mail/';

const mail = async (mailObject: Mail): Promise<Response> => {
    const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(mailObject),
    });

    if (!response.ok) {
        throw new Error('Failed to send message');
    }

    return (await response.json()) as Response;
};

export type Mail = {
    email: string;
    message: string;
};

export type Response = {
    status: 'success' | 'fail';
};

export default mail;

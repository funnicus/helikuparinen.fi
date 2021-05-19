import * as contentful from 'contentful';

export const client = contentful.createClient({
    space: process.env.SPACE_ID,
    accessToken: process.env.ACCESS_TOKEN,
});

export const getStatement = async (locale: string) => {
    const response = await client.getEntries({
        content_type: 'statement',
        locale,
    });
    console.log(response.items);
    return response.items as Statement[];
};

type Statement = contentful.Entry<{
    fields: {
        title: string;
        statement: string;
    };
}>
import * as contentful from 'contentful';

//import fs from 'fs';

export const client = contentful.createClient({
    space: process.env.SPACE_ID,
    accessToken: process.env.ACCESS_TOKEN,
});

export const getBio = async(locale: string): Promise<{
    title: string;
    bio: string;
}> => {
    const response = await client.getEntries({
        content_type: 'biography',
        locale,
    });
    console.log(response.items);
    return (response?.items as Biography[])[0].fields;
};

export const getStatement = async (locale: string): Promise<{
    title: string;
    statement: string;
}> => {
    const response = await client.getEntries({
        content_type: 'statement',
        locale,
    });
    console.log(response.items);
    return (response?.items as Statement[])[0].fields;
};

export const getGallery = async (locale: string): Promise<void> => {
    const response = await client.getEntries({
        content_type: 'gallery',
        locale,
    });

    console.log(response.items[0]);

    //fs.writeFileSync('data.json', JSON.stringify(response.items[0]));
};

export type Biography = contentful.Entry<{
        title: string;
        bio: string;
}>

export type Statement = contentful.Entry<{
        title: string;
        statement: string;
}>
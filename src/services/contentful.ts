import { Entry, createClient } from 'contentful';

import { ContentType } from '@type/contentful';

export const client = createClient({
    space: process.env.SPACE_ID,
    accessToken: process.env.ACCESS_TOKEN,
});

export const getSingleContent = async <T>(locale: string, type: ContentType): Promise<T> => {
    const response = await client.getEntries({
        content_type: type,
        include: 6,
        locale,
    });

    return (response?.items as Entry<T>[])[0].fields;
};

export const getContent = async <T>(locale: string, type: ContentType): Promise<Entry<T>[]> => {
    const response = await client.getEntries({
        content_type: type,
        include: 6,
        locale,
    });

    return (response?.items as Entry<T>[]);
};
import { Entry, createClient } from 'contentful';

import { ContentType, GetEntriesOpts, Post } from '@type/contentful';

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

/**
 * Returns all entries that have a field with the given value.
 * @param opts
 * @author kumpmati https://github.com/kumpmati
 * @returns
 */
export const getEntriesByField = async <T>({
    field,
    value,
    contentType,
    locale,
}: GetEntriesOpts): Promise<Entry<T>[] | null> => {
    const response = await client.getEntries<T>({
        content_type: contentType,
        [`fields.${field}[in]`]: value,
        include: 6,
        locale,
    });
  
    return response?.items || null;
};
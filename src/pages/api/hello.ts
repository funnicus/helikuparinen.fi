// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next';

import { getSingleContent, getContent } from '@services/contentful';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const response = await getContent('fi-FI', 'curriculum');
    console.log(response);
    res.status(200).json(response);
};

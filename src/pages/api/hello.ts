// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next';

import { getStatement } from '@services/contentful';

export default (req: NextApiRequest, res: NextApiResponse): void => {
    getStatement('fi-FI');
    res.status(200).json({ name: 'John Doe' });
};

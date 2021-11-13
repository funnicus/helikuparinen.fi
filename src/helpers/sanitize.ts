import { FilterXSS, IFilterXSSOptions } from 'xss';

const options: IFilterXSSOptions = {
    whiteList: {}, // don't allow any tags
};

const xss = new FilterXSS(options);
const sanitize = (html: string): string => xss.process(html);

export default sanitize;
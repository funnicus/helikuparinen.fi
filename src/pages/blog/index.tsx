import Head from 'next/head';

import blogStyles from './index.module.css';

const Blog = (): JSX.Element => {
    return (
        <div className={blogStyles.Blog}>
            <Head >
                <title>About me</title>
                <meta name='description' content='Blogs about Heli&#39;s art.' />
            </Head>
            Hello world!
        </div>
    );
};

export default Blog;
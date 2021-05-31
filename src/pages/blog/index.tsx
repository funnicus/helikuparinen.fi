import { useEffect } from 'react';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { Entry } from 'contentful';

import { useStateValue, setTheme } from '@state/index';
import { getContent } from '@services/contentful';
import { Post } from '@type/contentful';

import blogStyles from './index.module.css';

const Blog = ({ posts }: Props): JSX.Element => {

    const { locale } = useRouter();
    const [, dispatch ] = useStateValue();

    useEffect(() => {
        dispatch(setTheme({ background: '#fff', color: '#242424', }));
    }, []);

    return (
        <div className={blogStyles.Blog}>
            <Head >
                <title>About me</title>
                <meta name='description' content='Blogs about Heli&#39;s art adn day to day life.' />
            </Head>
            <div className={blogStyles.posts}>
                <h1>{locale === 'fi-FI' ? 'Blogi' : 'Blog'}</h1>
                {posts ? posts.map(post => {
                    return(
                        <div className={blogStyles.post} key={post.sys.id}>
                            <img
                                src={`https:${post.fields.cover.fields.file.url}`}
                            />
                            <div>
                                <p>{post.fields.date.split('-').join(' ').split('T')}</p>
                                <h2>{post.fields.title}</h2>
                                <p>{post.fields.excerpt}</p>
                                <Link href={`/blog/${post.fields.slug}`}>{locale === 'fi-FI' ? 'Lue Lisää' : 'Read More'}</Link>
                            </div>
                        </div>
                    );
                }) : null}
            </div>
        </div>
    );
};

function getDate(date: string) {
    const arr = date.split('-').join(' ').split('T');
}

export const getStaticProps: GetStaticProps = async context => {
    return {
        props: {
            posts: await getContent<Post>(context.locale, 'post')
        },
    };
};

type Props = {
    posts: Entry<Post>[];
}

export default Blog;

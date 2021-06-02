import { useEffect } from 'react';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { Entry } from 'contentful';

import { useStateValue, setTheme } from '@state/index';
import { getContent } from '@services/contentful';
import { Post } from '@type/contentful';
import { getDateFI, getDateUS } from '@helpers/parseDates';

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
                    console.log(post.fields.date.split('-'));
                    console.log(post.fields.date.split('-').join(' '));
                    console.log(post.fields.date.split('-').join(' ').split('T'));
                    return(
                        <div className={blogStyles.post} key={post.sys.id}>
                            <img
                                src={`https:${post.fields.cover.fields.file.url}`}
                            />
                            <div>
                                <p>{locale === 'fi-FI' ? getDateFI(post.fields.date) : getDateUS(post.fields.date)}</p>
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

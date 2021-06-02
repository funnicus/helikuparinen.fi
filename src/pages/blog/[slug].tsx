import { useEffect, FC } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { Entry } from 'contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

import { getContent, getEntriesByField } from '@services/contentful';
import { Post as Blog } from '@type/contentful';
import { useStateValue, setTheme } from '@state/index';
import { getDateFI, getDateUS } from '@helpers/parseDates';
import { options } from './options';
import slugStyles from './slug.module.css';

const Post: FC<Props> = ({ post }) => {

    const [, dispatch ] = useStateValue();

    const { locale } = useRouter();

    useEffect(() => {
        dispatch(setTheme({ background: '#fff', color: '#242424' }));
    }, []);

    console.log(post);

    if(!post) return <span>Loading...</span>;

    return (
        <div className={slugStyles.Slug}>
            <img
                src={`https:${post.fields.cover.fields.file.url}`}
            />
            <h3>{locale === 'fi-FI' ? getDateFI(post.fields.date) : getDateUS(post.fields.date)}</h3>
            {documentToReactComponents(post.fields.content, options)}
        </div>
    );
};

export default Post;

type Props = {
    preview: boolean;
    post: Entry<Blog>;
    morePosts: Entry<Blog>[];
}

export const getStaticProps: GetStaticProps = async ({ params, preview = false, locale }) => {
    const data = await getEntriesByField<Blog>({ field: 'slug', value: (Array.isArray(params.slug) ? params.slug[0] : params.slug), contentType: 'post', locale });
  
    const post = data[0];

    return {
        props: {
            preview,
            post: post ?? null,
        },
    };
};
  
export const getStaticPaths: GetStaticPaths = async () => {
    const allPosts = await getContent<Blog>('en-US', 'post');
    return {
        paths: allPosts?.map(post => ({
            params: { slug: post.fields.slug },
        })) ?? [],
        fallback: true,
    };
};

/*

            <h1>{post.fields.title}</h1>
            {post.fields.content.content?.map((paragraph, i) => {
                return (
                    <section key={i}>{paragraph.content?.map(content => {
                        return (
                            content.nodeType === 'text' ? <h2>{content.value}</h2> :
                                <p>{content.value}</p>
                        );
                    })}</section>
                );
            })}
*/
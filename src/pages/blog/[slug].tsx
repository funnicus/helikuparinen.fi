import { useEffect } from 'react';
import { GetStaticPaths } from 'next';

import { getContent } from '@services/contentful';
import { Post as Blog } from '@type/contentful';
import { useStateValue, setTheme } from '@state/index';

const Post = (): JSX.Element => {

    const [, dispatch ] = useStateValue();

    useEffect(() => {
        dispatch(setTheme({ background: '#fff', color: '#242424' }));
    }, []);

    return (
        <div>
            Hei :D
        </div>
    );
};

export default Post;

export async function getStaticProps({ params, preview = false }) {
    //const data = await getPostAndMorePosts(params.slug, preview);
  
    return {
        props: {
            preview,
            //post: data?.post ?? null,
            //morePosts: data?.morePosts ?? null,
        },
    };
}
  
export const getStaticPaths: GetStaticPaths = async () => {
    const allPosts = await getContent<Blog>('en-US', 'post');
    return {
        paths: allPosts?.map(post => ({
            params: { slug: post.fields.slug },
        })) ?? [],
        fallback: true,
    };
};
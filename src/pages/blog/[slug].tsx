const Post = (): JSX.Element => {
    return (
        <div>
            
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
  
export async function getStaticPaths() {
    //const allPosts = await getAllPostsWithSlug();
    return {
        //paths: allPosts?.map(({ slug }) => `/posts/${slug}`) ?? [],
        fallback: true,
    };
}
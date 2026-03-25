import { useEffect, FC } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { FaCalendarAlt } from 'react-icons/fa';
import { Entry } from 'contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

import { getContent, getEntriesByField } from '@/services/contentful';
import { Post as Blog } from '@/types/contentful';
import { useStateValue, setTheme } from '@/state/index';
import { getDateFI, getDateUS } from '@/helpers/parseDates';
import { options } from '@/helpers/options';
import Seo from '@/components/seo';
import JsonLd, {
    blogPostingSchema,
    breadcrumbSchema,
} from '@/components/seo/JsonLd';
import slugStyles from './slug.module.css';

const Post: FC<Props> = ({ post }) => {
    const [, dispatch] = useStateValue();

    const router = useRouter();

    const { locale } = router;

    useEffect(() => {
        dispatch(setTheme({ background: '#fff', color: '#242424' }));
    }, []);

    if (!post) return <span>Loading...</span>;

    const file = post.fields.cover.fields.file;
    const ogImage = `https:${file.url}`;
    const title = `${post.fields.title} | Heli Kuparinen`;

    const jsonLdData = [
        blogPostingSchema({
            title: post.fields.title,
            excerpt: post.fields.excerpt,
            date: post.fields.date,
            slug: post.fields.slug,
            coverUrl: ogImage,
            locale,
        }),
        breadcrumbSchema([
            { name: 'Heli Kuparinen', url: 'https://helikuparinen.fi' },
            {
                name: locale === 'fi-FI' ? 'Blogi' : 'Blog',
                url:
                    locale === 'fi-FI'
                        ? 'https://helikuparinen.fi/blog'
                        : 'https://helikuparinen.fi/en-US/blog',
            },
            {
                name: post.fields.title,
                url:
                    locale === 'fi-FI'
                        ? `https://helikuparinen.fi/blog/${post.fields.slug}`
                        : `https://helikuparinen.fi/en-US/blog/${post.fields.slug}`,
            },
        ]),
    ];

    return (
        <div className={slugStyles.Slug}>
            <Seo
                title={title}
                description={post.fields.excerpt}
                ogType="article"
                ogImage={ogImage}
                ogImageAlt={post.fields.cover.fields.title}
            />
            <JsonLd data={jsonLdData} />
            <Image
                src={ogImage}
                width={file.details.image.width}
                height={file.details.image.height / 2}
                alt={post.fields.cover.fields.title}
            />
            <h3>
                <FaCalendarAlt style={{ color: 'green' }} />{' '}
                {locale === 'fi-FI'
                    ? getDateFI(post.fields.date)
                    : getDateUS(post.fields.date)}
            </h3>
            {documentToReactComponents(post.fields.content, options)}
        </div>
    );
};

export default Post;

type Props = {
    preview: boolean;
    post: Entry<Blog>;
};

export const getStaticProps: GetStaticProps = async ({
    params,
    preview = false,
    locale,
}) => {
    const data = await getEntriesByField<Blog>({
        field: 'slug',
        value: Array.isArray(params.slug) ? params.slug[0] : params.slug,
        contentType: 'post',
        locale,
    });

    const post = data[0];

    return {
        props: {
            preview,
            post: post ?? null,
        },
        revalidate: 200,
    };
};

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
    const allPosts = await getContent<Blog>('en-US', 'post');

    const paths: { params: { slug: string }; locale: string }[] = [];

    for (const locale of locales) {
        const localePaths =
            allPosts?.map((post) => ({
                params: { slug: post.fields.slug },
                locale,
            })) ?? [];
        paths.push(...localePaths);
    }

    return {
        paths,
        fallback: 'blocking',
    };
};

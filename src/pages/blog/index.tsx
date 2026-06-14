import { useEffect } from 'react';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { Entry } from 'contentful';

import Seo from '@/components/seo';
import JsonLd, { breadcrumbSchema, SITE_URL } from '@/components/seo/JsonLd';
import Breadcrumb from '@/components/breadcrumb';
import { useStateValue, setTheme } from '@/state/index';
import { getContent } from '@/services/contentful';
import { Post } from '@/types/contentful';
import { getDateFI, getDateUS } from '@/helpers/parseDates';

import blogStyles from './index.module.css';

const Blog = ({ posts }: Props): JSX.Element => {
    const router = useRouter();
    const { locale } = router;
    const [, dispatch] = useStateValue();
    const isFi = locale === 'fi-FI';

    useEffect(() => {
        dispatch(setTheme({ background: '#fff', color: '#242424' }));
    }, []);

    // A bit hacky, but works for now...
    const getImageDimension = (dimension: number) =>
        dimension * (250 / dimension);

    const title = isFi ? 'Blogi | Heli Kuparinen' : 'Blog | Heli Kuparinen';

    const description = isFi
        ? 'Blogikirjoituksia Helin taiteesta ja arjesta.'
        : "Blog posts about Heli's art and day to day life.";

    const breadcrumb = breadcrumbSchema([
        { name: 'Heli Kuparinen', url: SITE_URL },
        {
            name: isFi ? 'Blogi' : 'Blog',
            url: `${SITE_URL}${isFi ? '' : '/' + locale}/blog`,
        },
    ]);

    return (
        <div className={blogStyles.Blog}>
            <Seo title={title} description={description} />
            <JsonLd data={breadcrumb} />
            <Breadcrumb
                items={[
                    { label: 'Heli Kuparinen', href: '/' },
                    { label: isFi ? 'Blogi' : 'Blog', href: '/blog' },
                ]}
            />
            <section className={blogStyles.posts}>
                <h1>{isFi ? 'Blogi' : 'Blog'}</h1>
                {posts
                    ? posts
                          .sort(
                              (postA, postB) =>
                                  new Date(postB.fields.date).getTime() -
                                  new Date(postA.fields.date).getTime(),
                          )
                          .map((post) => {
                              const file = post.fields.cover.fields.file;
                              return (
                                  <article
                                      className={blogStyles.post}
                                      key={post.sys.id}
                                      onClick={() =>
                                          router.push(
                                              `/blog/${post.fields.slug}`,
                                          )
                                      }
                                  >
                                      <Image
                                          src={`https:${file.url}`}
                                          width={getImageDimension(
                                              file.details.image.width,
                                          )}
                                          height={getImageDimension(
                                              file.details.image.height,
                                          )}
                                          style={{ objectFit: 'cover' }}
                                          quality={65}
                                          alt={post.fields.cover.fields.title}
                                      />
                                      <div>
                                          <p>
                                              <time dateTime={post.fields.date}>
                                                  {isFi
                                                      ? getDateFI(
                                                            post.fields.date,
                                                        )
                                                      : getDateUS(
                                                            post.fields.date,
                                                        )}
                                              </time>
                                          </p>
                                          <h2>{post.fields.title}</h2>
                                          <p>{post.fields.excerpt}</p>
                                          <Link
                                              href={`/blog/${post.fields.slug}`}
                                          >
                                              {isFi ? 'Lue Lisää' : 'Read More'}
                                          </Link>
                                      </div>
                                  </article>
                              );
                          })
                    : null}
            </section>
        </div>
    );
};

export const getStaticProps: GetStaticProps = async (context) => {
    return {
        props: {
            posts: await getContent<Post>(context.locale, 'post'),
        },
        revalidate: 200,
    };
};

type Props = {
    posts: Entry<Post>[];
};

export default Blog;

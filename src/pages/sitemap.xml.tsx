import { GetServerSideProps } from 'next';
import { getContent } from '@/services/contentful';
import { Post } from '@/types/contentful';

const SITE_URL = 'https://helikuparinen.fi';

const staticPages = ['', '/about', '/paintings', '/blog'];
const locales = ['fi-FI', 'en-US'];

type BlogRoute = {
    id: string;
    locale: string;
    slug: string;
};

function getLocalePath(locale: string, path: string): string {
    // fi-FI is the default locale, so no prefix
    if (locale === 'fi-FI') return `${SITE_URL}${path}`;
    return `${SITE_URL}/${locale}${path}`;
}

function generateSitemap(blogRoutes: BlogRoute[]): string {
    const urls: string[] = [];

    for (const page of staticPages) {
        for (const locale of locales) {
            const loc = getLocalePath(locale, page);
            const alternates = locales
                .map(
                    (l) =>
                        `      <xhtml:link rel="alternate" hreflang="${l.split('-')[0]}" href="${getLocalePath(l, page)}" />`,
                )
                .join('\n');
            const xDefault = `      <xhtml:link rel="alternate" hreflang="x-default" href="${getLocalePath('fi-FI', page)}" />`;

            urls.push(`
    <url>
      <loc>${loc}</loc>
${alternates}
${xDefault}
      <changefreq>${page === '' ? 'weekly' : 'monthly'}</changefreq>
      <priority>${page === '' ? '1.0' : '0.8'}</priority>
    </url>`);
        }
    }

    const blogRoutesByEntry = blogRoutes.reduce<
        Record<string, Record<string, string>>
    >((entries, route) => {
        entries[route.id] = {
            ...(entries[route.id] ?? {}),
            [route.locale]: route.slug,
        };
        return entries;
    }, {});

    for (const route of blogRoutes) {
        const localizedSlugs = blogRoutesByEntry[route.id];
        const path = `/blog/${route.slug}`;
        const alternates = locales
            .filter((locale) => localizedSlugs[locale])
            .map(
                (locale) =>
                    `      <xhtml:link rel="alternate" hreflang="${locale.split('-')[0]}" href="${getLocalePath(locale, `/blog/${localizedSlugs[locale]}`)}" />`,
            )
            .join('\n');
        const xDefaultLocale = localizedSlugs['fi-FI'] ? 'fi-FI' : route.locale;
        const xDefaultSlug = localizedSlugs[xDefaultLocale];
        const xDefault = `      <xhtml:link rel="alternate" hreflang="x-default" href="${getLocalePath(xDefaultLocale, `/blog/${xDefaultSlug}`)}" />`;

        urls.push(`
    <url>
      <loc>${getLocalePath(route.locale, path)}</loc>
${alternates}
${xDefault}
      <changefreq>monthly</changefreq>
      <priority>0.6</priority>
    </url>`);
    }

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
>${urls.join('')}
</urlset>`;
}

// This component never renders — getServerSideProps sends the XML directly
export default function Sitemap(): null {
    return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
    const blogRoutes = (
        await Promise.all(
            locales.map(async (locale) => {
                try {
                    const posts = await getContent<Post>(locale, 'post');
                    return (
                        posts?.map((post) => ({
                            id: post.sys.id,
                            locale,
                            slug: post.fields.slug,
                        })) ?? []
                    );
                } catch (error) {
                    console.error(
                        `Failed to fetch ${locale} blog posts for sitemap:`,
                        error,
                    );
                    return [];
                }
            }),
        )
    ).flat();

    const sitemap = generateSitemap(blogRoutes);

    res.setHeader('Content-Type', 'application/xml');
    res.setHeader(
        'Cache-Control',
        'public, s-maxage=86400, stale-while-revalidate=43200',
    );
    res.write(sitemap);
    res.end();

    return { props: {} };
};

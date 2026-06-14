import Head from 'next/head';
import { useRouter } from 'next/router';
import { FC } from 'react';

const SITE_URL = 'https://helikuparinen.fi';
const DEFAULT_OG_IMAGE = `${SITE_URL}/profile-heli.png`;
const LOCALES = ['fi-FI', 'en-US'];

interface SeoProps {
    title: string;
    description: string;
    ogType?: 'website' | 'article';
    ogImage?: string;
    ogImageAlt?: string;
    noindex?: boolean;
}

function getCanonicalPath(path: string): string {
    const [pathWithoutHash] = path.split('#');
    const [pathWithoutQuery] = pathWithoutHash.split('?');
    const normalizedPath = pathWithoutQuery.startsWith('/')
        ? pathWithoutQuery
        : `/${pathWithoutQuery}`;
    const pathWithoutLocale =
        LOCALES.reduce((currentPath, currentLocale) => {
            if (currentPath === `/${currentLocale}`) return '/';
            if (currentPath.startsWith(`/${currentLocale}/`)) {
                return currentPath.replace(`/${currentLocale}`, '');
            }
            return currentPath;
        }, normalizedPath) || '/';

    return pathWithoutLocale;
}

function getLocalePath(locale: string, path: string): string {
    const canonicalPath = getCanonicalPath(path);

    if (locale === 'fi-FI') return `${SITE_URL}${canonicalPath}`;
    return `${SITE_URL}/${locale}${canonicalPath}`;
}

const Seo: FC<SeoProps> = ({
    title,
    description,
    ogType = 'website',
    ogImage,
    ogImageAlt,
    noindex = false,
}) => {
    const { locale, asPath } = useRouter();

    const canonicalPath = getCanonicalPath(asPath);
    const canonicalUrl = getLocalePath(locale, canonicalPath);
    const image = ogImage || DEFAULT_OG_IMAGE;
    const imageAlt = ogImageAlt || title;
    const ogLocale = locale === 'fi-FI' ? 'fi_FI' : 'en_US';
    const ogLocaleAlternate = locale === 'fi-FI' ? 'en_US' : 'fi_FI';

    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />

            {noindex && <meta name="robots" content="noindex, nofollow" />}

            {/* Canonical */}
            <link rel="canonical" href={canonicalUrl} />

            {/* Hreflang alternates */}
            <link
                rel="alternate"
                hrefLang="fi"
                href={getLocalePath('fi-FI', canonicalPath)}
            />
            <link
                rel="alternate"
                hrefLang="en"
                href={getLocalePath('en-US', canonicalPath)}
            />
            <link
                rel="alternate"
                hrefLang="x-default"
                href={getLocalePath('fi-FI', canonicalPath)}
            />

            {/* Open Graph */}
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content={ogType} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:image" content={image} />
            <meta property="og:image:alt" content={imageAlt} />
            <meta property="og:locale" content={ogLocale} />
            <meta property="og:locale:alternate" content={ogLocaleAlternate} />
            <meta property="og:site_name" content="Heli Kuparinen" />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
            <meta name="twitter:image:alt" content={imageAlt} />
        </Head>
    );
};

export default Seo;

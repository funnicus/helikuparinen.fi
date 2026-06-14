import Head from 'next/head';
import { FC } from 'react';

interface JsonLdProps {
    data: Record<string, unknown> | Record<string, unknown>[];
}

/**
 * Injects JSON-LD structured data into the page <head>.
 * Accepts a single schema object or an array of schemas (rendered as @graph).
 */
const JsonLd: FC<JsonLdProps> = ({ data }) => {
    const structuredData = Array.isArray(data)
        ? { '@context': 'https://schema.org', '@graph': data }
        : { '@context': 'https://schema.org', ...data };

    return (
        <Head>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(structuredData),
                }}
            />
        </Head>
    );
};

export default JsonLd;

// ── Schema builder helpers ──────────────────────────────────────────────

const SITE_URL = 'https://helikuparinen.fi';

export function websiteSchema() {
    return {
        '@type': 'WebSite',
        name: 'Heli Kuparinen',
        url: SITE_URL,
        inLanguage: ['fi', 'en'],
        description:
            'Official website of Heli Kuparinen, a Helsinki-based visual artist and painter.',
    };
}

export function personSchema() {
    return {
        '@type': 'Person',
        name: 'Heli Kuparinen',
        url: SITE_URL,
        image: `${SITE_URL}/profile-heli.png`,
        jobTitle: 'Visual Artist',
        description:
            'Helsinki-based visual artist who works primarily with oil paints and portrays people in her works.',
        sameAs: [
            'https://www.facebook.com/heli.kuparinen',
            'https://instagram.com/heli_kuparinen_art',
        ],
        knowsAbout: ['Oil painting', 'Visual arts', 'Portraiture'],
    };
}

export function breadcrumbSchema(
    items: { name: string; url: string }[],
): Record<string, unknown> {
    return {
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    };
}

export function blogPostingSchema(post: {
    title: string;
    excerpt: string;
    date: string;
    slug: string;
    coverUrl: string;
    locale: string;
}): Record<string, unknown> {
    const localePrefix = post.locale === 'fi-FI' ? '' : `/${post.locale}`;
    return {
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.excerpt,
        datePublished: post.date,
        image: post.coverUrl,
        url: `${SITE_URL}${localePrefix}/blog/${post.slug}`,
        author: personSchema(),
        publisher: {
            '@type': 'Person',
            name: 'Heli Kuparinen',
            url: SITE_URL,
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${SITE_URL}${localePrefix}/blog/${post.slug}`,
        },
    };
}

function visualArtworkSchema(painting: {
    name: string;
    description?: string;
    imageUrl: string;
}): Record<string, unknown> {
    return {
        '@type': 'VisualArtwork',
        name: painting.name,
        ...(painting.description && { description: painting.description }),
        image: painting.imageUrl,
        creator: personSchema(),
        artMedium: 'Oil paint',
    };
}

export function artGallerySchema(
    artworks: { name: string; description?: string; imageUrl: string }[],
): Record<string, unknown> {
    return {
        '@type': 'CollectionPage',
        name: 'Paintings by Heli Kuparinen',
        url: `${SITE_URL}/paintings`,
        mainEntity: {
            '@type': 'ItemList',
            numberOfItems: artworks.length,
            itemListElement: artworks.map((artwork, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                item: visualArtworkSchema(artwork),
            })),
        },
    };
}

export function faqPageSchema(
    items: { question: string; answer: string }[],
): Record<string, unknown> {
    return {
        '@type': 'FAQPage',
        mainEntity: items.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer,
            },
        })),
    };
}

export { SITE_URL };

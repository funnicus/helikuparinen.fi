import Script from 'next/script';
import React, { useEffect, useState } from 'react';
import styles from './analytics.module.scss';
import { useRouter } from 'next/router';
import { FiCheck, FiX } from 'react-icons/fi';
import { pageview } from '@/helpers/gtag';

const getCookie = (name: string): string | undefined => {
    if (typeof document === 'undefined') return undefined;
    const match = document.cookie.match(
        new RegExp('(?:^|; )' + name + '=([^;]*)'),
    );
    return match ? decodeURIComponent(match[1]) : undefined;
};

const setCookie = (name: string, value: string): void => {
    document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=31536000; SameSite=Lax`;
};

const Analytics = (): JSX.Element => {
    const { locale, events, asPath } = useRouter();

    const isProduction = process.env.NODE_ENV === 'production';

    const [showBanner, setShowBanner] = useState(false);
    const [cookiesEnabled, setCookiesEnabled] = useState(false);
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        const bannerShown = !!getCookie('bannerShown');
        const enabled = getCookie('cookiesEnabled') === 'true';
        setShowBanner(!bannerShown);
        setCookiesEnabled(enabled);
        setHasMounted(true);
    }, []);

    useEffect(() => {
        if (!cookiesEnabled) return;

        // track initial page load
        pageview(asPath);

        // track subsequent page changes
        events.on('routeChangeComplete', pageview);

        return () => events.off('routeChangeComplete', pageview);
    }, [events, cookiesEnabled]);

    const closeBanner = () => {
        setCookie('bannerShown', 'true');
        setShowBanner(false);
    };

    const acceptTracking = () => {
        setCookie('cookiesEnabled', 'true');
        setCookiesEnabled(true);
        closeBanner();
    };

    const denyTracking = () => {
        setCookie('cookiesEnabled', 'false');
        setCookiesEnabled(false);
        closeBanner();
    };

    // Hydration will go bonkers without this, not sure why
    // https://stackoverflow.com/questions/58293542/next-js-warning-expected-server-html-to-contain-a-matching-a-in-div-how-to
    if (!hasMounted) {
        return null;
    }

    return (
        <>
            {showBanner && (
                <div className={styles.banner}>
                    <div className={styles.wrapper}>
                        <p>
                            {locale === 'fi-FI'
                                ? 'Tämä sivusto käyttää evästeitä kävijämäärien tilastoimiseen. Hyväksytäänkö evästeet?'
                                : 'This site uses cookies for visitor statistics. Allow cookies?'}
                        </p>
                        <div className={styles.buttons}>
                            <button
                                className={styles.accept}
                                onClick={acceptTracking}
                            >
                                <FiCheck />
                            </button>
                            <button
                                className={styles.deny}
                                onClick={denyTracking}
                            >
                                <FiX />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {cookiesEnabled && isProduction && (
                <>
                    <Script
                        async
                        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
                    />
                    <Script
                        id="gtag"
                        dangerouslySetInnerHTML={{
                            __html: `
                                window.dataLayer = window.dataLayer || [];
                                function gtag(){ dataLayer.push(arguments); }
                                gtag('js', new Date());
                                gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                                    page_path: window.location.pathname,
                                });
                            `,
                        }}
                    />
                </>
            )}
        </>
    );
};

export default Analytics;

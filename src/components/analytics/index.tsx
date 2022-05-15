import Script from 'next/script';
import React, { useEffect, useState } from 'react';
import { parseCookies, setCookie } from 'nookies';
import styles from './analytics.module.scss';
import { useRouter } from 'next/router';
import { FiCheck, FiX } from 'react-icons/fi';
import { pageview } from '@/helpers/gtag';

const Analytics = (): JSX.Element => {
    const cookies = parseCookies();
    const { locale, events, asPath } = useRouter();

    const isProduction = process.env.NODE_ENV === 'production';
    const bannerShown = !!cookies.bannerShown;
    const cookiesEnabled = cookies.cookiesEnabled === 'true';

    // show banner if it has not been dismissed by user yet
    const [showBanner, setShowBanner] = useState(!bannerShown);
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
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
        setCookie(null, 'bannerShown', 'true');
        setShowBanner(false);
    };

    const acceptTracking = () => {
        setCookie(null, 'cookiesEnabled', 'true');
        closeBanner();
    };

    const denyTracking = () => {
        setCookie(null, 'cookiesEnabled', 'false');
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
                                ? 'Tämä sivu käyttää evästeitä kävijämäärien tilastoimiseen. Hyväksytäänkö evästeet?'
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

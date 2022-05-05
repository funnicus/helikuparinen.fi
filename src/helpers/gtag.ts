/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/**
 * Helper functions for Google Analytics
 * https://hoangtrinhj.com/using-google-analytics-with-next-js
 */

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string): void => {
    if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
        window.gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
            page_path: url,
        });
    }
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }): void => {
    if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
        window.gtag('event', action, {
            event_category: category,
            event_label: label,
            value: value,
        });
    }
};

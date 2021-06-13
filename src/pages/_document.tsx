import { Fragment } from 'react';
import Document, { 
    Html, Head, Main, NextScript, DocumentContext, DocumentInitialProps 
} from 'next/document';

import { GA_TRACKING_ID } from '@helpers/gtag';

class MyDocument extends Document<Props> {

    static async getInitialProps(ctx: DocumentContext): Promise<Props> {
        const initialProps = await Document.getInitialProps(ctx);

        // Check if in production
        const isProduction = process.env.NODE_ENV === 'production';

        return {
            ...initialProps,
            isProduction,
        };
    }

    render(): JSX.Element {

        const { isProduction } = this.props;

        return (
            <Html>
                <Head />

                {/* We only want to add the scripts if in production */}
                {isProduction && (
                    <Fragment>
                        {/* Global Site Tag (gtag.js) - Google Analytics */}
                        <script
                            async
                            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
                        />
                        <script
                            dangerouslySetInnerHTML={{
                                __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());

                    gtag('config', '${GA_TRACKING_ID}', {
                      page_path: window.location.pathname,
                    });
                  `,
                            }}
                        />
                    </Fragment>
                )}

                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

interface Props extends DocumentInitialProps {
    isProduction?: boolean;
}

export default MyDocument;

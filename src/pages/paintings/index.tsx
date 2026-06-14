import { useState, useEffect } from 'react';

import { GetStaticProps } from 'next';
import Image from 'next/image';

import ImageOverlay from '@/components/imageOverlay';
import Seo from '@/components/seo';
import JsonLd, {
    artGallerySchema,
    breadcrumbSchema,
    SITE_URL,
} from '@/components/seo/JsonLd';
import { getContent } from '@/services/contentful';
import { PaintingsProps, Gallery, File } from '@/types/contentful';

import useWindowDimensions from '@/hooks/useWindowDimensions';
import { useStateValue, setTheme } from '@/state/index';
import { useRouter } from 'next/router';

import paintingsStyles from './paintings.module.css';

const Paintings = ({ gallery }: PaintingsProps): JSX.Element => {
    const [imageFile, setImageFile] = useState(null);
    const [text, setText] = useState('');
    const [visible, setVisible] = useState(false);

    const { width } = useWindowDimensions();
    const [, dispatch] = useStateValue();
    const { locale } = useRouter();

    const isFi = locale === 'fi-FI';

    useEffect(() => {
        dispatch(setTheme({ background: '#fff', color: '#242424' }));
    }, []);

    const openImage = (text: string, file: File) => {
        setText(text);
        setImageFile(file);
        setVisible(!visible);
    };

    const closeImeage = () => {
        setImageFile(null);
        setVisible(!visible);
    };

    const title = isFi
        ? 'Teokset | Heli Kuparinen'
        : 'Paintings | Heli Kuparinen';

    const description = isFi
        ? 'Tutustu Heli Kuparisen maalauksiin ja kokoelmiin. Heli työskentelee pääasiassa öljyväreillä ja kuvaa ihmisiä teoksissaan.'
        : 'Browse paintings and collections by Heli Kuparinen. Heli works primarily with oil paints and portrays people in her works.';

    // Collect all paintings for structured data
    const allArtworks = gallery[0].fields.collections.flatMap((collection) =>
        collection.fields.paintings.map((painting) => ({
            name: painting.fields.title,
            description: painting.fields.description as string | undefined,
            imageUrl: `https:${(painting.fields.file as File).url}`,
        })),
    );

    const localePath = isFi ? '' : `/${locale}`;

    return (
        <div className={paintingsStyles.Paintings}>
            <Seo title={title} description={description} />
            <JsonLd
                data={[
                    artGallerySchema(allArtworks),
                    breadcrumbSchema([
                        { name: 'Heli Kuparinen', url: SITE_URL },
                        {
                            name: isFi ? 'Teokset' : 'Paintings',
                            url: `${SITE_URL}${localePath}/paintings`,
                        },
                    ]),
                ]}
            />
            {imageFile ? (
                <ImageOverlay
                    visible={visible}
                    closeImage={closeImeage}
                    file={imageFile}
                    text={text}
                />
            ) : null}
            {gallery[0].fields.collections.map((collection) => {
                return (
                    <section key={collection.sys.id}>
                        <h2>{collection.fields.name}</h2>
                        <div>
                            {collection.fields.paintings.map((painting) => {
                                const file = painting.fields.file as File;
                                const details = file.details.image;
                                //some of the wide images are too wide
                                //even when divided by 3
                                const divider =
                                    details.width / 3 > width ? 4 : 3;
                                return (
                                    <div
                                        className={paintingsStyles.painting}
                                        style={{
                                            width: details.width / divider,
                                            height: details.height / divider,
                                        }}
                                        onClick={() =>
                                            openImage(
                                                painting.fields.title +
                                                    ' ' +
                                                    painting.fields.description,
                                                file,
                                            )
                                        }
                                        key={painting.sys.id}
                                    >
                                        <Image
                                            src={`https:${file.url}`}
                                            alt={painting.fields.title}
                                            quality={30}
                                            fill
                                            style={{ objectFit: 'contain' }}
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                );
            })}
        </div>
    );
};

export const getStaticProps: GetStaticProps = async (context) => {
    return {
        props: {
            gallery: await getContent<Gallery>(context.locale, 'gallery'),
        },
        revalidate: 600,
    };
};

export default Paintings;

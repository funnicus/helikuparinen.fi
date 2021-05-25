import { useState, useEffect } from 'react';

import { GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';

import ImageOverlay from '@components/imageOverlay';
import { getContent } from '@services/contentful';
import { PaintingsProps, Gallery, File } from '@type/contentful';

import useWindowDimensions from '@hooks/useWindowDimensions';
import { useStateValue, setTheme } from '@state/index';

import paintingsStyles from './paintings.module.css';

const Paintings = ({ gallery }: PaintingsProps): JSX.Element => {

    const [ imageFile, setImageFile ] = useState(null);
    const [ text, setText ] = useState('');
    const [ visible, setVisible ] = useState(false);

    const { width } = useWindowDimensions();
    const [, dispatch ] = useStateValue();

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

    return (
        <div className={paintingsStyles.Paintings} >
            <Head >
                <title>Gallery</title>
                <meta name='description' content='Here you can see all my paintnigs and the collections associated with them.' />
            </Head>
            {imageFile ? <ImageOverlay visible={visible} closeImage={closeImeage} file={imageFile} text={text}/> : null}
            {gallery[0].fields.collections.map(collection => {
                return(
                    <section key={collection.sys.id}>
                        <h2>{collection.fields.name}</h2>
                        <div>
                            {collection.fields.paintings.map(painting => {
                                const file = painting.fields.file;
                                const { width, height } = file.details.image;
                                return(
                                    <div 
                                        className={paintingsStyles.painting}
                                        style={{ 
                                            width: width/3,
                                            height: height/3
                                        }} 
                                        onClick={() => openImage(painting.fields.title + ' ' + painting.fields.description, file)}
                                        key={painting.sys.id}
                                    >
                                        <Image
                                            src={`https:${file.url}`}
                                            alt={painting.fields.title}
                                            quality='30'
                                            width={width}
                                            height={height}
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

export const getStaticProps: GetStaticProps = async context => {
    return {
        props: {
            gallery: await getContent<Gallery>(context.locale, 'gallery'),
        }
    };
};

export default Paintings;
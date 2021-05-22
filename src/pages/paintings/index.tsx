import { GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';

import { getContent } from '@services/contentful';
import { PaintingsProps, Gallery } from '@type/contentful';

import paintingsStyles from './paintings.module.css';

const Paintings = ({ gallery }: PaintingsProps): JSX.Element => {
    return (
        <div className={paintingsStyles.Paintings} >
            <Head >
                <title>Gallery</title>
                <meta name='description' content='Here you can see all my paintnigs and the collections associated with them.' />
            </Head>
            {gallery[0].fields.collections.map(collection => {
                return(
                    <section key={collection.sys.id}>
                        <h2>{collection.fields.name}</h2>
                        <div>
                            {collection.fields.paintings.map(painting => {
                                const file = painting.fields.file;
                                return(
                                    <div 
                                        className={paintingsStyles.painting}
                                        style={{ 
                                            width: file.details.image.width/4,
                                            height: file.details.image.height/4
                                        }} 
                                        key={painting.sys.id}
                                    >
                                        <Image
                                            src={`https:${file.url}`}
                                            alt={painting.fields.title}
                                            layout='fill'
                                            objectFit='cover'
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
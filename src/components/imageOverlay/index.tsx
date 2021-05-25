import Image from 'next/image';

import { File } from '@type/contentful';

import overlayStyles from './imageOverlay.module.css';

const ImageOverlay = ({ visible, closeImage, file, text }: ImageProps): JSX.Element => {
    return (
        <div 
            style={visible ? { display: 'block'} : { display: 'none' }} 
            className={overlayStyles.Overlay}
            onClick={closeImage}
        >
            <div>
                <Image 
                    src={`https:${file.url}`} 
                    alt={file.fileName} 
                    width={file.details.image.width/1.5} 
                    height={file.details.image.height/1.5}
                    quality='60'
                />
                <p>{text}</p>
            </div>
        </div>
    );
};

type ImageProps = {
    visible: boolean;
    closeImage: () => void;
    file: File;
    text: string;
}

export default ImageOverlay;
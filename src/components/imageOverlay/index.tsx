import Image from 'next/image';
import { SetStateAction } from 'react';

import overlayStyles from './imageOverlay.module.css';

const ImageOverlay = ({ visible, setVisible, file, text }: ImageProps): JSX.Element => {
    return (
        <div 
            style={visible ? { display: 'block'} : { display: 'none' }} 
            className={overlayStyles.Overlay}
            onClick={() => setVisible(prev => !prev)}
        >
            <div>
                <Image 
                    src={`https:${file.url}`} 
                    alt={file.fileName} 
                    width={file.details.image.width/1.5} 
                    height={file.details.image.height/1.5}/>
                <p>{text}</p>
            </div>
        </div>
    );
};

type ImageProps = {
    visible: boolean;
    setVisible: (value: SetStateAction<boolean>) => void;
    file: File;
    text: string;
}

type File = {
    url: string;
    details: {
        size: number;
        image?: {
            width: number;
            height: number;
        };
    };
    fileName: string;
    contentType: string;
}

export default ImageOverlay;
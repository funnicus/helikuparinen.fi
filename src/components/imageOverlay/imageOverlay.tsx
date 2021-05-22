import Image from 'next/image';

import overlayStyles from './imageOverlay.module.css';

const ImageOverlay = ({ style, painting, closeImage, txt }) => {
    return (
        <div className={overlayStyles.Overlay}>
            <div>
                <img src={painting} alt='image not found' />
                <p>{txt}</p>
            </div>
        </div>
    );
};

export default ImageOverlay;
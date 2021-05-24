import { useState, useEffect } from 'react';


function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}

export default function useWindowDimensions(): windowDimensions {
    const [ windowDimensions, setWindowDimensions ] = useState({ width: 0, height: 0 });

    useEffect(() => {
        setWindowDimensions(getWindowDimensions());

        function handleResize() {
            if (typeof window === 'undefined') return;
            setWindowDimensions(getWindowDimensions());
        }
    
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
}

type windowDimensions = {
    width: number;
    height: number;
}
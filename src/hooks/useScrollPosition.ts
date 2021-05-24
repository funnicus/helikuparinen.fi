import { useRef, DependencyList, MutableRefObject } from 'react';
import useIsomorphicLayoutEffect from '@helpers/useIsomorphicLayoutEffect';

/**
 * @author n8tb1t on Dev.to
 * https://dev.to/n8tb1t/tracking-scroll-position-with-react-hooks-3bbj
 * 
 * Hook fires a desired effect when scrolling to an element in the 
 * page (defaults to document.body)
 * 
 */

const isBrowser = typeof window !== 'undefined';
const getScrollPosition = ({
    element,
    useWindow,
}: {
   // eslint-disable-next-line
   element?: ElementRef;
   useWindow?: boolean;
 }) => {
    if (!isBrowser) return { x: 0, y: 0 };
 
    const target = element ? element.current : document.body;
    const position = target.getBoundingClientRect();
 
    return useWindow
        ? { x: window.scrollX, y: window.scrollY }
        : { x: position.left, y: position.top };
};
 
export default function useScrollPosition(
    effect: (props: IScrollProps) => void,
    deps?: DependencyList,
    element?: ElementRef,
    useWindow?: boolean,
    wait?: number
): void {
    const position = useRef(getScrollPosition({ useWindow }));
 
    let throttleTimeout = null;
 
    const callBack = () => {
        const currPos = getScrollPosition({ element, useWindow });
        effect({ prevPos: position.current, currPos });
        position.current = currPos;
        throttleTimeout = null;
    };
 
    useIsomorphicLayoutEffect(() => {
        const handleScroll = () => {
            if (wait) {
                if (throttleTimeout === null) {
                    throttleTimeout = setTimeout(callBack, wait);
                }
            } else {
                callBack();
            }
        };
 
        window.addEventListener('scroll', handleScroll);
 
        return () => window.removeEventListener('scroll', handleScroll);
    }, deps);
}

useScrollPosition.defaultProps = {
    deps: [],
    element: false,
    useWindow: false,
    wait: null,
    boundingElement: false,
};

type ElementRef = MutableRefObject<HTMLElement | undefined>;

interface IPosition {
    x: number;
    y: number;
}
  
export interface IScrollProps {
    prevPos: IPosition;
    currPos: IPosition;
}
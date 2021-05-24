import { useLayoutEffect, useEffect } from 'react';

/**
 * Helper to use useLayoutEffect without console warnings.
 * (it runs as useEffect on the server side and useLayoutEffect on the client side)
 * @see https://medium.com/@alexandereardon/uselayouteffect-and-ssr-192986cdcf7a
 */
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export default useIsomorphicLayoutEffect;
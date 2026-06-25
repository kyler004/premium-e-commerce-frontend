import { useSyncExternalStore } from 'react';

export const useMediaQuery = (query: string): boolean =>
    useSyncExternalStore(
        (callback) => {
            const media = window.matchMedia(query);
            media.addEventListener('change', callback);
            return () => media.removeEventListener('change', callback);
        },
        () => window.matchMedia(query).matches,
        () => false
    );

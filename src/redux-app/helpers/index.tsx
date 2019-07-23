export const RENDER_MODE_CONCURRENT = 'concurrent';
export const RENDER_MODE_NORMAL = 'normal';

export const getRenderMode = () => (
    (
        typeof window === 'object'
        && typeof window.location === 'object'
        && typeof window.location.search === 'string'
        && window.location.search.indexOf('renderMode=concurrent') !== -1
    )
    ? RENDER_MODE_CONCURRENT
    : RENDER_MODE_NORMAL
);

import type { Product, Variant } from '../types/api';

const PLACEHOLDER_IMAGES = [
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
    'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80',
    'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80',
];

export const getProductImages = (product: Product): string[] => {
    const index = product.id % PLACEHOLDER_IMAGES.length;
    return [PLACEHOLDER_IMAGES[index], PLACEHOLDER_IMAGES[(index + 1) % PLACEHOLDER_IMAGES.length]];
};

export const isProductInStock = (product: Product): boolean =>
    product.variants.some((v) => (v.inventory?.quantity ?? 0) > 0);

export const getAvailableQuantity = (variant: Variant): number =>
    variant.inventory?.quantity ?? 0;

export const formatVariantLabel = (variant: Variant): string => {
    const parts = [variant.color, variant.size].filter(Boolean);
    return parts.length > 0 ? parts.join(' / ') : variant.sku;
};

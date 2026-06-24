import { apiClient } from './client';
import type { Cart, CartLine, Wishlist, WishlistItem } from '../types/api';

export const wishlistApi = {
    get: () => apiClient.get<Wishlist>('/api/wishlist/'),

    addItem: (product: number) =>
        apiClient.post<WishlistItem>('/api/wishlist/items/', { product }),

    removeItem: (id: number) => apiClient.delete(`/api/wishlist/items/${id}/`),

    moveToCart: (id: number, variant: number, quantity = 1) =>
        apiClient.post<CartLine & { cart: Cart }>(
            `/api/wishlist/items/${id}/move-to-cart/`,
            { variant, quantity }
        ),
};

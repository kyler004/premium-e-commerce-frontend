import { apiClient } from './client';
import type { Cart, CartLine } from '../types/api';

export const cartApi = {
    get: () => apiClient.get<Cart>('/api/cart/'),

    clear: () => apiClient.delete('/api/cart/'),

    addItem: (variant: number, quantity = 1) =>
        apiClient.post<CartLine & { cart: Cart }>('/api/cart/items/', { variant, quantity }),

    updateItem: (id: number, quantity: number) =>
        apiClient.patch<CartLine & { cart: Cart }>(`/api/cart/items/${id}/`, { quantity }),

    removeItem: (id: number) => apiClient.delete(`/api/cart/items/${id}/`),

    applyPromo: (code: string) =>
        apiClient.post<Cart>('/api/cart/apply-promo/', { code }),

    removePromo: () => apiClient.delete<Cart>('/api/cart/promo/'),
};

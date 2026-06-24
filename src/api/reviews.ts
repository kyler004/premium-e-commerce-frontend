import { apiClient } from './client';
import type { Review } from '../types/api';

export const reviewsApi = {
    create: (productId: number, data: { rating: number; title?: string; body: string }) =>
        apiClient.post<Review>(`/api/products/${productId}/reviews/`, data),

    update: (id: number, data: Partial<{ rating: number; title: string; body: string }>) =>
        apiClient.patch<Review>(`/api/reviews/${id}/`, data),

    delete: (id: number) => apiClient.delete(`/api/reviews/${id}/`),
};

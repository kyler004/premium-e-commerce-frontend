import { apiClient, getPaginated } from './client';
import type { Promotion } from '../types/api';

export const promotionsApi = {
    list: (page = 1, page_size = 10) =>
        getPaginated<Promotion>('/api/promotions/', { page, page_size }),

    get: (id: number) => apiClient.get<Promotion>(`/api/promotions/${id}/`),

    create: (data: Partial<Promotion>) => apiClient.post<Promotion>('/api/promotions/', data),

    update: (id: number, data: Partial<Promotion>) =>
        apiClient.patch<Promotion>(`/api/promotions/${id}/`, data),

    delete: (id: number) => apiClient.delete(`/api/promotions/${id}/`),
};

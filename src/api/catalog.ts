import { apiClient, buildQueryPath, getPaginated } from './client';
import type { Category, PaginatedResponse, Product, ProductFilters, Review, Variant, Inventory } from '../types/api';

export const catalogApi = {
    listCategories: (params?: { page?: number; page_size?: number; search?: string }) =>
        getPaginated<Category>('/api/categories/', params, false),

    getCategory: (id: number) => apiClient.get<Category>(`/api/categories/${id}/`, false),

    createCategory: (data: Partial<Category>) =>
        apiClient.post<Category>('/api/categories/', data),

    updateCategory: (id: number, data: Partial<Category>) =>
        apiClient.patch<Category>(`/api/categories/${id}/`, data),

    deleteCategory: (id: number) => apiClient.delete(`/api/categories/${id}/`),

    listProducts: (filters?: ProductFilters) =>
        apiClient.get<PaginatedResponse<Product>>(
            buildQueryPath('/api/products/', filters as Record<string, string | number | undefined>),
            false
        ),

    getProduct: (id: number) => apiClient.get<Product>(`/api/products/${id}/`, false),

    createProduct: (data: Partial<Product>) => apiClient.post<Product>('/api/products/', data),

    updateProduct: (id: number, data: Partial<Product>) =>
        apiClient.patch<Product>(`/api/products/${id}/`, data),

    deleteProduct: (id: number) => apiClient.delete(`/api/products/${id}/`),

    listVariants: (params?: Record<string, string | number | undefined>) =>
        getPaginated<Variant>('/api/variants/', params),

    getVariant: (id: number) => apiClient.get<Variant>(`/api/variants/${id}/`, false),

    createVariant: (data: Partial<Variant>) => apiClient.post<Variant>('/api/variants/', data),

    updateVariant: (id: number, data: Partial<Variant>) =>
        apiClient.patch<Variant>(`/api/variants/${id}/`, data),

    deleteVariant: (id: number) => apiClient.delete(`/api/variants/${id}/`),

    listInventories: (params?: Record<string, string | number | undefined>) =>
        getPaginated<Inventory & { id: number; variant: number }>('/api/inventories/', params),

    createInventory: (data: { variant: number; quantity: number }) =>
        apiClient.post('/api/inventories/', data),

    updateInventory: (id: number, data: { variant?: number; quantity?: number }) =>
        apiClient.patch(`/api/inventories/${id}/`, data),

    deleteInventory: (id: number) => apiClient.delete(`/api/inventories/${id}/`),

    listProductReviews: (productId: number, page = 1, page_size = 10) =>
        getPaginated<Review>(`/api/products/${productId}/reviews/`, { page, page_size }, false),
};

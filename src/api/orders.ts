import { apiClient, getPaginated } from './client';
import type { Order, ShippingAddress } from '../types/api';

export const ordersApi = {
    checkout: (shipping: ShippingAddress) =>
        apiClient.post<Order>('/api/orders/checkout/', { shipping }),

    list: (page = 1, page_size = 10) =>
        getPaginated<Order>('/api/orders/', { page, page_size }),

    get: (id: number) => apiClient.get<Order>(`/api/orders/${id}/`),

    confirmPayment: (id: number) =>
        apiClient.post<Order>(`/api/orders/${id}/confirm-payment/`),

    cancel: (id: number) => apiClient.post<Order>(`/api/orders/${id}/cancel/`),

    getReceiptHtml: (id: number) =>
        apiClient.getText(`/api/orders/${id}/receipt/`),
};

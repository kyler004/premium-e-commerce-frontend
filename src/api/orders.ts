import { apiClient, getPaginated } from './client';
import type { Order, OrderListItem, OrderListParams, ShippingAddress } from '../types/api';

export const ordersApi = {
    checkout: (shipping: ShippingAddress) =>
        apiClient.post<Order>('/api/orders/checkout/', { shipping }),

    list: (params: OrderListParams = {}) =>
        getPaginated<OrderListItem>('/api/orders/', params),

    get: (id: number) => apiClient.get<Order>(`/api/orders/${id}/`),

    confirmPayment: (id: number) =>
        apiClient.post<Order>(`/api/orders/${id}/confirm-payment/`),

    cancel: (id: number) => apiClient.post<Order>(`/api/orders/${id}/cancel/`),

    getReceiptHtml: (id: number) =>
        apiClient.getText(`/api/orders/${id}/receipt/`),
};

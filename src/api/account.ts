import { apiClient } from './client';
import type { SpendingPeriod, SpendingSummary } from '../types/api';

export const accountApi = {
    getSpendingSummary: (period: SpendingPeriod = '12m') =>
        apiClient.get<SpendingSummary>(`/api/account/spending-summary/?period=${period}`),
};

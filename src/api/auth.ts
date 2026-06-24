import { apiClient } from './client';
import type { TokenPair, User } from '../types/api';

export const authApi = {
    register: (email: string, password: string) =>
        apiClient.post<{ detail: string }>('/api/auth/register/', { email, password }, false),

    verifyEmail: (email: string, otp: string) =>
        apiClient.post<{ detail: string }>('/api/auth/verify-email/', { email, otp }, false),

    resendOtp: (email: string, purpose: 'signup' | 'password_reset') =>
        apiClient.post<{ detail: string }>('/api/auth/resend-otp/', { email, purpose }, false),

    login: (email: string, password: string) =>
        apiClient.post<TokenPair>('/api/auth/login/', { email, password }, false),

    refresh: (refresh: string) =>
        apiClient.post<{ access: string }>('/api/auth/token/refresh/', { refresh }, false),

    forgotPassword: (email: string) =>
        apiClient.post<{ detail: string }>('/api/auth/forgot-password/', { email }, false),

    resetPassword: (email: string, otp: string, new_password: string) =>
        apiClient.post<{ detail: string }>(
            '/api/auth/reset-password/',
            { email, otp, new_password },
            false
        ),

    me: () => apiClient.get<User>('/api/auth/me/'),
};

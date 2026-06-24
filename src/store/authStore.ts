import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authApi } from '../api/auth';
import { setAccessToken, setRefreshHandler } from '../api/client';
import type { User } from '../types/api';

interface AuthState {
    refresh: string | null;
    user: User | null;
    isLoading: boolean;
    isInitialized: boolean;

    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    register: (email: string, password: string) => Promise<void>;
    verifyEmail: (email: string, otp: string) => Promise<void>;
    resendOtp: (email: string, purpose: 'signup' | 'password_reset') => Promise<void>;
    forgotPassword: (email: string) => Promise<void>;
    resetPassword: (email: string, otp: string, newPassword: string) => Promise<void>;
    fetchMe: () => Promise<void>;
    refreshAccess: () => Promise<string | null>;
    initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            refresh: null,
            user: null,
            isLoading: false,
            isInitialized: false,

            login: async (email, password) => {
                set({ isLoading: true });
                try {
                    const tokens = await authApi.login(email, password);
                    setAccessToken(tokens.access);
                    set({ refresh: tokens.refresh });
                    await get().fetchMe();
                } finally {
                    set({ isLoading: false });
                }
            },

            logout: () => {
                setAccessToken(null);
                set({ refresh: null, user: null });
            },

            register: async (email, password) => {
                set({ isLoading: true });
                try {
                    await authApi.register(email, password);
                } finally {
                    set({ isLoading: false });
                }
            },

            verifyEmail: async (email, otp) => {
                set({ isLoading: true });
                try {
                    await authApi.verifyEmail(email, otp);
                } finally {
                    set({ isLoading: false });
                }
            },

            resendOtp: async (email, purpose) => {
                await authApi.resendOtp(email, purpose);
            },

            forgotPassword: async (email) => {
                set({ isLoading: true });
                try {
                    await authApi.forgotPassword(email);
                } finally {
                    set({ isLoading: false });
                }
            },

            resetPassword: async (email, otp, newPassword) => {
                set({ isLoading: true });
                try {
                    await authApi.resetPassword(email, otp, newPassword);
                } finally {
                    set({ isLoading: false });
                }
            },

            fetchMe: async () => {
                const user = await authApi.me();
                set({ user });
            },

            refreshAccess: async () => {
                const { refresh } = get();
                if (!refresh) {
                    get().logout();
                    return null;
                }
                try {
                    const { access } = await authApi.refresh(refresh);
                    setAccessToken(access);
                    return access;
                } catch {
                    get().logout();
                    return null;
                }
            },

            initialize: async () => {
                setRefreshHandler(() => get().refreshAccess());
                const { refresh } = get();
                if (refresh) {
                    const access = await get().refreshAccess();
                    if (access) {
                        try {
                            await get().fetchMe();
                        } catch {
                            get().logout();
                        }
                    }
                }
                set({ isInitialized: true });
            },
        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({ refresh: state.refresh, user: state.user }),
        }
    )
);

export const useIsAuthenticated = () => useAuthStore((s) => !!s.user);
export const useIsVerified = () => useAuthStore((s) => !!s.user?.email_verified_at);
export const useIsStaff = () => useAuthStore((s) => !!s.user?.is_staff);

import { create } from 'zustand';
import { cartApi } from '../api/cart';
import type { Cart } from '../types/api';
import { parseDecimal } from '../lib/format';

interface CartState {
    cart: Cart | null;
    isLoading: boolean;

    fetchCart: () => Promise<void>;
    addItem: (variant: number, quantity?: number) => Promise<void>;
    updateQuantity: (id: number, quantity: number) => Promise<void>;
    removeItem: (id: number) => Promise<void>;
    clearCart: () => Promise<void>;
    applyPromo: (code: string) => Promise<void>;
    removePromo: () => Promise<void>;
    totalItems: () => number;
    totalPrice: () => number;
}

export const useCartStore = create<CartState>()((set, get) => ({
    cart: null,
    isLoading: false,

    fetchCart: async () => {
        set({ isLoading: true });
        try {
            const cart = await cartApi.get();
            set({ cart, isLoading: false });
        } catch {
            set({ cart: null, isLoading: false });
        }
    },

    addItem: async (variant, quantity = 1) => {
        set({ isLoading: true });
        try {
            const result = await cartApi.addItem(variant, quantity);
            set({ cart: ('cart' in result ? result.cart : null) ?? get().cart, isLoading: false });
        } catch (err) {
            set({ isLoading: false });
            throw err;
        }
    },

    updateQuantity: async (id, quantity) => {
        set({ isLoading: true });
        try {
            const result = await cartApi.updateItem(id, quantity);
            set({ cart: result.cart ?? get().cart, isLoading: false });
        } catch {
            set({ isLoading: false });
            throw new Error('Failed to update quantity');
        }
    },

    removeItem: async (id) => {
        await cartApi.removeItem(id);
        await get().fetchCart();
    },

    clearCart: async () => {
        await cartApi.clear();
        set({ cart: null });
    },

    applyPromo: async (code) => {
        const cart = await cartApi.applyPromo(code);
        set({ cart });
    },

    removePromo: async () => {
        const cart = await cartApi.removePromo();
        set({ cart });
    },

    totalItems: () => get().cart?.item_count ?? 0,

    totalPrice: () => {
        const cart = get().cart;
        if (!cart) return 0;
        return parseDecimal(cart.promotion?.total ?? cart.subtotal);
    },
}));

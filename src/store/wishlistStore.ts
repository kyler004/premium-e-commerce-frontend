import { create } from 'zustand';
import { wishlistApi } from '../api/wishlist';
import type { Wishlist } from '../types/api';

interface WishlistState {
    wishlist: Wishlist | null;
    isLoading: boolean;

    fetchWishlist: () => Promise<void>;
    addItem: (productId: number) => Promise<void>;
    removeItem: (id: number) => Promise<void>;
    moveToCart: (id: number, variant: number, quantity?: number) => Promise<void>;
    isInWishlist: (productId: number) => boolean;
}

export const useWishlistStore = create<WishlistState>()((set, get) => ({
    wishlist: null,
    isLoading: false,

    fetchWishlist: async () => {
        set({ isLoading: true });
        try {
            const wishlist = await wishlistApi.get();
            set({ wishlist, isLoading: false });
        } catch {
            set({ wishlist: null, isLoading: false });
        }
    },

    addItem: async (productId) => {
        await wishlistApi.addItem(productId);
        await get().fetchWishlist();
    },

    removeItem: async (id) => {
        await wishlistApi.removeItem(id);
        await get().fetchWishlist();
    },

    moveToCart: async (id, variant, quantity = 1) => {
        await wishlistApi.moveToCart(id, variant, quantity);
        await get().fetchWishlist();
    },

    isInWishlist: (productId) =>
        get().wishlist?.items.some((item) => item.product.id === productId) ?? false,
}));

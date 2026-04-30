import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, Product, Variant } from '../types';

interface CartState {
    items: CartItem[];

    // Actions
    addItem: (product: Product, quantity: number, color?: Variant, size?: Variant) => void;
    removeItem: (productId: string, colorId?: string, sizeId?: string) => void;
    updateQuantity: (productId: string, quantity: number, colorId?: string, sizeId?: string) => void;
    clearCart: () => void;

    // Computed (derived values)
    totalItems: () => number;
    totalPrice: () => number;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],

            addItem: (product, quantity, color, size) => {
                const existing = get().items.find(
                    (item) =>
                        item.product.id === product.id &&
                        item.selectedColor?.id === color?.id &&
                        item.selectedSize?.id === size?.id
                );

                if (existing) {
                    // Same product + same variants → just increase qty
                    set((state) => ({
                        items: state.items.map((item) =>
                            item.product.id === product.id &&
                            item.selectedColor?.id === color?.id &&
                            item.selectedSize?.id === size?.id
                                ? { ...item, quantity: item.quantity + quantity }
                                : item
                        ),
                    }));
                } else {
                    // New combination → add as new cart entry
                    set((state) => ({
                        items: [
                            ...state.items,
                            { product, quantity, selectedColor: color, selectedSize: size },
                        ],
                    }));
                }
            },

            removeItem: (productId, colorId, sizeId) => {
                set((state) => ({
                    items: state.items.filter(
                        (item) =>
                            !(
                                item.product.id === productId &&
                                item.selectedColor?.id === colorId &&
                                item.selectedSize?.id === sizeId
                            )
                    ),
                }));
            },

            updateQuantity: (productId, quantity, colorId, sizeId) => {
                if (quantity <= 0) {
                    get().removeItem(productId, colorId, sizeId);
                    return;
                }
                set((state) => ({
                    items: state.items.map((item) =>
                        item.product.id === productId &&
                        item.selectedColor?.id === colorId &&
                        item.selectedSize?.id === sizeId
                            ? { ...item, quantity }
                            : item
                    ),
                }));
            },

            clearCart: () => set({ items: [] }),

            totalItems: () =>
                get().items.reduce((sum, item) => sum + item.quantity, 0),

            totalPrice: () =>
                get().items.reduce(
                    (sum, item) => sum + item.product.price * item.quantity,
                    0
                ),
        }),
        {
            name: 'cart-storage', // key in localStorage
        }
    )
);
import { create } from 'zustand';
import type { Filters, Product } from '../types';
import { products as allProducts } from '../data/product';

interface ProductState {
    products: Product[];
    filters: Filters;

    // Actions
    setFilter: <K extends keyof Filters>(key: K, value: Filters[K]) => void;
    resetFilters: () => void;

    // Computed
    filteredProducts: () => Product[];
}

const defaultFilters: Filters = {
    category: null,
    priceRange: [0, 500],
    minRating: null,
    inStockOnly: false,
};

export const useProductStore = create<ProductState>()((set, get) => ({
    products: allProducts,
    filters: defaultFilters,

    setFilter: (key, value) =>
        set((state) => ({
            filters: { ...state.filters, [key]: value },
        })),

    resetFilters: () => set({ filters: defaultFilters }),

    filteredProducts: () => {
        const { products, filters } = get();

        return products.filter((p) => {
            if (filters.category && p.category !== filters.category) return false;
            if (p.price < filters.priceRange[0] || p.price > filters.priceRange[1]) return false;
            if (filters.minRating && p.rating < filters.minRating) return false;
            if (filters.inStockOnly && !p.inStock) return false;
            return true;
        });
    },
}));
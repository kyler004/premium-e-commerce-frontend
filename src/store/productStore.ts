import { create } from 'zustand';
import type { Filters, Product } from '../types';
import { products as allProducts } from '../data/product';

interface ProductState {
    products: Product[];
    filters: Filters;

    // Actions
    setFilter: <K extends keyof Filters>(key: K, value: Filters[K]) => void;
    resetFilters: () => void;
}

const defaultFilters: Filters = {
    category: null,
    priceRange: [0, 500],
    minRating: null,
    inStockOnly: false,
};

export const useProductStore = create<ProductState>()((set) => ({
    products: allProducts,
    filters: defaultFilters,

    setFilter: (key, value) =>
        set((state) => ({
            filters: { ...state.filters, [key]: value },
        })),

    resetFilters: () => set({ filters: defaultFilters }),
}));

export const filterProducts = (products: Product[], filters: Filters) =>
    products.filter((product) => {
        if (filters.category && product.category !== filters.category) return false;
        if (
            product.price < filters.priceRange[0] ||
            product.price > filters.priceRange[1]
        ) {
            return false;
        }
        if (filters.minRating && product.rating < filters.minRating) return false;
        if (filters.inStockOnly && !product.inStock) return false;
        return true;
    });

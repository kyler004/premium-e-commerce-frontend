import { create } from 'zustand';
import { catalogApi } from '../api/catalog';
import type { Category, Product } from '../types/api';

export interface CatalogFilters {
    category: number | null;
    min_price: number;
    max_price: number;
    minRating: number | null;
    inStockOnly: boolean;
    search: string;
    ordering: string;
}

interface SetFilterOptions {
    fetch?: boolean;
    resetPage?: boolean;
}

interface CatalogState {
    products: Product[];
    categories: Category[];
    count: number;
    page: number;
    pageSize: number;
    filters: CatalogFilters;
    isLoading: boolean;
    hasLoaded: boolean;
    isRefetching: boolean;
    error: string | null;
    requestId: number;

    setFilter: <K extends keyof CatalogFilters>(
        key: K,
        value: CatalogFilters[K],
        options?: SetFilterOptions
    ) => void;
    resetFilters: () => void;
    setPage: (page: number) => void;
    fetchCategories: () => Promise<void>;
    fetchProducts: () => Promise<void>;
}

const defaultFilters: CatalogFilters = {
    category: null,
    min_price: 0,
    max_price: 500,
    minRating: null,
    inStockOnly: false,
    search: '',
    ordering: '',
};

export const useCatalogStore = create<CatalogState>()((set, get) => ({
    products: [],
    categories: [],
    count: 0,
    page: 1,
    pageSize: 12,
    filters: defaultFilters,
    isLoading: true,
    hasLoaded: false,
    isRefetching: false,
    error: null,
    requestId: 0,

    setFilter: (key, value, options = {}) => {
        const { fetch = true, resetPage = true } = options;
        set((state) => ({
            filters: { ...state.filters, [key]: value },
            page: resetPage ? 1 : state.page,
        }));
        if (fetch) get().fetchProducts();
    },

    resetFilters: () => {
        set({ filters: defaultFilters, page: 1 });
        get().fetchProducts();
    },

    setPage: (page) => {
        set({ page });
        get().fetchProducts();
    },

    fetchCategories: async () => {
        try {
            const data = await catalogApi.listCategories({ page_size: 100 });
            set({ categories: data.results });
        } catch {
            // categories optional for listing
        }
    },

    fetchProducts: async () => {
        const { filters, page, pageSize, hasLoaded, requestId } = get();
        const nextRequestId = requestId + 1;

        set({
            requestId: nextRequestId,
            isLoading: !hasLoaded,
            isRefetching: hasLoaded,
            error: null,
        });

        try {
            const params: Record<string, string | number | undefined> = {
                page,
                page_size: pageSize,
            };
            if (filters.category) params.category = filters.category;
            if (filters.min_price > 0) params.min_price = filters.min_price;
            if (filters.max_price < 500) params.max_price = filters.max_price;
            if (filters.search) params.search = filters.search;
            if (filters.ordering) params.ordering = filters.ordering;

            const data = await catalogApi.listProducts(params);

            if (get().requestId !== nextRequestId) return;

            let results = data.results ?? [];

            if (filters.minRating) {
                results = results.filter((p) => (p.average_rating ?? 0) >= filters.minRating!);
            }
            if (filters.inStockOnly) {
                results = results.filter((p) =>
                    p.variants.some((v) => (v.inventory?.quantity ?? 0) > 0)
                );
            }

            const hasClientFilters = filters.minRating !== null || filters.inStockOnly;
            const displayCount = hasClientFilters ? results.length : (data.count ?? results.length);

            set({
                products: results,
                count: displayCount,
                hasLoaded: true,
                isLoading: false,
                isRefetching: false,
            });
        } catch {
            if (get().requestId !== nextRequestId) return;
            set({
                isLoading: false,
                isRefetching: false,
                error: 'Failed to load products.',
            });
        }
    },
}));

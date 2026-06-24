export interface Review {
    id: string;
    author: string;
    avatar: string;
    rating: number;
    comment: string;
    date: string;
    verified: boolean;
}

export interface Variant {
    id: string;
    label: string;
    type: 'color' | 'size' | 'material';
    available: boolean;
    colorHex?: string;
}

// ─── Core Product ──────────────────────────────────────────
export interface Product {
    id: string;
    name: string;
    brand: string;
    description: string;
    price: number;
    originalPrice?: number;   // if on sale
    discount?: number;        // percentage e.g. 20 (for 20% off)
    images: string[];         // array of URLs
    category: string;
    tags: string[];
    rating: number;           // average 0–5
    reviewCount: number;
    reviews: Review[];
    variants: {
        colors: Variant[];
        sizes: Variant[];
    };
    inStock: boolean;
    featured: boolean;
}

// ---- Cart ---------------
export interface CartItem {
    product: Product;
    quantity: number;
    selectedColor?: Variant;
    selectedSize?: Variant;
}

// ─── Filters (for listing page) ────────────────────────────
export interface Filters {
    category: string | null;
    priceRange: [number, number];
    minRating: number | null;
    inStockOnly: boolean;
}
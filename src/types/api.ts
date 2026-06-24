export interface PaginatedResponse<T> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
}

export interface ApiErrorBody {
    detail?: string;
    [field: string]: unknown;
}

export interface User {
    id: number;
    email: string;
    email_verified_at: string | null;
    is_staff?: boolean;
}

export interface TokenPair {
    access: string;
    refresh: string;
}

export interface Category {
    id: number;
    name: string;
    description: string;
    parent: number | null;
    products?: Product[];
}

export interface Inventory {
    quantity: number;
    last_updated: string;
}

export interface Variant {
    id: number;
    product: number;
    size: string;
    color: string;
    sku: string;
    inventory: Inventory | null;
}

export interface Product {
    id: number;
    name: string;
    description: string;
    price: string;
    category: number;
    created_at: string;
    average_rating: number | null;
    review_count: number;
    variants: Variant[];
}

export interface Review {
    id: number;
    user_email: string;
    rating: number;
    title: string;
    body: string;
    created_at: string;
    updated_at: string;
}

export interface CartVariant {
    id: number;
    sku: string;
    size: string;
    color: string;
    product_name: string;
    available_quantity: number;
}

export interface CartLine {
    id: number;
    variant: CartVariant;
    quantity: number;
    unit_price: string;
    line_total: string;
}

export interface CartPromotion {
    code: string;
    discount_amount: string;
    total: string;
}

export interface Cart {
    id: number;
    items: CartLine[];
    item_count: number;
    subtotal: string;
    promotion: CartPromotion | null;
    updated_at: string;
}

export interface ShippingAddress {
    full_name: string;
    address_line1: string;
    address_line2?: string;
    city: string;
    postal_code: string;
    country: string;
    phone?: string;
}

export interface OrderLine {
    id: number;
    variant: number;
    product_name: string;
    sku: string;
    size: string;
    color: string;
    quantity: number;
    unit_price: string;
    line_total: string;
}

export type OrderStatus = 'pending' | 'paid' | 'cancelled';

export interface Order {
    id: number;
    status: OrderStatus;
    subtotal: string;
    discount_amount: string;
    promotion_code: string;
    total: string;
    items: OrderLine[];
    shipping: ShippingAddress;
    created_at: string;
    updated_at: string;
    paid_at: string | null;
    item_count?: number;
}

export interface WishlistProduct {
    id: number;
    name: string;
    price: string;
}

export interface WishlistItem {
    id: number;
    product: WishlistProduct;
    added_at: string;
}

export interface Wishlist {
    id: number;
    items: WishlistItem[];
    item_count: number;
    updated_at: string;
}

export type DiscountType = 'percentage' | 'fixed';

export interface Promotion {
    id: number;
    code: string;
    description: string;
    discount_type: DiscountType;
    discount_value: string;
    min_order_amount: string | null;
    max_uses: number | null;
    used_count: number;
    valid_from: string | null;
    valid_until: string | null;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface ProductFilters {
    category?: number;
    min_price?: number;
    max_price?: number;
    color?: string;
    size?: string;
    search?: string;
    ordering?: string;
    page?: number;
    page_size?: number;
}

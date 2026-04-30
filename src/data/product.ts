import type { Product } from '../types';

export const products: Product[] = [
    {
        id: 'prod-001',
        name: 'Aether Runner X1',
        brand: 'VOIDSTEP',
        description:
            'Engineered for those who move at the edge. The Aether Runner X1 combines ultra-light foam geometry with a carbon-fiber midplate for explosive energy return. Built for the city. Designed for everywhere else.',
        price: 189,
        originalPrice: 240,
        discount: 21,
        images: [
            'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
            'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80',
            'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80',
        ],
        category: 'Running',
        tags: ['lightweight', 'carbon', 'performance'],
        rating: 4.7,
        reviewCount: 214,
        reviews: [
            {
                id: 'rev-001',
                author: 'Marcus T.',
                avatar: 'https://i.pravatar.cc/48?img=11',
                rating: 5,
                comment: 'Absolutely insane comfort. Wore these for a half marathon and felt nothing.',
                date: '2024-11-02',
                verified: true,
            },
            {
                id: 'rev-002',
                author: 'Lena K.',
                avatar: 'https://i.pravatar.cc/48?img=5',
                rating: 4,
                comment: 'Sizing runs slightly small. Go half a size up. Otherwise perfect.',
                date: '2024-10-18',
                verified: true,
            },
        ],
        variants: {
            colors: [
                { id: 'c1', label: 'Void Black', type: 'color', colorHex: '#0a0a0a', available: true },
                { id: 'c2', label: 'Arctic White', type: 'color', colorHex: '#f5f5f5', available: true },
                { id: 'c3', label: 'Neon Volt', type: 'color', colorHex: '#e8ff00', available: false },
            ],
            sizes: [
                { id: 's1', label: '40', type: 'size', available: true },
                { id: 's2', label: '41', type: 'size', available: true },
                { id: 's3', label: '42', type: 'size', available: true },
                { id: 's4', label: '43', type: 'size', available: false },
                { id: 's5', label: '44', type: 'size', available: true },
            ],
        },
        inStock: true,
        featured: true,
    },
    {
        id: 'prod-002',
        name: 'Shadow Low Pro',
        brand: 'VOIDSTEP',
        description:
            'Streetwear heritage meets surgical precision. The Shadow Low Pro is built on a vulcanized sole with premium suede paneling and a minimal silhouette that speaks loudly without trying.',
        price: 145,
        images: [
            'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800&q=80',
            'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80',
        ],
        category: 'Lifestyle',
        tags: ['suede', 'minimal', 'street'],
        rating: 4.4,
        reviewCount: 98,
        reviews: [
            {
                id: 'rev-003',
                author: 'James R.',
                avatar: 'https://i.pravatar.cc/48?img=3',
                rating: 4,
                comment: 'Clean silhouette. The suede quality is top notch for this price point.',
                date: '2024-12-01',
                verified: false,
            },
        ],
        variants: {
            colors: [
                { id: 'c4', label: 'Charcoal', type: 'color', colorHex: '#2d2d2d', available: true },
                { id: 'c5', label: 'Sand', type: 'color', colorHex: '#c4a882', available: true },
            ],
            sizes: [
                { id: 's6', label: '39', type: 'size', available: true },
                { id: 's7', label: '40', type: 'size', available: true },
                { id: 's8', label: '41', type: 'size', available: false },
                { id: 's9', label: '42', type: 'size', available: true },
            ],
        },
        inStock: true,
        featured: false,
    },
    {
        id: 'prod-003',
        name: 'Flux Trail Boot',
        brand: 'TERRAFORM',
        description:
            'Conquer without compromise. The Flux Trail Boot features a Gore-Tex membrane, Vibram outsole, and a lacing system designed for single-hand tightening. Trail-ready from box to summit.',
        price: 279,
        originalPrice: 320,
        discount: 13,
        images: [
            'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=800&q=80',
            'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=800&q=80',
        ],
        category: 'Trail',
        tags: ['waterproof', 'vibram', 'hiking'],
        rating: 4.9,
        reviewCount: 342,
        reviews: [
            {
                id: 'rev-004',
                author: 'Sofia M.',
                avatar: 'https://i.pravatar.cc/48?img=9',
                rating: 5,
                comment: 'Hiked 40km in the rain. Feet were dry the entire time. Unreal.',
                date: '2024-09-15',
                verified: true,
            },
        ],
        variants: {
            colors: [
                { id: 'c6', label: 'Forest', type: 'color', colorHex: '#2d4a2d', available: true },
                { id: 'c7', label: 'Storm Grey', type: 'color', colorHex: '#4a4a5a', available: true },
            ],
            sizes: [
                { id: 's10', label: '41', type: 'size', available: true },
                { id: 's11', label: '42', type: 'size', available: true },
                { id: 's12', label: '43', type: 'size', available: true },
                { id: 's13', label: '44', type: 'size', available: true },
                { id: 's14', label: '45', type: 'size', available: false },
            ],
        },
        inStock: true,
        featured: true,
    },
    {
        id: 'prod-004',
        name: 'Orbit Slide V2',
        brand: 'VOIDSTEP',
        description:
            'Post-workout. Post-everything. The Orbit Slide V2 is a one-strap recovery sandal with contoured arch support and a recycled EVA footbed. Simple. Necessary.',
        price: 65,
        images: [
            'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=800&q=80',
        ],
        category: 'Slides',
        tags: ['recovery', 'minimal', 'recycled'],
        rating: 4.1,
        reviewCount: 57,
        reviews: [],
        variants: {
            colors: [
                { id: 'c8', label: 'Black', type: 'color', colorHex: '#111111', available: true },
                { id: 'c9', label: 'Slate', type: 'color', colorHex: '#708090', available: true },
            ],
            sizes: [
                { id: 's15', label: '38-39', type: 'size', available: true },
                { id: 's16', label: '40-41', type: 'size', available: true },
                { id: 's17', label: '42-43', type: 'size', available: false },
            ],
        },
        inStock: false,
        featured: false,
    },
];

// ─── Helper functions ──────────────────────────────────────

export const getProductById = (id: string): Product | undefined =>
    products.find((p) => p.id === id);

export const getFeaturedProducts = (): Product[] =>
    products.filter((p) => p.featured);

export const getCategories = (): string[] =>
    [...new Set(products.map((p) => p.category))];
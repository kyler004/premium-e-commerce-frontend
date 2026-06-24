import { PackageSearch } from 'lucide-react';
import type { Product } from '../../types/api';
import ProductCard from './ProductCard';
import { ProductCardSkeleton } from '../ui/Skeleton';

interface ProductGridProps {
    products: Product[];
    isLoading?: boolean;
}

const ProductGrid = ({ products, isLoading }: ProductGridProps) => {
    if (isLoading) {
        return (
            <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                    <ProductCardSkeleton key={i} />
                ))}
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="flex flex-1 flex-col items-center justify-center gap-4 py-32">
                <PackageSearch size={48} className="text-border" />
                <p className="text-sm font-semibold uppercase tracking-widest text-gray-600">
                    No products match your filters
                </p>
            </div>
        );
    }

    return (
        <div className="grid flex-1 grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-3 bg-border">
            {products.map((product) => (
                <div key={product.id} className="bg-bg">
                    <ProductCard product={product} />
                </div>
            ))}
        </div>
    );
};

export default ProductGrid;

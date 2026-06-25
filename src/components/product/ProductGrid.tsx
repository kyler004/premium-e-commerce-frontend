import { PackageSearch } from 'lucide-react';
import type { Product } from '../../types/api';
import ProductCard from './ProductCard';
import { ProductGridSkeleton } from '../ui/Skeleton';

interface ProductGridProps {
    products: Product[];
    hasLoaded: boolean;
    isLoading: boolean;
    isRefetching: boolean;
    pageSize: number;
    error: string | null;
}

const ProductGrid = ({
    products,
    hasLoaded,
    isLoading,
    isRefetching,
    pageSize,
    error,
}: ProductGridProps) => {
    if (!hasLoaded && isLoading) {
        return <ProductGridSkeleton count={pageSize} />;
    }

    if (error && !hasLoaded) {
        return (
            <div className="flex flex-1 flex-col items-center justify-center gap-4 border border-red-800/40 bg-red-900/10 py-32">
                <p className="text-sm font-semibold uppercase tracking-widest text-red-400">
                    {error}
                </p>
            </div>
        );
    }

    if (hasLoaded && products.length === 0 && !isRefetching) {
        return (
            <div className="flex flex-1 flex-col items-center justify-center gap-4 py-32">
                <PackageSearch size={48} className="text-border" />
                <p className="text-sm font-semibold uppercase tracking-widest text-gray-600">
                    No products match your filters
                </p>
            </div>
        );
    }

    if (!hasLoaded && !isLoading) {
        return <ProductGridSkeleton count={pageSize} />;
    }

    return (
        <div className="relative flex-1">
            <div
                className={`grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-3 bg-border transition-opacity duration-200 ${
                    isRefetching ? 'pointer-events-none opacity-60' : ''
                }`}
            >
                {products.map((product) => (
                    <div key={product.id} className="bg-bg">
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>

            {isRefetching && (
                <div className="absolute inset-0 flex items-center justify-center bg-bg/40 backdrop-blur-[1px]">
                    <div className="h-6 w-6 animate-spin rounded-full border-2 border-accent border-t-transparent" />
                </div>
            )}

            {error && hasLoaded && (
                <p className="mt-4 text-center text-xs uppercase tracking-widest text-red-400">
                    {error}
                </p>
            )}
        </div>
    );
};

export default ProductGrid;

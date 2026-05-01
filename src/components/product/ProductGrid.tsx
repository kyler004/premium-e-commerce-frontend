import { useProductStore } from '../../store/productStore';
import ProductCard from './ProductCard';
import { PackageSearch } from 'lucide-react';

const ProductGrid = () => {
    const filteredProducts = useProductStore((s) => s.filteredProducts());

    if (filteredProducts.length === 0) {
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
            {filteredProducts.map((product) => (
                <div key={product.id} className="bg-bg">
                    <ProductCard product={product} />
                </div>
            ))}
        </div>
    );
};

export default ProductGrid;
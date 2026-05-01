import FilterSidebar from '../components/product/FilterSidebar';
import ProductGrid from '../components/product/ProductGrid';
import { useProductStore } from '../store/productStore';

const ProductListingPage = () => {
    const filteredProducts = useProductStore((s) => s.filteredProducts());

    return (
        <div className="mx-auto max-w-7xl px-6 py-12">

            {/* Page Header */}
            <div className="mb-10 flex items-end justify-between border-b border-border pb-6">
                <div>
                    <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-gray-500">
                        Collection
                    </p>
                    <h1 className="text-4xl font-black uppercase tracking-tight text-white">
                        All Products
                    </h1>
                </div>
                <span className="text-sm text-gray-500">
          {filteredProducts.length}{' '}
                    <span className="text-gray-600">
            {filteredProducts.length === 1 ? 'result' : 'results'}
          </span>
        </span>
            </div>

            {/* Body: Sidebar + Grid */}
            <div className="flex gap-12">
                <FilterSidebar />
                <div className="flex-1">
                    <ProductGrid />
                </div>
            </div>

        </div>
    );
};

export default ProductListingPage;
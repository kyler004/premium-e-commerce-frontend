import { useEffect } from 'react';
import FilterSidebar from '../components/product/FilterSidebar';
import ProductGrid from '../components/product/ProductGrid';
import PageHeader from '../components/ui/PageHeader';
import Pagination from '../components/ui/Pagination';
import { useCatalogStore } from '../store/catalogStore';

const ProductListingPage = () => {
    const products = useCatalogStore((state) => state.products);
    const count = useCatalogStore((state) => state.count);
    const page = useCatalogStore((state) => state.page);
    const pageSize = useCatalogStore((state) => state.pageSize);
    const isLoading = useCatalogStore((state) => state.isLoading);
    const fetchProducts = useCatalogStore((state) => state.fetchProducts);
    const fetchCategories = useCatalogStore((state) => state.fetchCategories);
    const setPage = useCatalogStore((state) => state.setPage);

    useEffect(() => {
        fetchCategories();
        fetchProducts();
    }, [fetchCategories, fetchProducts]);

    const totalPages = Math.max(1, Math.ceil(count / pageSize));

    return (
        <div className="mx-auto max-w-7xl px-6 py-12 fade-in-element">
            <PageHeader
                eyebrow="Collection"
                title="All Products"
                trailing={
                    <span className="text-sm text-gray-500">
                        {count} <span className="text-gray-600">{count === 1 ? 'result' : 'results'}</span>
                    </span>
                }
            />

            <div className="flex gap-12">
                <FilterSidebar />
                <div className="flex-1">
                    <ProductGrid products={products} isLoading={isLoading} />
                    <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
                </div>
            </div>
        </div>
    );
};

export default ProductListingPage;

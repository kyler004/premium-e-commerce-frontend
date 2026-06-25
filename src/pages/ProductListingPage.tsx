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
    const hasLoaded = useCatalogStore((state) => state.hasLoaded);
    const isRefetching = useCatalogStore((state) => state.isRefetching);
    const error = useCatalogStore((state) => state.error);
    const fetchProducts = useCatalogStore((state) => state.fetchProducts);
    const fetchCategories = useCatalogStore((state) => state.fetchCategories);
    const setPage = useCatalogStore((state) => state.setPage);

    useEffect(() => {
        fetchCategories();
        fetchProducts();
    }, [fetchCategories, fetchProducts]);

    const totalPages = Math.max(1, Math.ceil(count / pageSize));

    const resultLabel = hasLoaded ? `${count}` : '—';

    return (
        <div className="mx-auto max-w-7xl px-6 py-12 fade-in-element">
            <PageHeader
                eyebrow="Collection"
                title="All Products"
                trailing={
                    <span className={`text-sm ${isRefetching ? 'text-gray-600' : 'text-gray-500'}`}>
                        {resultLabel}{' '}
                        <span className="text-gray-600">
                            {hasLoaded && count === 1 ? 'result' : 'results'}
                        </span>
                    </span>
                }
            />

            <div className="flex gap-12">
                <FilterSidebar />
                <div className="flex-1">
                    <ProductGrid
                        products={products}
                        hasLoaded={hasLoaded}
                        isLoading={isLoading}
                        isRefetching={isRefetching}
                        pageSize={pageSize}
                        error={error}
                    />
                    {hasLoaded && (
                        <Pagination
                            page={page}
                            totalPages={totalPages}
                            onPageChange={setPage}
                            disabled={isRefetching}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductListingPage;

import { useEffect, useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import FilterSidebar from '../components/product/FilterSidebar';
import ProductGrid from '../components/product/ProductGrid';
import PageHeader from '../components/ui/PageHeader';
import PageContainer from '../components/layout/PageContainer';
import Pagination from '../components/ui/Pagination';
import Button from '../components/ui/Button';
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
    const [filtersOpen, setFiltersOpen] = useState(false);

    useEffect(() => {
        fetchCategories();
        fetchProducts();
    }, [fetchCategories, fetchProducts]);

    const totalPages = Math.max(1, Math.ceil(count / pageSize));
    const resultLabel = hasLoaded ? `${count}` : '—';

    return (
        <PageContainer>
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

            <div className="mb-4 lg:hidden">
                <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setFiltersOpen((open) => !open)}
                >
                    <SlidersHorizontal size={14} />
                    {filtersOpen ? 'Hide Filters' : 'Filters'}
                </Button>
            </div>

            <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
                <div className={`${filtersOpen ? 'block' : 'hidden'} lg:block`}>
                    <FilterSidebar />
                </div>
                <div className="min-w-0 flex-1">
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
        </PageContainer>
    );
};

export default ProductListingPage;

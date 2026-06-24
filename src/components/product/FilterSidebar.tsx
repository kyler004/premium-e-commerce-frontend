import { useCatalogStore } from '../../store/catalogStore';
import { SlidersHorizontal, X } from 'lucide-react';
import Input from '../ui/Input';
import Select from '../ui/Select';

const RATINGS = [4, 3, 2];

const FilterSidebar = () => {
    const filters = useCatalogStore((state) => state.filters);
    const categories = useCatalogStore((state) => state.categories);
    const setFilter = useCatalogStore((state) => state.setFilter);
    const resetFilters = useCatalogStore((state) => state.resetFilters);

    const hasActiveFilters =
        filters.category !== null ||
        filters.minRating !== null ||
        filters.inStockOnly ||
        filters.min_price > 0 ||
        filters.max_price < 500 ||
        filters.search !== '' ||
        filters.ordering !== '';

    return (
        <aside className="flex w-64 shrink-0 flex-col gap-8">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-white">
                    <SlidersHorizontal size={16} className="text-accent" />
                    <span className="text-sm font-black uppercase tracking-widest">Filters</span>
                </div>
                {hasActiveFilters && (
                    <button
                        onClick={resetFilters}
                        className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-gray-500 hover:text-accent transition-colors"
                    >
                        <X size={10} />
                        Clear all
                    </button>
                )}
            </div>

            <Input
                label="Search"
                placeholder="Search products..."
                value={filters.search}
                onChange={(e) => setFilter('search', e.target.value)}
            />

            <Select
                label="Sort By"
                value={filters.ordering}
                onChange={(e) => setFilter('ordering', e.target.value)}
                options={[
                    { value: '', label: 'Default' },
                    { value: 'price', label: 'Price: Low to High' },
                    { value: '-price', label: 'Price: High to Low' },
                    { value: '-created_at', label: 'Newest' },
                ]}
            />

            <div className="flex flex-col gap-3">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-500">
                    Category
                </span>
                <div className="flex flex-col gap-1">
                    <button
                        onClick={() => setFilter('category', null)}
                        className={`text-left text-sm py-1.5 px-3 border transition-colors ${
                            filters.category === null
                                ? 'border-accent/40 text-accent bg-accent/5'
                                : 'border-transparent text-gray-400 hover:text-white'
                        }`}
                    >
                        All
                    </button>
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setFilter('category', cat.id)}
                            className={`text-left text-sm py-1.5 px-3 border transition-colors ${
                                filters.category === cat.id
                                    ? 'border-accent/40 text-accent bg-accent/5'
                                    : 'border-transparent text-gray-400 hover:text-white'
                            }`}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex flex-col gap-3">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-500">
                    Price Range
                </span>
                <div className="px-1">
                    <input
                        type="range"
                        min={0}
                        max={500}
                        step={10}
                        value={filters.max_price}
                        onChange={(e) => setFilter('max_price', Number(e.target.value))}
                        className="w-full accent-accent bg-border h-1 cursor-pointer"
                    />
                    <div className="mt-2 flex justify-between text-xs text-gray-500">
                        <span>$0</span>
                        <span className="font-bold text-white">${filters.max_price}</span>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-3">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-500">
                    Min. Rating
                </span>
                <div className="flex flex-col gap-1">
                    {RATINGS.map((r) => (
                        <button
                            key={r}
                            onClick={() => setFilter('minRating', filters.minRating === r ? null : r)}
                            className={`flex items-center gap-2 px-3 py-1.5 border text-sm transition-colors ${
                                filters.minRating === r
                                    ? 'border-accent/40 text-accent bg-accent/5'
                                    : 'border-transparent text-gray-400 hover:text-white'
                            }`}
                        >
                            {'★'.repeat(r)}{'☆'.repeat(5 - r)}
                            <span className="text-xs">& up</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex flex-col gap-3">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-500">
                    Availability
                </span>
                <label className="flex cursor-pointer items-center justify-between px-3">
                    <span className="text-sm text-gray-400">In Stock Only</span>
                    <div
                        onClick={() => setFilter('inStockOnly', !filters.inStockOnly)}
                        className={`relative h-5 w-9 rounded-full transition-colors ${
                            filters.inStockOnly ? 'bg-accent' : 'bg-border'
                        }`}
                    >
                        <span
                            className={`absolute top-0.5 h-4 w-4 rounded-full bg-black transition-transform ${
                                filters.inStockOnly ? 'translate-x-4' : 'translate-x-0.5'
                            }`}
                        />
                    </div>
                </label>
            </div>
        </aside>
    );
};

export default FilterSidebar;

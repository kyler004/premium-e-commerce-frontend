import { useProductStore } from '../../store/productStore';
import { getCategories } from '../../data/product';
// import Button from '../ui/Button';
import { SlidersHorizontal, X } from 'lucide-react';

const RATINGS = [4, 3, 2];
const categories = getCategories();

const FilterSidebar = () => {
    const filters = useProductStore((state) => state.filters);
    const setFilter = useProductStore((state) => state.setFilter);
    const resetFilters = useProductStore((state) => state.resetFilters);

    const hasActiveFilters =
        filters.category !== null ||
        filters.minRating !== null ||
        filters.inStockOnly ||
        filters.priceRange[0] > 0 ||
        filters.priceRange[1] < 500;

    return (
        <aside className="flex w-64 shrink-0 flex-col gap-8">

            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-white">
                    <SlidersHorizontal size={16} className="text-[#e8ff00]" />
                    <span className="text-sm font-black uppercase tracking-widest">Filters</span>
                </div>
                {hasActiveFilters && (
                    <button
                        onClick={resetFilters}
                        className="flex items-center gap-1 text-[10px] uppercase tracking-wider
                       text-gray-500 hover:text-[#e8ff00] transition-colors"
                    >
                        <X size={10} />
                        Clear all
                    </button>
                )}
            </div>

            {/* Category */}
            <div className="flex flex-col gap-3">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-500">
          Category
        </span>
                <div className="flex flex-col gap-1">
                    <button
                        onClick={() => setFilter('category', null)}
                        className={`text-left text-sm py-1.5 px-3 border transition-colors ${
                            filters.category === null
                                ? 'border-[#e8ff00]/40 text-[#e8ff00] bg-[#e8ff00]/5'
                                : 'border-transparent text-gray-400 hover:text-white'
                        }`}
                    >
                        All
                    </button>
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter('category', cat)}
                            className={`text-left text-sm py-1.5 px-3 border transition-colors ${
                                filters.category === cat
                                    ? 'border-[#e8ff00]/40 text-[#e8ff00] bg-[#e8ff00]/5'
                                    : 'border-transparent text-gray-400 hover:text-white'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Price Range */}
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
                        value={filters.priceRange[1]}
                        onChange={(e) =>
                            setFilter('priceRange', [filters.priceRange[0], Number(e.target.value)])
                        }
                        className="w-full accent-[#e8ff00] bg-[#1f1f1f] h-1 rounded-none cursor-pointer"
                    />
                    <div className="mt-2 flex justify-between text-xs text-gray-500">
                        <span>$0</span>
                        <span className="font-bold text-white">${filters.priceRange[1]}</span>
                    </div>
                </div>
            </div>

            {/* Min Rating */}
            <div className="flex flex-col gap-3">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-500">
          Min. Rating
        </span>
                <div className="flex flex-col gap-1">
                    {RATINGS.map((r) => (
                        <button
                            key={r}
                            onClick={() =>
                                setFilter('minRating', filters.minRating === r ? null : r)
                            }
                            className={`flex items-center gap-2 px-3 py-1.5 border text-sm transition-colors ${
                                filters.minRating === r
                                    ? 'border-[#e8ff00]/40 text-[#e8ff00] bg-[#e8ff00]/5'
                                    : 'border-transparent text-gray-400 hover:text-white'
                            }`}
                        >
                            {'★'.repeat(r)}{'☆'.repeat(5 - r)}
                            <span className="text-xs">& up</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* In Stock Toggle */}
            <div className="flex flex-col gap-3">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-500">
          Availability
        </span>
                <label className="flex cursor-pointer items-center justify-between px-3">
                    <span className="text-sm text-gray-400">In Stock Only</span>
                    <div
                        onClick={() => setFilter('inStockOnly', !filters.inStockOnly)}
                        className={`relative h-5 w-9 rounded-full transition-colors ${
                            filters.inStockOnly ? 'bg-[#e8ff00]' : 'bg-[#1f1f1f]'
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

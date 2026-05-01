import type { Variant } from '../../types';

interface VariantSelectorProps {
    label: string;
    variants: Variant[];
    selected: Variant | null;
    onSelect: (variant: Variant) => void;
    error?: boolean;
}

const VariantSelector = ({
                             label,
                             variants,
                             selected,
                             onSelect,
                             error,
                         }: VariantSelectorProps) => {
    return (
        <div className="flex flex-col gap-3">

            {/* Label row */}
            <div className="flex items-center justify-between">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-500">
          {label}
            {selected && (
                <span className="ml-2 text-white">— {selected.label}</span>
            )}
        </span>
                {error && (
                    <span className="text-[10px] uppercase tracking-wider text-red-400">
            Please select a {label.toLowerCase()}
          </span>
                )}
            </div>

            {/* Options */}
            <div className="flex flex-wrap gap-2">
                {variants.map((variant) => {
                    const isSelected = selected?.id === variant.id;
                    const isColor = variant.type === 'color';

                    if (isColor) {
                        return (
                            <button
                                key={variant.id}
                                onClick={() => variant.available && onSelect(variant)}
                                title={variant.label}
                                disabled={!variant.available}
                                className={`relative h-8 w-8 border-2 transition-all ${
                                    isSelected
                                        ? 'border-[#e8ff00] scale-110'
                                        : 'border-[#1f1f1f] hover:border-gray-500'
                                } ${!variant.available ? 'cursor-not-allowed opacity-30' : ''}`}
                                style={{ backgroundColor: variant.colorHex }}
                            >
                                {/* Unavailable slash */}
                                {!variant.available && (
                                    <span className="absolute inset-0 flex items-center justify-center">
                    <span className="h-px w-full rotate-45 bg-gray-400" />
                  </span>
                                )}
                            </button>
                        );
                    }

                    // Size button
                    return (
                        <button
                            key={variant.id}
                            onClick={() => variant.available && onSelect(variant)}
                            disabled={!variant.available}
                            className={`relative px-4 py-2 text-xs font-bold uppercase tracking-wider
                          border transition-all ${
                                isSelected
                                    ? 'border-[#e8ff00] bg-[#e8ff00] text-black'
                                    : variant.available
                                        ? 'border-[#1f1f1f] text-gray-400 hover:border-gray-500 hover:text-white'
                                        : 'cursor-not-allowed border-[#1f1f1f] text-gray-700'
                            }`}
                        >
                            {variant.label}
                            {/* Unavailable strikethrough line */}
                            {!variant.available && (
                                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="h-px w-full rotate-12 bg-gray-700" />
                </span>
                            )}
                        </button>
                    );
                })}
            </div>

        </div>
    );
};

export default VariantSelector;
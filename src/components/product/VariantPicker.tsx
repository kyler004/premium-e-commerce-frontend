import type { Variant } from '../../types/api';
import { formatVariantLabel, getAvailableQuantity } from '../../lib/adapters';

interface VariantPickerProps {
    variants: Variant[];
    selected: Variant | null;
    onSelect: (variant: Variant) => void;
    error?: boolean;
}

const VariantPicker = ({ variants, selected, onSelect, error }: VariantPickerProps) => {
    return (
        <div className="flex flex-col gap-3">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-500">
                Select Variant
            </span>
            <div className="flex flex-wrap gap-2">
                {variants.map((variant) => {
                    const available = getAvailableQuantity(variant) > 0;
                    const isSelected = selected?.id === variant.id;
                    return (
                        <button
                            key={variant.id}
                            disabled={!available}
                            onClick={() => onSelect(variant)}
                            className={`border px-4 py-2 text-xs uppercase tracking-wider transition-all ${
                                isSelected
                                    ? 'border-accent bg-accent text-black'
                                    : available
                                      ? 'border-border text-gray-400 hover:border-gray-500 hover:text-white'
                                      : 'cursor-not-allowed border-border text-gray-700 line-through'
                            }`}
                        >
                            {formatVariantLabel(variant)}
                            {!available && ' (Out)'}
                        </button>
                    );
                })}
            </div>
            {error && (
                <span className="text-xs text-red-400">Please select a variant</span>
            )}
        </div>
    );
};

export default VariantPicker;

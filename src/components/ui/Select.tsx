import type { SelectHTMLAttributes } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    options: { value: string | number; label: string }[];
}

const Select = ({ label, error, options, className = '', id, ...props }: SelectProps) => {
    const selectId = id ?? label?.toLowerCase().replace(/\s+/g, '-');
    return (
        <div className="flex flex-col gap-2">
            {label && (
                <label htmlFor={selectId} className="text-[10px] font-semibold uppercase tracking-widest text-gray-500">
                    {label}
                </label>
            )}
            <select
                id={selectId}
                className={`w-full border border-border bg-bg px-4 py-3 text-sm text-white focus:border-accent focus:outline-none ${className}`}
                {...props}
            >
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
            {error && <span className="text-xs text-red-400">{error}</span>}
        </div>
    );
};

export default Select;

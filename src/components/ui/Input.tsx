import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

const Input = ({ label, error, className = '', id, ...props }: InputProps) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');
    return (
        <div className="flex flex-col gap-2">
            {label && (
                <label htmlFor={inputId} className="text-[10px] font-semibold uppercase tracking-widest text-gray-500">
                    {label}
                </label>
            )}
            <input
                id={inputId}
                className={`w-full border border-border bg-bg px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:border-accent focus:outline-none ${className}`}
                {...props}
            />
            {error && <span className="text-xs text-red-400">{error}</span>}
        </div>
    );
};

export default Input;

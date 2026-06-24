import type { TextareaHTMLAttributes } from 'react';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
}

const TextArea = ({ label, error, className = '', id, ...props }: TextAreaProps) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');
    return (
        <div className="flex flex-col gap-2">
            {label && (
                <label htmlFor={inputId} className="text-[10px] font-semibold uppercase tracking-widest text-gray-500">
                    {label}
                </label>
            )}
            <textarea
                id={inputId}
                className={`min-h-24 w-full resize-y border border-border bg-bg px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:border-accent focus:outline-none ${className}`}
                {...props}
            />
            {error && <span className="text-xs text-red-400">{error}</span>}
        </div>
    );
};

export default TextArea;

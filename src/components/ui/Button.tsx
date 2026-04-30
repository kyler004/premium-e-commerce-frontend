import type { ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size    = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: Variant;
    size?: Size;
    fullWidth?: boolean;
    loading?: boolean;
}

const variantStyles: Record<Variant, string> = {
    primary:   'bg-[#e8ff00] text-black font-black hover:bg-yellow-300 disabled:bg-gray-700 disabled:text-gray-500',
    secondary: 'border border-[#1f1f1f] text-white hover:border-[#e8ff00] hover:text-[#e8ff00]',
    ghost:     'text-gray-400 hover:text-white hover:bg-[#111111]',
    danger:    'border border-red-800 text-red-400 hover:bg-red-900/20',
};

const sizeStyles: Record<Size, string> = {
    sm: 'px-3 py-1.5 text-xs tracking-wider',
    md: 'px-5 py-2.5 text-sm tracking-wider',
    lg: 'px-8 py-4 text-base tracking-widest',
};

const Button = ({
                    variant = 'primary',
                    size = 'md',
                    fullWidth = false,
                    loading = false,
                    disabled,
                    children,
                    className = '',
                    ...props
                }: ButtonProps) => {
    return (
        <button
            disabled={disabled || loading}
            className={`
        inline-flex items-center justify-center gap-2
        rounded-none font-medium uppercase
        transition-all duration-200
        disabled:cursor-not-allowed disabled:opacity-50
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
            {...props}
        >
            {loading ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            ) : (
                children
            )}
        </button>
    );
};

export default Button;
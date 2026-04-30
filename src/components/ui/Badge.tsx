type BadgeVariant = 'discount' | 'category' | 'outofstock' | 'verified' | 'tag';

interface BadgeProps {
    label: string;
    variant?: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, string> = {
    discount:   'bg-[#e8ff00] text-black font-black',
    category:   'border border-[#1f1f1f] text-gray-400',
    outofstock: 'bg-red-900/40 text-red-400 border border-red-800/40',
    verified:   'bg-emerald-900/40 text-emerald-400 border border-emerald-800/40',
    tag:        'bg-[#111111] text-gray-500',
};

const Badge = ({ label, variant = 'tag' }: BadgeProps) => {
    return (
        <span
            className={`
        inline-flex items-center px-2 py-0.5
        text-[10px] font-semibold uppercase tracking-widest
        ${variantStyles[variant]}
      `}
        >
      {label}
    </span>
    );
};

export default Badge;
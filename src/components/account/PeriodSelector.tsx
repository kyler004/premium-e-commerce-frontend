import type { SpendingPeriod } from '../../types/api';

const PERIODS: { value: SpendingPeriod; label: string }[] = [
    { value: '6m', label: '6M' },
    { value: '12m', label: '12M' },
    { value: '24m', label: '24M' },
    { value: 'all', label: 'All' },
];

interface PeriodSelectorProps {
    value: SpendingPeriod;
    onChange: (period: SpendingPeriod) => void;
    disabled?: boolean;
}

const PeriodSelector = ({ value, onChange, disabled }: PeriodSelectorProps) => (
    <div className="flex w-full gap-1 md:w-auto">
        {PERIODS.map((period) => (
            <button
                key={period.value}
                type="button"
                disabled={disabled}
                onClick={() => onChange(period.value)}
                className={`flex-1 border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest transition-colors disabled:opacity-50 md:flex-none ${
                    value === period.value
                        ? 'border-accent bg-accent/5 text-accent'
                        : 'border-border text-gray-500 hover:border-gray-600 hover:text-white'
                }`}
            >
                {period.label}
            </button>
        ))}
    </div>
);

export default PeriodSelector;

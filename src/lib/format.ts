export const parseDecimal = (value: string | number): number =>
    typeof value === 'number' ? value : parseFloat(value);

export const parseAmount = (value: string): number => parseDecimal(value);

export const formatPeriodLabel = (period: string): string => {
    const [year, month] = period.split('-');
    if (!year || !month) return period;
    const date = new Date(Number(year), Number(month) - 1, 1);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

export const formatPrice = (value: string | number): string =>
    `$${parseDecimal(value).toFixed(2)}`;

export const formatDate = (value: string): string =>
    new Date(value).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });

export const getInitials = (email: string): string => {
    const part = email.split('@')[0] ?? email;
    return part.slice(0, 2).toUpperCase();
};

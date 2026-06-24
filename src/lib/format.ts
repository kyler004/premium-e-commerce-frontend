export const parseDecimal = (value: string | number): number =>
    typeof value === 'number' ? value : parseFloat(value);

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

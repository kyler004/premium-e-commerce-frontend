export const CHART_COLORS = {
    accent: '#e8ff00',
    grid: '#1f1f1f',
    axis: '#6b7280',
    axisLabel: '#9ca3af',
    tooltipBg: '#111111',
    tooltipBorder: '#1f1f1f',
};

export const chartTooltipStyle = {
    backgroundColor: CHART_COLORS.tooltipBg,
    border: `1px solid ${CHART_COLORS.tooltipBorder}`,
    borderRadius: 0,
    fontSize: 12,
};

export const truncateCategoryLabel = (name: string, maxLength = 14): string =>
    name.length > maxLength ? `${name.slice(0, maxLength)}…` : name;

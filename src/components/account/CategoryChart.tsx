import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import type { SpendingByCategory } from '../../types/api';
import { parseAmount } from '../../lib/format';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { CHART_COLORS, chartTooltipStyle, truncateCategoryLabel } from './chartTheme';

interface CategoryChartProps {
    data: SpendingByCategory[];
}

const CategoryChart = ({ data }: CategoryChartProps) => {
    const isMdUp = useMediaQuery('(min-width: 768px)');
    const chartData = data.map((item) => ({
        name: item.category_name,
        total: parseAmount(item.total),
        orders: item.order_count,
    }));

    if (chartData.length === 0) {
        return (
            <div className="min-w-0 border border-border bg-surface p-4 md:p-6">
                <h2 className="mb-4 text-sm font-black uppercase tracking-widest text-white">
                    By Category
                </h2>
                <p className="py-12 text-center text-xs uppercase tracking-widest text-gray-600">
                    No category breakdown available
                </p>
            </div>
        );
    }

    const prefersReducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const chartHeight = Math.max(256, chartData.length * 36);
    const yAxisWidth = isMdUp ? 100 : 120;

    return (
        <div className="min-w-0 overflow-x-auto border border-border bg-surface p-4 md:p-6">
            <h2 className="mb-4 text-sm font-black uppercase tracking-widest text-white">
                By Category
            </h2>
            <div style={{ height: chartHeight, minWidth: 280 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={chartData}
                        layout="vertical"
                        margin={{ top: 8, right: 8, left: 8, bottom: 0 }}
                    >
                        <CartesianGrid stroke={CHART_COLORS.grid} horizontal={false} />
                        <XAxis
                            type="number"
                            tick={{ fill: CHART_COLORS.axis, fontSize: 10 }}
                            axisLine={{ stroke: CHART_COLORS.grid }}
                            tickLine={false}
                            tickFormatter={(v: number) => `$${v}`}
                        />
                        <YAxis
                            type="category"
                            dataKey="name"
                            width={yAxisWidth}
                            tick={{ fill: CHART_COLORS.axisLabel, fontSize: 10 }}
                            axisLine={false}
                            tickLine={false}
                            tickFormatter={(name: string) => truncateCategoryLabel(name)}
                        />
                        <Tooltip
                            contentStyle={chartTooltipStyle}
                            labelStyle={{ color: CHART_COLORS.axisLabel }}
                            itemStyle={{ color: CHART_COLORS.accent }}
                            formatter={(value) => [`$${Number(value ?? 0).toFixed(2)}`, 'Spent']}
                        />
                        <Bar
                            dataKey="total"
                            fill={CHART_COLORS.accent}
                            radius={0}
                            isAnimationActive={!prefersReducedMotion}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default CategoryChart;

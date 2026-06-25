import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import type { SpendingByMonth } from '../../types/api';
import { formatPeriodLabel, parseAmount } from '../../lib/format';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { CHART_COLORS, chartTooltipStyle } from './chartTheme';

interface SpendingChartProps {
    data: SpendingByMonth[];
    periodLabel: string;
}

const SpendingChart = ({ data, periodLabel }: SpendingChartProps) => {
    const isMdUp = useMediaQuery('(min-width: 768px)');
    const chartData = data.map((item) => ({
        label: formatPeriodLabel(item.period),
        total: parseAmount(item.total),
        orders: item.order_count,
    }));

    if (chartData.length === 0) {
        return (
            <div className="min-w-0 border border-border bg-surface p-4 md:p-6">
                <h2 className="mb-4 text-sm font-black uppercase tracking-widest text-white">
                    Spending — {periodLabel}
                </h2>
                <p className="py-12 text-center text-xs uppercase tracking-widest text-gray-600">
                    No spending data for this period
                </p>
            </div>
        );
    }

    const prefersReducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const denseLabels = chartData.length > 6 || !isMdUp;
    const chartMargin = isMdUp
        ? { top: 8, right: 8, left: 0, bottom: 0 }
        : { top: 8, right: 4, left: -8, bottom: 24 };

    return (
        <div className="min-w-0 border border-border bg-surface p-4 md:p-6">
            <h2 className="mb-4 text-sm font-black uppercase tracking-widest text-white">
                Spending — {periodLabel}
            </h2>
            <div className="h-56 sm:h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={chartMargin}>
                        <CartesianGrid stroke={CHART_COLORS.grid} vertical={false} />
                        <XAxis
                            dataKey="label"
                            tick={{ fill: CHART_COLORS.axis, fontSize: 10 }}
                            axisLine={{ stroke: CHART_COLORS.grid }}
                            tickLine={false}
                            angle={denseLabels ? -35 : 0}
                            textAnchor={denseLabels ? 'end' : 'middle'}
                            height={denseLabels ? 50 : 30}
                            interval="preserveStartEnd"
                        />
                        <YAxis
                            tick={{ fill: CHART_COLORS.axis, fontSize: 10 }}
                            axisLine={false}
                            tickLine={false}
                            tickFormatter={(v: number) => `$${v}`}
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

export default SpendingChart;

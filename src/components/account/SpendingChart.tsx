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

interface SpendingChartProps {
    data: SpendingByMonth[];
    periodLabel: string;
}

const chartTooltipStyle = {
    backgroundColor: '#111111',
    border: '1px solid #1f1f1f',
    borderRadius: 0,
    fontSize: 12,
};

const SpendingChart = ({ data, periodLabel }: SpendingChartProps) => {
    const chartData = data.map((item) => ({
        label: formatPeriodLabel(item.period),
        total: parseAmount(item.total),
        orders: item.order_count,
    }));

    if (chartData.length === 0) {
        return (
            <div className="border border-border bg-surface p-6">
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

    return (
        <div className="border border-border bg-surface p-6">
            <h2 className="mb-4 text-sm font-black uppercase tracking-widest text-white">
                Spending — {periodLabel}
            </h2>
            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                        <CartesianGrid stroke="#1f1f1f" vertical={false} />
                        <XAxis
                            dataKey="label"
                            tick={{ fill: '#6b7280', fontSize: 10 }}
                            axisLine={{ stroke: '#1f1f1f' }}
                            tickLine={false}
                        />
                        <YAxis
                            tick={{ fill: '#6b7280', fontSize: 10 }}
                            axisLine={false}
                            tickLine={false}
                            tickFormatter={(v: number) => `$${v}`}
                        />
                        <Tooltip
                            contentStyle={chartTooltipStyle}
                            labelStyle={{ color: '#9ca3af' }}
                            itemStyle={{ color: '#e8ff00' }}
                            formatter={(value) => [`$${Number(value ?? 0).toFixed(2)}`, 'Spent']}
                        />
                        <Bar
                            dataKey="total"
                            fill="#e8ff00"
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

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

interface CategoryChartProps {
    data: SpendingByCategory[];
}

const chartTooltipStyle = {
    backgroundColor: '#111111',
    border: '1px solid #1f1f1f',
    borderRadius: 0,
    fontSize: 12,
};

const CategoryChart = ({ data }: CategoryChartProps) => {
    const chartData = data.map((item) => ({
        name: item.category_name,
        total: parseAmount(item.total),
        orders: item.order_count,
    }));

    if (chartData.length === 0) {
        return (
            <div className="border border-border bg-surface p-6">
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

    return (
        <div className="border border-border bg-surface p-6">
            <h2 className="mb-4 text-sm font-black uppercase tracking-widest text-white">
                By Category
            </h2>
            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={chartData}
                        layout="vertical"
                        margin={{ top: 8, right: 8, left: 8, bottom: 0 }}
                    >
                        <CartesianGrid stroke="#1f1f1f" horizontal={false} />
                        <XAxis
                            type="number"
                            tick={{ fill: '#6b7280', fontSize: 10 }}
                            axisLine={{ stroke: '#1f1f1f' }}
                            tickLine={false}
                            tickFormatter={(v: number) => `$${v}`}
                        />
                        <YAxis
                            type="category"
                            dataKey="name"
                            width={100}
                            tick={{ fill: '#9ca3af', fontSize: 10 }}
                            axisLine={false}
                            tickLine={false}
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

export default CategoryChart;

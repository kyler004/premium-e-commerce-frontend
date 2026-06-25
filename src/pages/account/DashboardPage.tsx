import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { accountApi } from '../../api/account';
import type { SpendingPeriod, SpendingSummary } from '../../types/api';
import PageHeader from '../../components/ui/PageHeader';
import KpiCard from '../../components/account/KpiCard';
import PeriodSelector from '../../components/account/PeriodSelector';
import SpendingChart from '../../components/account/SpendingChart';
import CategoryChart from '../../components/account/CategoryChart';
import RecentOrdersPanel from '../../components/account/RecentOrdersPanel';
import Button from '../../components/ui/Button';
import { formatPrice } from '../../lib/format';
import { ApiError, parseApiError } from '../../api/client';

const PERIOD_LABELS: Record<SpendingPeriod, string> = {
    '6m': 'last 6 months',
    '12m': 'last 12 months',
    '24m': 'last 24 months',
    all: 'all time',
};

const DashboardPage = () => {
    const [period, setPeriod] = useState<SpendingPeriod>('12m');
    const [fetchPeriod, setFetchPeriod] = useState<SpendingPeriod>('12m');
    const [summary, setSummary] = useState<SpendingSummary | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;
        accountApi.getSpendingSummary(period)
            .then((data) => {
                if (!cancelled) {
                    setSummary(data);
                    setFetchPeriod(period);
                    setError(null);
                }
            })
            .catch((err) => {
                if (!cancelled) {
                    setError(err instanceof ApiError ? parseApiError(err.body) : 'Failed to load dashboard.');
                }
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });
        return () => { cancelled = true; };
    }, [period]);

    const isRefetching = !loading && fetchPeriod !== period;

    const handleRetry = () => {
        setLoading(true);
        setError(null);
        accountApi.getSpendingSummary(period)
            .then((data) => {
                setSummary(data);
                setFetchPeriod(period);
            })
            .catch((err) => {
                setError(err instanceof ApiError ? parseApiError(err.body) : 'Failed to load dashboard.');
            })
            .finally(() => setLoading(false));
    };

    if (loading && !summary) {
        return (
            <div className="fade-in-element">
                <PageHeader eyebrow="Account" title="Dashboard" />
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="h-24 animate-pulse border border-border bg-surface" />
                    ))}
                </div>
            </div>
        );
    }

    if (error && !summary) {
        return (
            <div className="fade-in-element">
                <PageHeader eyebrow="Account" title="Dashboard" />
                <div className="border border-red-800/40 bg-red-900/10 p-8 text-center">
                    <p className="text-sm font-semibold uppercase tracking-widest text-red-400">{error}</p>
                    <Button variant="secondary" className="mt-4" onClick={handleRetry}>
                        Retry
                    </Button>
                </div>
            </div>
        );
    }

    if (!summary) return null;

    return (
        <div className="fade-in-element">
            <PageHeader
                eyebrow="Account"
                title="Dashboard"
                trailing={
                    <PeriodSelector
                        value={period}
                        onChange={setPeriod}
                        disabled={loading || isRefetching}
                    />
                }
            />

            <div className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-4 ${loading || isRefetching ? 'opacity-60' : ''}`}>
                <KpiCard label="Lifetime Spend" value={formatPrice(summary.lifetime_spend)} accent />
                <KpiCard label="Paid Orders" value={String(summary.paid_order_count)} />
                <KpiCard label="Avg Order" value={formatPrice(summary.average_order_value)} />
                <KpiCard label="Total Saved" value={formatPrice(summary.total_savings)} subtext="From promotions" />
            </div>

            <div className={`mt-8 grid min-w-0 gap-6 lg:grid-cols-2 ${loading || isRefetching ? 'opacity-60' : ''}`}>
                <div className="min-w-0">
                    <SpendingChart data={summary.spending_by_month} periodLabel={PERIOD_LABELS[period]} />
                </div>
                <div className="min-w-0">
                    <CategoryChart data={summary.spending_by_category} />
                </div>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
                <RecentOrdersPanel orders={summary.recent_paid_orders} />

                <div className="min-w-0 border border-border bg-surface p-4 md:p-6">
                    <h2 className="mb-4 text-sm font-black uppercase tracking-widest text-white">
                        Order Status
                    </h2>
                    <div className="flex flex-col gap-3 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-400">Paid</span>
                            <span className="font-black text-emerald-400">{summary.paid_order_count}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-400">Pending</span>
                            <span className="text-white">{summary.pending_order_count}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-400">Cancelled</span>
                            <span className="text-red-400">{summary.cancelled_order_count}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 text-xs uppercase tracking-widest sm:flex-row sm:gap-6">
                <Link to="/orders" className="text-gray-500 hover:text-accent">
                    View all orders →
                </Link>
                <Link to="/account/receipts" className="text-gray-500 hover:text-accent">
                    Receipt archive →
                </Link>
            </div>
        </div>
    );
};

export default DashboardPage;

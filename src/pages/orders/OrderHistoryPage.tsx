import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ordersApi } from '../../api/orders';
import type { OrderListItem } from '../../types/api';
import PageHeader from '../../components/ui/PageHeader';
import PageContainer from '../../components/layout/PageContainer';
import Pagination from '../../components/ui/Pagination';
import { formatDate, formatPrice } from '../../lib/format';
import { VerifiedRoute } from '../../router/guards';
import Badge from '../../components/ui/Badge';

const statusVariant = (status: string) => {
    if (status === 'paid') return 'verified' as const;
    if (status === 'cancelled') return 'outofstock' as const;
    return 'category' as const;
};

const OrderHistoryPageContent = () => {
    const [orders, setOrders] = useState<OrderListItem[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        ordersApi.list({ page, page_size: 10 }).then((data) => {
            setOrders(data.results);
            setTotalPages(Math.max(1, Math.ceil(data.count / 10)));
        });
    }, [page]);

    return (
        <PageContainer>
            <PageHeader eyebrow="Account" title="Your Orders" />
            {orders.length === 0 ? (
                <p className="text-sm text-gray-500">No orders yet.</p>
            ) : (
                <div className="flex flex-col divide-y divide-border border border-border">
                    {orders.map((order) => (
                        <Link
                            key={order.id}
                            to={`/orders/${order.id}`}
                            className="flex flex-col gap-4 p-4 transition-colors hover:bg-surface sm:flex-row sm:items-center sm:justify-between sm:p-6"
                        >
                            <div>
                                <p className="text-sm font-black uppercase text-white">Order #{order.id}</p>
                                <p className="text-xs text-gray-500">{formatDate(order.created_at)}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <Badge label={order.status} variant={statusVariant(order.status)} />
                                <span className="text-sm font-black text-accent">{formatPrice(order.total)}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
            <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </PageContainer>
    );
};

const OrderHistoryPage = () => (
    <VerifiedRoute>
        <OrderHistoryPageContent />
    </VerifiedRoute>
);

export default OrderHistoryPage;

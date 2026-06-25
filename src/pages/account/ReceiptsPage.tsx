import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ordersApi } from '../../api/orders';
import type { OrderListItem } from '../../types/api';
import PageHeader from '../../components/ui/PageHeader';
import Pagination from '../../components/ui/Pagination';
import ReceiptArchiveRow from '../../components/account/ReceiptArchiveRow';
import Button from '../../components/ui/Button';
import { getReceiptErrorMessage, openReceiptInNewTab } from '../../lib/receipt';
import { useToast } from '../../hooks/useToast';

const ReceiptsPage = () => {
    const [orders, setOrders] = useState<OrderListItem[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [openingId, setOpeningId] = useState<number | null>(null);
    const { showToast } = useToast();

    useEffect(() => {
        let cancelled = false;
        ordersApi.list({ status: 'paid', ordering: '-paid_at', page, page_size: 20 })
            .then((data) => {
                if (!cancelled) {
                    setOrders(data.results);
                    setTotalPages(Math.max(1, Math.ceil(data.count / 20)));
                }
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });
        return () => { cancelled = true; };
    }, [page]);

    const handleOpenOfficial = async (orderId: number) => {
        setOpeningId(orderId);
        try {
            await openReceiptInNewTab(orderId);
        } catch (err) {
            showToast(getReceiptErrorMessage(err), 'error');
        } finally {
            setOpeningId(null);
        }
    };

    return (
        <div className="fade-in-element">
            <PageHeader eyebrow="Account" title="Receipt Archive" />

            {loading ? (
                <div className="flex min-h-[200px] items-center justify-center border border-border bg-surface">
                    <div className="h-6 w-6 animate-spin rounded-full border-2 border-accent border-t-transparent" />
                </div>
            ) : orders.length === 0 ? (
                <div className="border border-border bg-surface p-12 text-center">
                    <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
                        No paid orders yet
                    </p>
                    <Link to="/" className="mt-4 inline-block">
                        <Button variant="secondary">Browse Shop</Button>
                    </Link>
                </div>
            ) : (
                <>
                    <div className="flex flex-col divide-y divide-border border border-border">
                        {orders.map((order) => (
                            <ReceiptArchiveRow
                                key={order.id}
                                order={order}
                                onOpenOfficial={handleOpenOfficial}
                                openingId={openingId}
                            />
                        ))}
                    </div>
                    <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
                </>
            )}
        </div>
    );
};

export default ReceiptsPage;

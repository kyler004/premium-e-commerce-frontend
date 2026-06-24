import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { ordersApi } from '../../api/orders';
import type { Order } from '../../types/api';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { VerifiedRoute } from '../../router/guards';
import { formatDate, formatPrice } from '../../lib/format';
import { useToast } from '../../hooks/useToast';
import { ApiError, parseApiError } from '../../api/client';

const OrderDetailPageContent = () => {
    const { id } = useParams<{ id: string }>();
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(false);
    const { showToast } = useToast();

    useEffect(() => {
        if (!id) return;
        let cancelled = false;
        ordersApi.get(Number(id)).then((data) => {
            if (!cancelled) setOrder(data);
        });
        return () => { cancelled = true; };
    }, [id]);

    const handlePay = async () => {
        if (!order) return;
        setLoading(true);
        try {
            const updated = await ordersApi.confirmPayment(order.id);
            setOrder(updated);
            showToast('Payment confirmed.', 'success');
        } catch (err) {
            if (err instanceof ApiError) showToast(parseApiError(err.body), 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = async () => {
        if (!order) return;
        setLoading(true);
        try {
            const updated = await ordersApi.cancel(order.id);
            setOrder(updated);
            showToast('Order cancelled.', 'info');
        } catch (err) {
            if (err instanceof ApiError) showToast(parseApiError(err.body), 'error');
        } finally {
            setLoading(false);
        }
    };

    if (!order) {
        return <div className="mx-auto max-w-7xl px-6 py-12 text-gray-500">Loading order...</div>;
    }

    return (
        <div className="mx-auto max-w-7xl px-6 py-12 fade-in-element">
            <Link to="/orders" className="mb-8 flex w-fit items-center gap-2 text-xs uppercase tracking-widest text-gray-500 hover:text-accent">
                <ArrowLeft size={14} />
                Back to Orders
            </Link>

            <div className="mb-8 flex items-end justify-between border-b border-border pb-6">
                <div>
                    <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-gray-500">Order</p>
                    <h1 className="text-4xl font-black uppercase tracking-tight text-white">#{order.id}</h1>
                </div>
                <Badge label={order.status} variant={order.status === 'paid' ? 'verified' : order.status === 'cancelled' ? 'outofstock' : 'category'} />
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
                <div className="border border-border bg-surface p-6">
                    <h2 className="mb-4 text-sm font-black uppercase tracking-widest text-white">Items</h2>
                    <div className="flex flex-col divide-y divide-border">
                        {order.items.map((item) => (
                            <div key={item.id} className="flex justify-between py-4">
                                <div>
                                    <p className="text-sm font-bold text-white">{item.product_name}</p>
                                    <p className="text-xs text-gray-500">{item.color} / {item.size} · Qty {item.quantity}</p>
                                </div>
                                <span className="text-sm text-white">{formatPrice(item.line_total)}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-6">
                    <div className="border border-border bg-surface p-6">
                        <h2 className="mb-4 text-sm font-black uppercase tracking-widest text-white">Summary</h2>
                        <div className="flex flex-col gap-2 text-sm">
                            <div className="flex justify-between"><span className="text-gray-400">Subtotal</span><span>{formatPrice(order.subtotal)}</span></div>
                            {parseFloat(order.discount_amount) > 0 && (
                                <div className="flex justify-between"><span className="text-gray-400">Discount</span><span className="text-emerald-400">−{formatPrice(order.discount_amount)}</span></div>
                            )}
                            <div className="flex justify-between border-t border-border pt-2 font-black"><span>Total</span><span className="text-accent">{formatPrice(order.total)}</span></div>
                        </div>
                    </div>

                    <div className="border border-border bg-surface p-6">
                        <h2 className="mb-4 text-sm font-black uppercase tracking-widest text-white">Shipping</h2>
                        <p className="text-sm text-gray-400">{order.shipping.full_name}</p>
                        <p className="text-sm text-gray-400">{order.shipping.address_line1}</p>
                        {order.shipping.address_line2 && <p className="text-sm text-gray-400">{order.shipping.address_line2}</p>}
                        <p className="text-sm text-gray-400">{order.shipping.city}, {order.shipping.postal_code}</p>
                        <p className="text-sm text-gray-400">{order.shipping.country}</p>
                    </div>

                    {order.status === 'pending' && (
                        <div className="flex gap-3">
                            <Button fullWidth loading={loading} onClick={handlePay}>Confirm Payment</Button>
                            <Button variant="danger" fullWidth loading={loading} onClick={handleCancel}>Cancel Order</Button>
                        </div>
                    )}

                    {order.paid_at && (
                        <p className="text-xs text-emerald-400">Paid on {formatDate(order.paid_at)}</p>
                    )}
                </div>
            </div>
        </div>
    );
};

const OrderDetailPage = () => (
    <VerifiedRoute>
        <OrderDetailPageContent />
    </VerifiedRoute>
);

export default OrderDetailPage;

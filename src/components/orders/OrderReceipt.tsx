import type { Order } from '../../types/api';
import { formatDate, formatPrice } from '../../lib/format';
import Badge from '../ui/Badge';

interface OrderReceiptProps {
    order: Order;
}

const OrderReceipt = ({ order }: OrderReceiptProps) => (
    <article className="receipt-print-area border border-border bg-surface">
        <header className="border-b border-border px-6 py-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                    <p className="text-xl font-black tracking-widest text-accent">VOIDSTEP</p>
                    <p className="mt-2 text-[10px] font-semibold uppercase tracking-widest text-gray-500">
                        Order Receipt
                    </p>
                </div>
                <Badge
                    label={order.status}
                    variant={order.status === 'paid' ? 'verified' : order.status === 'cancelled' ? 'outofstock' : 'category'}
                />
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-500">Order</p>
                    <p className="mt-1 text-sm font-black text-white">#{order.id}</p>
                </div>
                <div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-500">Date</p>
                    <p className="mt-1 text-sm text-white">{formatDate(order.created_at)}</p>
                </div>
                {order.paid_at && (
                    <div>
                        <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-500">Paid</p>
                        <p className="mt-1 text-sm text-emerald-400">{formatDate(order.paid_at)}</p>
                    </div>
                )}
                {order.promotion_code && (
                    <div>
                        <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-500">Promotion</p>
                        <p className="mt-1 text-sm text-white">{order.promotion_code}</p>
                    </div>
                )}
            </div>
        </header>

        <div className="grid gap-px bg-border lg:grid-cols-2">
            <section className="bg-surface p-6">
                <h2 className="mb-4 text-sm font-black uppercase tracking-widest text-white">Items</h2>
                <div className="flex flex-col divide-y divide-border">
                    {order.items.map((item) => (
                        <div key={item.id} className="flex justify-between gap-4 py-4 first:pt-0 last:pb-0">
                            <div>
                                <p className="text-sm font-bold text-white">{item.product_name}</p>
                                <p className="text-xs text-gray-500">
                                    {item.sku} · {item.color} / {item.size} · Qty {item.quantity}
                                </p>
                                <p className="text-xs text-gray-600">{formatPrice(item.unit_price)} each</p>
                            </div>
                            <span className="shrink-0 text-sm font-bold text-white">
                                {formatPrice(item.line_total)}
                            </span>
                        </div>
                    ))}
                </div>
            </section>

            <div className="flex flex-col gap-px bg-border">
                <section className="bg-surface p-6">
                    <h2 className="mb-4 text-sm font-black uppercase tracking-widest text-white">Summary</h2>
                    <div className="flex flex-col gap-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-400">Subtotal</span>
                            <span className="text-white">{formatPrice(order.subtotal)}</span>
                        </div>
                        {parseFloat(order.discount_amount) > 0 && (
                            <div className="flex justify-between">
                                <span className="text-gray-400">Discount</span>
                                <span className="text-emerald-400">−{formatPrice(order.discount_amount)}</span>
                            </div>
                        )}
                        <div className="flex justify-between border-t border-border pt-2 font-black">
                            <span className="text-white">Total</span>
                            <span className="text-accent">{formatPrice(order.total)}</span>
                        </div>
                    </div>
                </section>

                <section className="bg-surface p-6">
                    <h2 className="mb-4 text-sm font-black uppercase tracking-widest text-white">Ship To</h2>
                    <div className="flex flex-col gap-1 text-sm text-gray-400">
                        <p className="text-white">{order.shipping.full_name}</p>
                        <p>{order.shipping.address_line1}</p>
                        {order.shipping.address_line2 && <p>{order.shipping.address_line2}</p>}
                        <p>{order.shipping.city}, {order.shipping.postal_code}</p>
                        <p>{order.shipping.country}</p>
                        {order.shipping.phone && <p>{order.shipping.phone}</p>}
                    </div>
                </section>
            </div>
        </div>

        <footer className="border-t border-border px-6 py-4">
            <p className="text-[10px] uppercase tracking-widest text-gray-600">
                Thank you for shopping with VOIDSTEP.
            </p>
        </footer>
    </article>
);

export default OrderReceipt;

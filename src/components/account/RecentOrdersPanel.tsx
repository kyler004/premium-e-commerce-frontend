import { Link } from 'react-router-dom';
import { FileText } from 'lucide-react';
import type { RecentPaidOrder } from '../../types/api';
import { formatDate, formatPrice } from '../../lib/format';

interface RecentOrdersPanelProps {
    orders: RecentPaidOrder[];
}

const RecentOrdersPanel = ({ orders }: RecentOrdersPanelProps) => (
    <div className="border border-border bg-surface p-6">
        <h2 className="mb-4 text-sm font-black uppercase tracking-widest text-white">
            Recent Orders
        </h2>
        {orders.length === 0 ? (
            <p className="text-xs text-gray-600">No paid orders yet.</p>
        ) : (
            <div className="flex flex-col divide-y divide-border">
                {orders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
                        <div>
                            <Link
                                to={`/orders/${order.id}`}
                                className="text-sm font-black uppercase text-white hover:text-accent"
                            >
                                Order #{order.id}
                            </Link>
                            <p className="text-xs text-gray-500">
                                {formatDate(order.paid_at)} · {order.item_count} items
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-sm font-black text-accent">{formatPrice(order.total)}</span>
                            <Link
                                to={`/orders/${order.id}/receipt`}
                                className="text-gray-500 hover:text-accent"
                                title="View receipt"
                            >
                                <FileText size={16} />
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        )}
    </div>
);

export default RecentOrdersPanel;

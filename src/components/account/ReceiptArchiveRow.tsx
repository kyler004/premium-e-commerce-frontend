import { Link } from 'react-router-dom';
import { ExternalLink, FileText } from 'lucide-react';
import type { OrderListItem } from '../../types/api';
import { formatDate, formatPrice } from '../../lib/format';
import Button from '../ui/Button';

interface ReceiptArchiveRowProps {
    order: OrderListItem;
    onOpenOfficial: (orderId: number) => void;
    openingId: number | null;
}

const ReceiptArchiveRow = ({ order, onOpenOfficial, openingId }: ReceiptArchiveRowProps) => (
    <div className="flex flex-wrap items-center justify-between gap-4 p-6">
        <div>
            <Link
                to={`/orders/${order.id}`}
                className="text-sm font-black uppercase text-white hover:text-accent"
            >
                Order #{order.id}
            </Link>
            <p className="text-xs text-gray-500">
                {order.paid_at ? formatDate(order.paid_at) : formatDate(order.created_at)} ·{' '}
                {order.item_count} items
            </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-black text-accent">{formatPrice(order.total)}</span>
            <Link to={`/orders/${order.id}/receipt`}>
                <Button variant="secondary" size="sm">
                    <FileText size={14} />
                    View Receipt
                </Button>
            </Link>
            <Button
                variant="ghost"
                size="sm"
                loading={openingId === order.id}
                onClick={() => onOpenOfficial(order.id)}
            >
                <ExternalLink size={14} />
                Open Official
            </Button>
        </div>
    </div>
);

export default ReceiptArchiveRow;

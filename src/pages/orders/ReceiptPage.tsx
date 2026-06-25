import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Printer } from 'lucide-react';
import { ordersApi } from '../../api/orders';
import type { Order } from '../../types/api';
import OrderReceipt from '../../components/orders/OrderReceipt';
import OfficialReceiptViewer, { type OfficialReceiptViewerHandle } from '../../components/orders/OfficialReceiptViewer';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { VerifiedRoute } from '../../router/guards';
import { getReceiptErrorMessage, openReceiptInNewTab } from '../../lib/receipt';
import { useToast } from '../../hooks/useToast';

type ReceiptView = 'app' | 'official';

const ReceiptPageContent = () => {
    const { id } = useParams<{ id: string }>();
    const orderId = Number(id);
    const [order, setOrder] = useState<Order | null>(null);
    const [view, setView] = useState<ReceiptView>('app');
    const [openingTab, setOpeningTab] = useState(false);
    const officialReceiptRef = useRef<OfficialReceiptViewerHandle>(null);
    const { showToast } = useToast();

    useEffect(() => {
        if (!id || Number.isNaN(orderId)) return;
        let cancelled = false;
        ordersApi.get(orderId).then((data) => {
            if (!cancelled) setOrder(data);
        });
        return () => { cancelled = true; };
    }, [id, orderId]);

    const handlePrint = () => {
        if (view === 'official') {
            officialReceiptRef.current?.print();
            return;
        }
        window.print();
    };

    const handleOpenOfficialTab = async () => {
        if (!order) return;
        setOpeningTab(true);
        try {
            await openReceiptInNewTab(order.id);
        } catch (err) {
            showToast(getReceiptErrorMessage(err), 'error');
        } finally {
            setOpeningTab(false);
        }
    };

    if (!order) {
        return (
            <div className="mx-auto max-w-7xl px-6 py-12 text-gray-500">
                Loading receipt...
            </div>
        );
    }

    if (order.status !== 'paid') {
        return (
            <div className="mx-auto max-w-7xl px-6 py-12 fade-in-element">
                <Link
                    to={`/orders/${order.id}`}
                    className="receipt-no-print mb-8 flex w-fit items-center gap-2 text-xs uppercase tracking-widest text-gray-500 hover:text-accent"
                >
                    <ArrowLeft size={14} />
                    Back to Order
                </Link>
                <div className="border border-border bg-surface p-8 text-center">
                    <p className="text-sm font-semibold uppercase tracking-widest text-gray-400">
                        Receipt unavailable
                    </p>
                    <p className="mt-2 text-xs text-gray-600">
                        Official receipts are generated after payment is confirmed.
                    </p>
                    <Link to={`/orders/${order.id}`} className="mt-6 inline-block">
                        <Button variant="secondary">View Order</Button>
                    </Link>
                </div>
            </div>
        );
    }

    const tabClass = (active: boolean) =>
        `border px-4 py-2 text-xs font-semibold uppercase tracking-widest transition-colors ${
            active
                ? 'border-accent bg-accent/5 text-accent'
                : 'border-border text-gray-500 hover:border-gray-600 hover:text-white'
        }`;

    return (
        <div className="mx-auto max-w-7xl px-6 py-12 fade-in-element">
            <Link
                to={`/orders/${order.id}`}
                className="receipt-no-print mb-8 flex w-fit items-center gap-2 text-xs uppercase tracking-widest text-gray-500 hover:text-accent"
            >
                <ArrowLeft size={14} />
                Back to Order
            </Link>

            <div className="receipt-no-print mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-border pb-6">
                <div>
                    <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-gray-500">
                        Account
                    </p>
                    <h1 className="text-4xl font-black uppercase tracking-tight text-white">
                        Receipt #{order.id}
                    </h1>
                </div>
                <Badge label={order.status} variant="verified" />
            </div>

            <div className="receipt-no-print mb-6 flex flex-wrap items-center justify-between gap-4">
                <div className="flex gap-2">
                    <button type="button" className={tabClass(view === 'app')} onClick={() => setView('app')}>
                        App Receipt
                    </button>
                    <button type="button" className={tabClass(view === 'official')} onClick={() => setView('official')}>
                        Official Receipt
                    </button>
                </div>

                <div className="flex flex-wrap gap-2">
                    <Button variant="secondary" size="sm" onClick={handlePrint}>
                        <Printer size={14} />
                        Print
                    </Button>
                    <Button
                        variant="secondary"
                        size="sm"
                        loading={openingTab}
                        onClick={handleOpenOfficialTab}
                    >
                        <ExternalLink size={14} />
                        Open Official
                    </Button>
                </div>
            </div>

            {view === 'app' ? (
                <OrderReceipt order={order} />
            ) : (
                <OfficialReceiptViewer ref={officialReceiptRef} orderId={order.id} />
            )}

            <p className="receipt-no-print mt-4 text-xs text-gray-600">
                {view === 'app'
                    ? 'Styled to match your VOIDSTEP account. Use Official Receipt for the server-generated document.'
                    : 'Server-generated receipt from the backend. Print or open in a new tab for PDF export.'}
            </p>
        </div>
    );
};

const ReceiptPage = () => (
    <VerifiedRoute>
        <ReceiptPageContent />
    </VerifiedRoute>
);

export default ReceiptPage;

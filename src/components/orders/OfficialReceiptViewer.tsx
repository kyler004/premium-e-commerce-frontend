import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { ordersApi } from '../../api/orders';
import { getReceiptErrorMessage } from '../../lib/receipt';

interface OfficialReceiptViewerProps {
    orderId: number;
}

export interface OfficialReceiptViewerHandle {
    print: () => void;
}

const OfficialReceiptViewer = forwardRef<OfficialReceiptViewerHandle, OfficialReceiptViewerProps>(
    ({ orderId }, ref) => {
        const iframeRef = useRef<HTMLIFrameElement>(null);
        const [htmlContent, setHtmlContent] = useState('');
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState<string | null>(null);

        useImperativeHandle(ref, () => ({
            print: () => iframeRef.current?.contentWindow?.print(),
        }));

        useEffect(() => {
            let cancelled = false;
            setLoading(true);
            setError(null);

            ordersApi.getReceiptHtml(orderId)
                .then((html) => {
                    if (!cancelled) {
                        setHtmlContent(html);
                        setLoading(false);
                    }
                })
                .catch((err) => {
                    if (!cancelled) {
                        setError(getReceiptErrorMessage(err));
                        setLoading(false);
                    }
                });

            return () => { cancelled = true; };
        }, [orderId]);

        if (loading) {
            return (
                <div className="flex min-h-[480px] items-center justify-center border border-border bg-surface">
                    <div className="h-6 w-6 animate-spin rounded-full border-2 border-accent border-t-transparent" />
                </div>
            );
        }

        if (error) {
            return (
                <div className="border border-red-800/40 bg-red-900/10 px-6 py-12 text-center">
                    <p className="text-sm font-semibold uppercase tracking-widest text-red-400">{error}</p>
                    <p className="mt-2 text-xs text-gray-500">
                        Official receipts are available for paid orders.
                    </p>
                </div>
            );
        }

        return (
            <iframe
                ref={iframeRef}
                title={`Official receipt for order #${orderId}`}
                srcDoc={htmlContent}
                className="min-h-[720px] w-full border border-border bg-surface"
            />
        );
    }
);

OfficialReceiptViewer.displayName = 'OfficialReceiptViewer';

export default OfficialReceiptViewer;

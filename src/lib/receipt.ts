import { ordersApi } from '../api/orders';
import { ApiError, parseApiError } from '../api/client';

export const openReceiptInNewTab = async (orderId: number): Promise<void> => {
    const html = await ordersApi.getReceiptHtml(orderId);
    const newWindow = window.open('', '_blank');
    if (!newWindow) {
        throw new Error('Pop-up blocked. Allow pop-ups to open the official receipt.');
    }
    newWindow.document.write(html);
    newWindow.document.close();
};

export const getReceiptErrorMessage = (err: unknown): string => {
    if (err instanceof ApiError) return parseApiError(err.body);
    if (err instanceof Error) return err.message;
    return 'Failed to load receipt.';
};

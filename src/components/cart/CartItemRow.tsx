import type { CartLine } from '../../types/api';
import { formatPrice } from '../../lib/format';
import { useCartStore } from '../../store/cartStore';
import { useToast } from '../../hooks/useToast';
import { ApiError, parseApiError } from '../../api/client';

interface CartItemRowProps {
    item: CartLine;
}

const CartItemRow = ({ item }: CartItemRowProps) => {
    const updateQuantity = useCartStore((s) => s.updateQuantity);
    const removeItem = useCartStore((s) => s.removeItem);
    const { showToast } = useToast();

    const handleUpdate = async (qty: number) => {
        try {
            await updateQuantity(item.id, qty);
        } catch (err) {
            if (err instanceof ApiError) showToast(parseApiError(err.body), 'error');
        }
    };

    const handleRemove = async () => {
        try {
            await removeItem(item.id);
        } catch (err) {
            if (err instanceof ApiError) showToast(parseApiError(err.body), 'error');
        }
    };

    return (
        <div className="flex gap-5 border-b border-border py-6">
            <div className="flex flex-1 flex-col gap-2">
                <p className="text-sm font-black uppercase tracking-wide text-white">
                    {item.variant.product_name}
                </p>
                <p className="text-xs text-gray-500">
                    {item.variant.color} / {item.variant.size} · {item.variant.sku}
                </p>
                <p className="text-xs text-gray-600">{formatPrice(item.unit_price)} each</p>
            </div>

            <div className="flex flex-col items-end gap-3">
                <div className="flex items-center border border-border">
                    <button
                        onClick={() => handleUpdate(item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="px-2 py-1 text-gray-400 hover:bg-border hover:text-white disabled:opacity-40 text-sm"
                    >
                        −
                    </button>
                    <span className="w-8 text-center text-sm font-bold text-white">{item.quantity}</span>
                    <button
                        onClick={() => handleUpdate(item.quantity + 1)}
                        disabled={item.quantity >= item.variant.available_quantity}
                        className="px-2 py-1 text-gray-400 hover:bg-border hover:text-white disabled:opacity-40 text-sm"
                    >
                        +
                    </button>
                </div>
                <span className="text-sm font-black text-white">{formatPrice(item.line_total)}</span>
                <button onClick={handleRemove} className="text-[10px] uppercase tracking-wider text-gray-600 hover:text-red-400">
                    Remove
                </button>
            </div>
        </div>
    );
};

export default CartItemRow;

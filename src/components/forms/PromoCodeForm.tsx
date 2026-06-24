import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { useCartStore } from '../../store/cartStore';
import { useToast } from '../../hooks/useToast';
import { ApiError, parseApiError } from '../../api/client';

const PromoCodeForm = () => {
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);
    const applyPromo = useCartStore((s) => s.applyPromo);
    const removePromo = useCartStore((s) => s.removePromo);
    const promotion = useCartStore((s) => s.cart?.promotion);
    const { showToast } = useToast();

    const handleApply = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await applyPromo(code);
            showToast('Promotion applied.', 'success');
            setCode('');
        } catch (err) {
            if (err instanceof ApiError) showToast(parseApiError(err.body), 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleRemove = async () => {
        try {
            await removePromo();
            showToast('Promotion removed.', 'info');
        } catch (err) {
            if (err instanceof ApiError) showToast(parseApiError(err.body), 'error');
        }
    };

    return (
        <div className="flex flex-col gap-3 border border-border bg-bg p-3">
            {promotion ? (
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-[10px] uppercase tracking-widest text-gray-500">Promo Applied</p>
                        <p className="text-sm font-bold text-accent">{promotion.code}</p>
                    </div>
                    <button onClick={handleRemove} className="text-xs text-gray-500 hover:text-red-400">
                        Remove
                    </button>
                </div>
            ) : (
                <form onSubmit={handleApply} className="flex gap-2">
                    <Input
                        placeholder="Promo code"
                        value={code}
                        onChange={(e) => setCode(e.target.value.toUpperCase())}
                        className="flex-1"
                    />
                    <Button type="submit" size="sm" loading={loading}>Apply</Button>
                </form>
            )}
        </div>
    );
};

export default PromoCodeForm;

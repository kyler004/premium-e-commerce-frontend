import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../../store/cartStore';
import Button from '../ui/Button';
import PromoCodeForm from '../forms/PromoCodeForm';
import { formatPrice, parseDecimal } from '../../lib/format';
import { ShieldCheck, Truck } from 'lucide-react';

const OrderSummary = () => {
    const cart = useCartStore((state) => state.cart);
    const navigate = useNavigate();

    if (!cart) return null;

    const subtotal = parseDecimal(cart.subtotal);
    const discount = cart.promotion ? parseDecimal(cart.promotion.discount_amount) : 0;
    const total = cart.promotion ? parseDecimal(cart.promotion.total) : subtotal;

    return (
        <div className="flex flex-col gap-6 border border-border bg-surface p-6 lg:w-80 lg:shrink-0">
            <h2 className="text-sm font-black uppercase tracking-widest text-white">Order Summary</h2>

            <PromoCodeForm />

            <div className="flex flex-col gap-3 border-b border-border pb-4">
                <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Subtotal</span>
                    <span className="text-white">{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Discount</span>
                        <span className="text-emerald-400">−{formatPrice(discount)}</span>
                    </div>
                )}
            </div>

            <div className="flex items-baseline justify-between">
                <span className="text-sm font-black uppercase tracking-widest text-white">Total</span>
                <span className="text-2xl font-black text-accent">{formatPrice(total)}</span>
            </div>

            <Button variant="primary" size="lg" fullWidth onClick={() => navigate('/checkout')}>
                Checkout
            </Button>

            <div className="flex flex-col gap-2 border-t border-border pt-2">
                {[
                    { icon: ShieldCheck, label: 'Secure checkout' },
                    { icon: Truck, label: 'Fast delivery' },
                ].map(({ icon: Icon, label }) => (
                    <div key={label} className="flex items-center gap-2">
                        <Icon size={12} className="shrink-0 text-gray-600" />
                        <span className="text-[10px] uppercase tracking-wider text-gray-600">{label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderSummary;

import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../../store/cartStore';
import Button from '../ui/Button';
import { ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { useState } from 'react';

const SHIPPING_THRESHOLD = 200;
const SHIPPING_COST = 12.99;
const TAX_RATE = 0.08;

const OrderSummary = () => {
    const totalPrice = useCartStore((state) => state.totalPrice);
    const clearCart = useCartStore((state) => state.clearCart);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const subtotal  = totalPrice();
    const freeShip  = subtotal >= SHIPPING_THRESHOLD;
    const shipping  = freeShip ? 0 : SHIPPING_COST;
    const tax       = subtotal * TAX_RATE;
    const total     = subtotal + shipping + tax;
    const toFreeShip = SHIPPING_THRESHOLD - subtotal;

    const handleCheckout = () => {
        setLoading(true);
        // Simulates API call — swap for real checkout later
        setTimeout(() => {
            clearCart();
            setLoading(false);
            navigate('/');
        }, 1800);
    };

    return (
        <div className="flex flex-col gap-6 border border-border bg-surface p-6 lg:w-80 lg:shrink-0">

            <h2 className="text-sm font-black uppercase tracking-widest text-white">
                Order Summary
            </h2>

            {/* Free shipping progress */}
            {!freeShip && (
                <div className="flex flex-col gap-2 border border-border bg-bg p-3">
                    <p className="text-[10px] text-gray-400">
                        Add{' '}
                        <span className="font-bold text-accent">
              ${toFreeShip.toFixed(2)}
            </span>{' '}
                        more for free shipping
                    </p>
                    <div className="h-1 bg-border">
                        <div
                            className="h-full bg-accent transition-all duration-500"
                            style={{ width: `${(subtotal / SHIPPING_THRESHOLD) * 100}%` }}
                        />
                    </div>
                </div>
            )}

            {freeShip && (
                <div className="flex items-center gap-2 border border-emerald-800/40
                        bg-emerald-900/10 px-3 py-2">
                    <Truck size={14} className="text-emerald-400 shrink-0" />
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-emerald-400">
                        You've unlocked free shipping!
                    </p>
                </div>
            )}

            {/* Price Breakdown */}
            <div className="flex flex-col gap-3 border-b border-border pb-4">
                <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Subtotal</span>
                    <span className="text-white">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Shipping</span>
                    <span className={freeShip ? 'text-emerald-400 font-semibold' : 'text-white'}>
            {freeShip ? 'FREE' : `$${shipping.toFixed(2)}`}
          </span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Tax (8%)</span>
                    <span className="text-white">${tax.toFixed(2)}</span>
                </div>
            </div>

            {/* Total */}
            <div className="flex items-baseline justify-between">
        <span className="text-sm font-black uppercase tracking-widest text-white">
          Total
        </span>
                <span className="text-2xl font-black text-accent">
          ${total.toFixed(2)}
        </span>
            </div>

            {/* Checkout Button */}
            <Button
                variant="primary"
                size="lg"
                fullWidth
                loading={loading}
                onClick={handleCheckout}
            >
                {loading ? 'Processing...' : 'Checkout'}
            </Button>

            {/* Trust Signals */}
            <div className="flex flex-col gap-2 pt-2 border-t border-border">
                {[
                    { icon: ShieldCheck, label: 'Secure checkout' },
                    { icon: Truck,       label: 'Free returns within 30 days' },
                    { icon: RotateCcw,   label: '2-year warranty included' },
                ].map(({ icon: Icon, label }) => (
                    <div key={label} className="flex items-center gap-2">
                        <Icon size={12} className="text-gray-600 shrink-0" />
                        <span className="text-[10px] uppercase tracking-wider text-gray-600">
              {label}
            </span>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default OrderSummary;

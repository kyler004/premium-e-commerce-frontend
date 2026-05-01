import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import CartItemRow from '../components/cart/CartItemRow';
import OrderSummary from '../components/cart/OrderSumary';
import Button from '../components/ui/Button';

const CartPage = () => {
    const items = useCartStore((s) => s.items);

    // ── Empty State ───────────────────────────────────────────
    if (items.length === 0) {
        return (
            <div className="mx-auto flex min-h-[70vh] max-w-7xl flex-col
                      items-center justify-center gap-6 px-6">
                <div className="flex flex-col items-center gap-4 text-center">
                    <div className="border border-border p-6">
                        <ShoppingBag size={48} className="text-border" />
                    </div>
                    <h2 className="text-2xl font-black uppercase tracking-widest text-white">
                        Your cart is empty
                    </h2>
                    <p className="max-w-sm text-sm text-gray-500">
                        Looks like you haven't added anything yet.
                        Head back to the shop and find something worth having.
                    </p>
                    <Link to="/">
                        <Button variant="primary" size="lg">
                            <ArrowLeft size={16} />
                            Back to Shop
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    // ── Filled State ──────────────────────────────────────────
    return (
        <div className="mx-auto max-w-7xl px-6 py-12">

            {/* Header */}
            <div className="mb-8 flex items-end justify-between border-b border-border pb-6">
                <div>
                    <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-gray-500">
                        Review
                    </p>
                    <h1 className="text-4xl font-black uppercase tracking-tight text-white">
                        Your Cart
                    </h1>
                </div>
                <span className="text-sm text-gray-500">
          {items.length} {items.length === 1 ? 'item' : 'items'}
        </span>
            </div>

            {/* Body: Items + Summary */}
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start">

                {/* Cart Items List */}
                <div className="flex-1">

                    {/* Column headers */}
                    <div className="mb-2 hidden grid-cols-[1fr_auto] text-[10px]
                          font-semibold uppercase tracking-widest
                          text-gray-600 lg:grid">
                        <span>Product</span>
                        <span className="pr-1 text-right">Total</span>
                    </div>

                    {/* Items */}
                    {items.map((item) => (
                        <CartItemRow
                            key={`${item.product.id}-${item.selectedColor?.id}-${item.selectedSize?.id}`}
                            item={item}
                        />
                    ))}

                    {/* Back to shop link */}
                    <Link
                        to="/"
                        className="mt-6 flex w-fit items-center gap-2 text-xs uppercase
                       tracking-widest text-gray-500 hover:text-accent transition-colors"
                    >
                        <ArrowLeft size={12} />
                        Continue Shopping
                    </Link>
                </div>

                {/* Order Summary Sidebar */}
                <OrderSummary />

            </div>
        </div>
    );
};

export default CartPage;
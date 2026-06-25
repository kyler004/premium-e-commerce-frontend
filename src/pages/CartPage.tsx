import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import CartItemRow from '../components/cart/CartItemRow';
import OrderSummary from '../components/cart/OrderSumary';
import Button from '../components/ui/Button';
import PageHeader from '../components/ui/PageHeader';
import PageContainer from '../components/layout/PageContainer';
import { VerifiedRoute } from '../router/guards';

const CartPageContent = () => {
    const cart = useCartStore((s) => s.cart);
    const fetchCart = useCartStore((s) => s.fetchCart);
    const isLoading = useCartStore((s) => s.isLoading);

    useEffect(() => {
        fetchCart();
    }, [fetchCart]);

    if (isLoading && !cart) {
        return <PageContainer className="text-gray-500">Loading cart...</PageContainer>;
    }

    const items = cart?.items ?? [];

    if (items.length === 0) {
        return (
            <div className="mx-auto flex min-h-[70vh] max-w-7xl flex-col items-center justify-center gap-6 px-4 md:px-6">
                <div className="flex flex-col items-center gap-4 text-center">
                    <div className="border border-border p-6">
                        <ShoppingBag size={48} className="text-border" />
                    </div>
                    <h2 className="text-2xl font-black uppercase tracking-widest text-white">Your cart is empty</h2>
                    <p className="max-w-sm text-sm text-gray-500">Head back to the shop and find something worth having.</p>
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

    return (
        <PageContainer>
            <PageHeader
                eyebrow="Review"
                title="Your Cart"
                trailing={<span className="text-sm text-gray-500">{items.length} {items.length === 1 ? 'item' : 'items'}</span>}
            />

            <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
                <div className="flex-1">
                    {items.map((item) => (
                        <CartItemRow key={item.id} item={item} />
                    ))}
                    <Link to="/" className="mt-6 flex w-fit items-center gap-2 text-xs uppercase tracking-widest text-gray-500 hover:text-accent transition-colors">
                        <ArrowLeft size={12} />
                        Continue Shopping
                    </Link>
                </div>
                <OrderSummary />
            </div>
        </PageContainer>
    );
};

const CartPage = () => (
    <VerifiedRoute>
        <CartPageContent />
    </VerifiedRoute>
);

export default CartPage;

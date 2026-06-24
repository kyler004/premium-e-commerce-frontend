import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ShippingForm from '../../components/forms/ShippingForm';
import PageHeader from '../../components/ui/PageHeader';
import { VerifiedRoute } from '../../router/guards';
import { ordersApi } from '../../api/orders';
import { useCartStore } from '../../store/cartStore';
import { useToast } from '../../hooks/useToast';
import { ApiError, parseApiError } from '../../api/client';
import type { ShippingAddress } from '../../types/api';
import OrderSummary from '../../components/cart/OrderSumary';

const CheckoutPageContent = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const fetchCart = useCartStore((s) => s.fetchCart);
    const { showToast } = useToast();

    const handleSubmit = async (shipping: ShippingAddress) => {
        setLoading(true);
        try {
            const order = await ordersApi.checkout(shipping);
            showToast('Order placed successfully.', 'success');
            navigate(`/orders/${order.id}`);
        } catch (err) {
            if (err instanceof ApiError) {
                showToast(parseApiError(err.body), 'error');
                await fetchCart();
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mx-auto max-w-7xl px-6 py-12 fade-in-element">
            <PageHeader eyebrow="Checkout" title="Complete Order" />
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
                <div className="flex-1">
                    <ShippingForm onSubmit={handleSubmit} loading={loading} />
                </div>
                <OrderSummary />
            </div>
        </div>
    );
};

const CheckoutPage = () => (
    <VerifiedRoute>
        <CheckoutPageContent />
    </VerifiedRoute>
);

export default CheckoutPage;

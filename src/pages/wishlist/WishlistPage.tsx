import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowLeft } from 'lucide-react';
import { useWishlistStore } from '../../store/wishlistStore';
import { useCartStore } from '../../store/cartStore';
import PageHeader from '../../components/ui/PageHeader';
import Button from '../../components/ui/Button';
import Select from '../../components/ui/Select';
import { VerifiedRoute } from '../../router/guards';
import { formatPrice } from '../../lib/format';
import { catalogApi } from '../../api/catalog';
import type { Product, Variant } from '../../types/api';
import { formatVariantLabel } from '../../lib/adapters';
import { useToast } from '../../hooks/useToast';
import { ApiError, parseApiError } from '../../api/client';

const MoveToCartModal = ({
    productId,
    onClose,
    onMove,
}: {
    productId: number;
    onClose: () => void;
    onMove: (variantId: number, quantity: number) => void;
}) => {
    const [product, setProduct] = useState<Product | null>(null);
    const [variantId, setVariantId] = useState<number>(0);
    const [quantity] = useState(1);

    useEffect(() => {
        catalogApi.getProduct(productId).then((p) => {
            setProduct(p);
            if (p.variants[0]) setVariantId(p.variants[0].id);
        });
    }, [productId]);

    if (!product) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6">
            <div className="w-full max-w-md border border-border bg-surface p-6">
                <h3 className="mb-4 text-sm font-black uppercase tracking-widest text-white">Move to Cart</h3>
                <Select
                    label="Variant"
                    value={variantId}
                    onChange={(e) => setVariantId(Number(e.target.value))}
                    options={product.variants.map((v: Variant) => ({
                        value: v.id,
                        label: formatVariantLabel(v),
                    }))}
                />
                <div className="mt-4 flex gap-3">
                    <Button onClick={() => onMove(variantId, quantity)}>Add to Cart</Button>
                    <Button variant="secondary" onClick={onClose}>Cancel</Button>
                </div>
            </div>
        </div>
    );
};

const WishlistPageContent = () => {
    const wishlist = useWishlistStore((s) => s.wishlist);
    const fetchWishlist = useWishlistStore((s) => s.fetchWishlist);
    const removeItem = useWishlistStore((s) => s.removeItem);
    const moveToCart = useWishlistStore((s) => s.moveToCart);
    const fetchCart = useCartStore((s) => s.fetchCart);
    const [moveProductId, setMoveProductId] = useState<number | null>(null);
    const [moveItemId, setMoveItemId] = useState<number | null>(null);
    const { showToast } = useToast();

    useEffect(() => {
        fetchWishlist();
    }, [fetchWishlist]);

    const items = wishlist?.items ?? [];

    const handleMove = async (variantId: number, quantity: number) => {
        if (!moveItemId) return;
        try {
            await moveToCart(moveItemId, variantId, quantity);
            await fetchCart();
            showToast('Moved to cart.', 'success');
            setMoveProductId(null);
            setMoveItemId(null);
        } catch (err) {
            if (err instanceof ApiError) showToast(parseApiError(err.body), 'error');
        }
    };

    if (items.length === 0) {
        return (
            <div className="mx-auto flex min-h-[70vh] max-w-7xl flex-col items-center justify-center gap-6 px-6">
                <Heart size={48} className="text-border" />
                <p className="text-sm text-gray-500">Your wishlist is empty.</p>
                <Link to="/"><Button variant="primary"><ArrowLeft size={16} />Back to Shop</Button></Link>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-7xl px-6 py-12 fade-in-element">
            <PageHeader eyebrow="Saved" title="Wishlist" trailing={<span className="text-sm text-gray-500">{items.length} items</span>} />
            <div className="flex flex-col divide-y divide-border border border-border">
                {items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-6">
                        <div>
                            <Link to={`/product/${item.product.id}`} className="text-sm font-black uppercase text-white hover:text-accent">
                                {item.product.name}
                            </Link>
                            <p className="text-sm text-gray-500">{formatPrice(item.product.price)}</p>
                        </div>
                        <div className="flex gap-2">
                            <Button size="sm" variant="secondary" onClick={() => { setMoveProductId(item.product.id); setMoveItemId(item.id); }}>
                                Move to Cart
                            </Button>
                            <Button size="sm" variant="danger" onClick={() => removeItem(item.id)}>Remove</Button>
                        </div>
                    </div>
                ))}
            </div>
            {moveProductId && moveItemId && (
                <MoveToCartModal
                    productId={moveProductId}
                    onClose={() => { setMoveProductId(null); setMoveItemId(null); }}
                    onMove={handleMove}
                />
            )}
        </div>
    );
};

const WishlistPage = () => (
    <VerifiedRoute>
        <WishlistPageContent />
    </VerifiedRoute>
);

export default WishlistPage;

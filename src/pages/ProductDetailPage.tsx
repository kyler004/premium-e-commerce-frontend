import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ShoppingCart, ArrowLeft, Heart } from 'lucide-react';
import { catalogApi } from '../api/catalog';
import { useCartStore } from '../store/cartStore';
import { useWishlistStore } from '../store/wishlistStore';
import { useIsVerified } from '../store/authStore';
import type { Product, Variant } from '../types/api';
import { getProductImages, getAvailableQuantity, isProductInStock } from '../lib/adapters';
import { formatPrice } from '../lib/format';
import ImageGallery from '../components/product/ImageGallery';
import VariantPicker from '../components/product/VariantPicker';
import ReviewSection from '../components/product/ReviewSection';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Rating from '../components/ui/Rating';
import { ProductDetailSkeleton } from '../components/ui/Skeleton';
import { useToast } from '../hooks/useToast';
import { ApiError, parseApiError } from '../api/client';

interface ProductDetailContentProps {
    productId: number;
}

const ProductDetailContent = ({ productId }: ProductDetailContentProps) => {
    const navigate = useNavigate();
    const addItem = useCartStore((s) => s.addItem);
    const isVerified = useIsVerified();
    const addToWishlist = useWishlistStore((s) => s.addItem);
    const removeFromWishlist = useWishlistStore((s) => s.removeItem);
    const isInWishlist = useWishlistStore((s) => s.isInWishlist);
    const wishlistItems = useWishlistStore((s) => s.wishlist?.items ?? []);
    const { showToast } = useToast();

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [variantError, setVariantError] = useState(false);
    const [added, setAdded] = useState(false);

    useEffect(() => {
        let cancelled = false;
        catalogApi.getProduct(productId)
            .then((p) => { if (!cancelled) setProduct(p); })
            .catch(() => { if (!cancelled) setProduct(null); })
            .finally(() => { if (!cancelled) setLoading(false); });
        return () => { cancelled = true; };
    }, [productId]);

    if (loading) return <ProductDetailSkeleton />;

    if (!product) {
        return (
            <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
                <p className="text-gray-500">Product not found.</p>
                <Button variant="secondary" onClick={() => navigate('/')}>Back to Shop</Button>
            </div>
        );
    }

    const images = getProductImages(product);
    const inStock = isProductInStock(product);
    const wishlisted = isInWishlist(product.id);

    const handleAddToCart = async () => {
        if (!isVerified) {
            navigate(`/login?next=/product/${product.id}`);
            return;
        }
        if (!selectedVariant) {
            setVariantError(true);
            return;
        }
        try {
            await addItem(selectedVariant.id, quantity);
            setAdded(true);
            showToast('Added to cart.', 'success');
            setTimeout(() => setAdded(false), 2000);
        } catch (err) {
            if (err instanceof ApiError) showToast(parseApiError(err.body), 'error');
            else showToast('Failed to add to cart.', 'error');
        }
    };

    const handleWishlist = async () => {
        if (!isVerified) {
            navigate(`/login?next=/product/${product.id}`);
            return;
        }
        try {
            if (wishlisted) {
                const item = wishlistItems.find((i) => i.product.id === product.id);
                if (item) await removeFromWishlist(item.id);
                showToast('Removed from wishlist.', 'info');
            } else {
                await addToWishlist(product.id);
                showToast('Added to wishlist.', 'success');
            }
        } catch (err) {
            if (err instanceof ApiError) showToast(parseApiError(err.body), 'error');
        }
    };

    return (
        <div className="mx-auto max-w-7xl px-6 py-12 fade-in-element">
            <Link to="/" className="mb-8 flex w-fit items-center gap-2 text-xs uppercase tracking-widest text-gray-500 hover:text-accent transition-colors">
                <ArrowLeft size={14} />
                Back to Shop
            </Link>

            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                <ImageGallery images={images} productName={product.name} />

                <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-3">
                        <Badge label={`Category ${product.category}`} variant="category" />
                        {!inStock && <Badge label="Out of Stock" variant="outofstock" />}
                    </div>

                    <h1 className="text-4xl font-black uppercase leading-none tracking-tight text-white">
                        {product.name}
                    </h1>

                    {product.average_rating !== null && (
                        <Rating value={product.average_rating} count={product.review_count} size="md" />
                    )}

                    <div className="flex items-baseline gap-3 border-b border-border pb-6">
                        <span className="text-4xl font-black text-white">{formatPrice(product.price)}</span>
                    </div>

                    <p className="text-sm leading-relaxed text-gray-400">{product.description}</p>

                    <VariantPicker
                        variants={product.variants}
                        selected={selectedVariant}
                        onSelect={(v) => { setSelectedVariant(v); setVariantError(false); }}
                        error={variantError}
                    />

                    {selectedVariant && (
                        <p className="text-xs text-gray-500">
                            {getAvailableQuantity(selectedVariant)} in stock
                        </p>
                    )}

                    <div className="flex gap-3 pt-2">
                        <div className="flex items-center border border-border">
                            <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="px-3 py-3 text-gray-400 hover:text-white">−</button>
                            <span className="w-10 text-center text-sm font-bold text-white">{quantity}</span>
                            <button onClick={() => setQuantity((q) => q + 1)} className="px-3 py-3 text-gray-400 hover:text-white">+</button>
                        </div>

                        <Button variant={added ? 'secondary' : 'primary'} size="lg" fullWidth disabled={!inStock} onClick={handleAddToCart}>
                            <ShoppingCart size={18} />
                            {!inStock ? 'Out of Stock' : added ? '✓ Added to Cart' : 'Add to Cart'}
                        </Button>

                        <button
                            onClick={handleWishlist}
                            className={`border px-4 transition-colors ${wishlisted ? 'border-red-500 text-red-400' : 'border-border text-gray-500 hover:border-red-500 hover:text-red-400'}`}
                        >
                            <Heart size={18} fill={wishlisted ? 'currentColor' : 'none'} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="mt-16">
                <ReviewSection
                    productId={product.id}
                    averageRating={product.average_rating}
                    reviewCount={product.review_count}
                />
            </div>
        </div>
    );
};

const ProductDetailPage = () => {
    const { id } = useParams<{ id: string }>();

    if (!id) {
        return (
            <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
                <p className="text-gray-500">Product not found.</p>
            </div>
        );
    }

    return <ProductDetailContent key={id} productId={Number(id)} />;
};

export default ProductDetailPage;

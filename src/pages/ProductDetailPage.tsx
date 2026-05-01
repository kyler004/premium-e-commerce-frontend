import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ShoppingCart, ArrowLeft, Heart } from 'lucide-react';
import { getProductById } from '../data/product';
import { useCartStore } from '../store/cartStore';
import type { Variant } from '../types';
import ImageGallery from '../components/product/ImageGallery';
import VariantSelector from '../components/product/VariantSelector';
import ReviewSection from '../components/product/ReviewSection';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Rating from '../components/ui/Rating';

const ProductDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const addItem = useCartStore((s) => s.addItem);

    // Local UI state
    const [selectedColor, setSelectedColor] = useState<Variant | null>(null);
    const [selectedSize,  setSelectedSize]  = useState<Variant | null>(null);
    const [quantity,      setQuantity]      = useState(1);
    const [errors,        setErrors]        = useState({ color: false, size: false });
    const [added,         setAdded]         = useState(false);

    // Guard: product not found
    const product = getProductById(id ?? '');
    if (!product) {
        return (
            <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
                <p className="text-gray-500">Product not found.</p>
                <Button variant="secondary" onClick={() => navigate('/')}>
                    Back to Shop
                </Button>
            </div>
        );
    }

    const hasColors = product.variants.colors.length > 0;
    const hasSizes  = product.variants.sizes.length > 0;

    const handleAddToCart = () => {
        // Validate required selections
        const newErrors = {
            color: hasColors && !selectedColor,
            size:  hasSizes  && !selectedSize,
        };
        setErrors(newErrors);
        if (newErrors.color || newErrors.size) return;

        addItem(product, quantity, selectedColor ?? undefined, selectedSize ?? undefined);

        // Success feedback
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <div className="mx-auto max-w-7xl px-6 py-12">

            {/* Breadcrumb */}
            <Link
                to="/"
                className="mb-8 flex items-center gap-2 text-xs uppercase tracking-widest
                   text-gray-500 hover:text-accent transition-colors w-fit"
            >
                <ArrowLeft size={14} />
                Back to Shop
            </Link>

            {/* Main layout: Gallery | Info */}
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">

                {/* LEFT — Image Gallery */}
                <ImageGallery images={product.images} productName={product.name} />

                {/* RIGHT — Product Info */}
                <div className="flex flex-col gap-6">

                    {/* Brand + Badges */}
                    <div className="flex items-center gap-3">
            <span className="text-xs font-black uppercase tracking-widest text-gray-500">
              {product.brand}
            </span>
                        <Badge label={product.category} variant="category" />
                        {product.discount && (
                            <Badge label={`-${product.discount}%`} variant="discount" />
                        )}
                        {!product.inStock && (
                            <Badge label="Out of Stock" variant="outofstock" />
                        )}
                    </div>

                    {/* Product Name */}
                    <h1 className="text-4xl font-black uppercase leading-none tracking-tight text-white">
                        {product.name}
                    </h1>

                    {/* Rating */}
                    <Rating value={product.rating} count={product.reviewCount} size="md" />

                    {/* Price */}
                    <div className="flex items-baseline gap-3 border-b border-border pb-6">
                        <span className="text-4xl font-black text-white">${product.price}</span>
                        {product.originalPrice && (
                            <span className="text-lg text-gray-600 line-through">
                ${product.originalPrice}
              </span>
                        )}
                        {product.discount && (
                            <span className="text-sm font-bold text-accent">
                Save ${product.originalPrice! - product.price}
              </span>
                        )}
                    </div>

                    {/* Description */}
                    <p className="text-sm leading-relaxed text-gray-400">
                        {product.description}
                    </p>

                    {/* Color Selector */}
                    {hasColors && (
                        <VariantSelector
                            label="Color"
                            variants={product.variants.colors}
                            selected={selectedColor}
                            onSelect={(v) => {
                                setSelectedColor(v);
                                setErrors((e) => ({ ...e, color: false }));
                            }}
                            error={errors.color}
                        />
                    )}

                    {/* Size Selector */}
                    {hasSizes && (
                        <VariantSelector
                            label="Size"
                            variants={product.variants.sizes}
                            selected={selectedSize}
                            onSelect={(v) => {
                                setSelectedSize(v);
                                setErrors((e) => ({ ...e, size: false }));
                            }}
                            error={errors.size}
                        />
                    )}

                    {/* Quantity + Add to Cart */}
                    <div className="flex gap-3 pt-2">

                        {/* Quantity Stepper */}
                        <div className="flex items-center border border-border">
                            <button
                                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                                className="px-3 py-3 text-gray-400 hover:text-white transition-colors"
                            >
                                −
                            </button>
                            <span className="w-10 text-center text-sm font-bold text-white">
                {quantity}
              </span>
                            <button
                                onClick={() => setQuantity((q) => q + 1)}
                                className="px-3 py-3 text-gray-400 hover:text-white transition-colors"
                            >
                                +
                            </button>
                        </div>

                        {/* Add to Cart */}
                        <Button
                            variant={added ? 'secondary' : 'primary'}
                            size="lg"
                            fullWidth
                            disabled={!product.inStock}
                            onClick={handleAddToCart}
                        >
                            <ShoppingCart size={18} />
                            {!product.inStock
                                ? 'Out of Stock'
                                : added
                                    ? '✓ Added to Cart'
                                    : 'Add to Cart'}
                        </Button>

                        {/* Wishlist */}
                        <button className="border border-border px-4 text-gray-500
                               hover:border-red-500 hover:text-red-400 transition-colors">
                            <Heart size={18} />
                        </button>

                    </div>

                    {/* Tags */}
                    {product.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-2">
                            {product.tags.map((tag) => (
                                <Badge key={tag} label={`# ${tag}`} variant="tag" />
                            ))}
                        </div>
                    )}

                </div>
            </div>

            {/* Reviews Section */}
            <div className="mt-16">
                <ReviewSection
                    reviews={product.reviews}
                    averageRating={product.rating}
                    reviewCount={product.reviewCount}
                />
            </div>

        </div>
    );
};

export default ProductDetailPage;
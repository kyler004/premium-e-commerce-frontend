import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import type { Product } from '../../types';
import { useCartStore } from '../../store/cartStore';
import Badge from '../ui/Badge';
import Rating from '../ui/Rating';
import Button from '../ui/Button';

interface ProductCardProps {
    product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
    const addItem = useCartStore((state) => state.addItem);

    const handleQuickAdd = (e: React.MouseEvent) => {
        e.preventDefault();   // Don't navigate — we're inside a <Link>
        addItem(product, 1);
    };

    return (
        <Link
            to={`/product/${product.id}`}
            className="group relative flex flex-col border border-[#1f1f1f] bg-[#111111]
                 transition-all duration-300 hover:border-[#e8ff00]/30"
        >
            {/* Image Container */}
            <div className="relative overflow-hidden bg-[#0d0d0d] aspect-square">
                <img
                    src={product.images[0]}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-500
                     group-hover:scale-105"
                />

                {/* Badges — top left */}
                <div className="absolute left-3 top-3 flex flex-col gap-1">
                    {product.discount && (
                        <Badge label={`-${product.discount}%`} variant="discount" />
                    )}
                    {!product.inStock && (
                        <Badge label="Out of Stock" variant="outofstock" />
                    )}
                </div>

                {/* Quick Add — appears on hover */}
                <div className="absolute bottom-0 left-0 right-0 translate-y-full
                        transition-transform duration-300 group-hover:translate-y-0">
                    <Button
                        variant="primary"
                        size="sm"
                        fullWidth
                        disabled={!product.inStock}
                        onClick={handleQuickAdd}
                        className="rounded-none"
                    >
                        <ShoppingCart size={14} />
                        Quick Add
                    </Button>
                </div>
            </div>

            {/* Info */}
            <div className="flex flex-1 flex-col gap-2 p-4">
                {/* Brand */}
                <span className="text-[10px] font-semibold tracking-widest text-gray-500 uppercase">
          {product.brand}
        </span>

                {/* Name */}
                <h3 className="text-sm font-bold text-white leading-snug group-hover:text-[#e8ff00]
                       transition-colors line-clamp-2">
                    {product.name}
                </h3>

                {/* Rating */}
                <Rating value={product.rating} count={product.reviewCount} />

                {/* Price row */}
                <div className="mt-auto flex items-baseline gap-2 pt-2">
                    <span className="text-lg font-black text-white">${product.price}</span>
                    {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
              ${product.originalPrice}
            </span>
                    )}
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
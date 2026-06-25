import { Link } from 'react-router-dom';
import type { Product } from '../../types/api';
import { getProductImages, isProductInStock } from '../../lib/adapters';
import { formatPrice } from '../../lib/format';
import Badge from '../ui/Badge';
import Rating from '../ui/Rating';

interface ProductCardProps {
    product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
    const images = getProductImages(product);
    const inStock = isProductInStock(product);

    return (
        <Link
            to={`/product/${product.id}`}
            className="group relative flex flex-col border border-border bg-surface
                 transition-all duration-300 hover:border-accent/30"
        >
            <div className="relative aspect-square overflow-hidden bg-bg">
                <img
                    src={images[0]}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {!inStock && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                        <Badge label="Out of Stock" variant="outofstock" />
                    </div>
                )}
            </div>

            <div className="flex flex-col gap-2 p-5">
                <h3 className="text-sm font-black uppercase tracking-wide text-white group-hover:text-accent transition-colors">
                    {product.name}
                </h3>
                {product.average_rating !== null ? (
                    <Rating value={product.average_rating} count={product.review_count} size="sm" />
                ) : (
                    <span className="min-h-[14px] text-xs text-gray-600">No reviews</span>
                )}
                <span className="text-lg font-black text-white">{formatPrice(product.price)}</span>
            </div>
        </Link>
    );
};

export default ProductCard;

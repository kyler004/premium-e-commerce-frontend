import { Trash2 } from 'lucide-react';
import type { CartItem } from '../../types';
import { useCartStore } from '../../store/cartStore';
import { Link } from 'react-router-dom';

interface CartItemRowProps {
    item: CartItem;
}

const CartItemRow = ({ item }: CartItemRowProps) => {
    const updateQuantity = useCartStore((state) => state.updateQuantity);
    const removeItem = useCartStore((state) => state.removeItem);
    const { product, quantity, selectedColor, selectedSize } = item;

    const handleRemove = () =>
        removeItem(product.id, selectedColor?.id, selectedSize?.id);

    const handleQty = (qty: number) =>
        updateQuantity(product.id, qty, selectedColor?.id, selectedSize?.id);

    return (
        <div className="flex gap-5 border-b border-border py-6">

            {/* Product Image */}
            <Link
                to={`/product/${product.id}`}
                className="h-28 w-28 shrink-0 overflow-hidden bg-[#0d0d0d]
                   border border-border hover:border-accent/30 transition-colors"
            >
                <img
                    src={product.images[0]}
                    alt={product.name}
                    className="h-full w-full object-cover"
                />
            </Link>

            {/* Info */}
            <div className="flex flex-1 flex-col justify-between">

                {/* Top row: name + remove */}
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-500">
                            {product.brand}
                        </p>
                        <Link
                            to={`/product/${product.id}`}
                            className="text-sm font-bold text-white hover:text-accent transition-colors"
                        >
                            {product.name}
                        </Link>

                        {/* Selected variants */}
                        <div className="mt-1.5 flex items-center gap-3">
                            {selectedColor && (
                                <div className="flex items-center gap-1.5">
                  <span
                      className="h-3 w-3 rounded-full border border-border"
                      style={{ backgroundColor: selectedColor.colorHex }}
                  />
                                    <span className="text-[10px] uppercase tracking-wider text-gray-500">
                    {selectedColor.label}
                  </span>
                                </div>
                            )}
                            {selectedSize && (
                                <span className="text-[10px] uppercase tracking-wider text-gray-500">
                  Size {selectedSize.label}
                </span>
                            )}
                        </div>
                    </div>

                    {/* Remove button */}
                    <button
                        onClick={handleRemove}
                        className="text-gray-600 hover:text-red-400 transition-colors p-1"
                    >
                        <Trash2 size={15} />
                    </button>
                </div>

                {/* Bottom row: qty stepper + line total */}
                <div className="flex items-center justify-between">

                    {/* Quantity Stepper */}
                    <div className="flex items-center border border-border">
                        <button
                            onClick={() => handleQty(quantity - 1)}
                            className="px-3 py-2 text-gray-400 hover:text-white
                         hover:bg-border transition-colors text-sm"
                        >
                            −
                        </button>
                        <span className="w-8 text-center text-sm font-bold text-white">
              {quantity}
            </span>
                        <button
                            onClick={() => handleQty(quantity + 1)}
                            className="px-3 py-2 text-gray-400 hover:text-white
                         hover:bg-border transition-colors text-sm"
                        >
                            +
                        </button>
                    </div>

                    {/* Line price */}
                    <div className="text-right">
                        <p className="text-base font-black text-white">
                            ${(product.price * quantity).toFixed(2)}
                        </p>
                        {quantity > 1 && (
                            <p className="text-[10px] text-gray-600">
                                ${product.price} × {quantity}
                            </p>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CartItemRow;

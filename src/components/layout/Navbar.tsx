import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';

const Navbar = () => {
    const location = useLocation();
    const totalItems = useCartStore((state) => state.totalItems());

    const navLinks = [
        { label: 'Shop', path: '/' },
        { label: 'Cart', path: '/cart' },
    ];

    return (
        <nav className="sticky top-0 z-50 border-b border-border bg-bg/90 backdrop-blur-md">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

                {/* Logo */}
                <Link to="/" className="text-xl font-black tracking-widest text-accent">
                    VOIDSTEP
                </Link>

                {/* Nav Links */}
                <div className="flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`text-sm font-medium tracking-wider transition-colors ${
                                location.pathname === link.path
                                    ? 'text-[#e8ff00]'
                                    : 'text-gray-400 hover:text-white'
                            }`}
                        >
                            {link.label}
                        </Link>
                    ))}

                    {/* Cart Icon with badge */}
                    <Link to="/cart" className="relative">
                        <ShoppingCart
                            size={22}
                            className="text-gray-400 hover:text-white transition-colors"
                        />
                        {totalItems > 0 && (
                            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#e8ff00] text-[10px] font-black text-black">
                {totalItems}
              </span>
                        )}
                    </Link>
                </div>

            </div>
        </nav>
    );
};

export default Navbar;
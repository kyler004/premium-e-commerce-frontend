import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, User, LogOut } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import { useAuthStore, useIsStaff, useIsVerified } from '../../store/authStore';
import { useWishlistStore } from '../../store/wishlistStore';

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const totalItems = useCartStore((state) => state.totalItems());
    const fetchCart = useCartStore((state) => state.fetchCart);
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);
    const isVerified = useIsVerified();
    const isStaff = useIsStaff();
    const fetchWishlist = useWishlistStore((s) => s.fetchWishlist);
    const wishlistCount = useWishlistStore((s) => s.wishlist?.item_count ?? 0);

    useEffect(() => {
        if (isVerified) {
            fetchCart();
            fetchWishlist();
        }
    }, [isVerified, fetchCart, fetchWishlist]);

    const navLinks = [
        { label: 'Shop', path: '/' },
        ...(isVerified ? [
            { label: 'Cart', path: '/cart' },
            { label: 'Wishlist', path: '/wishlist' },
            { label: 'Orders', path: '/orders' },
        ] : []),
        ...(isStaff ? [{ label: 'Admin', path: '/admin/promotions' }] : []),
    ];

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="sticky top-0 z-50 border-b border-border bg-bg/90 backdrop-blur-md">
            <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4 md:px-6">
                <Link to="/" className="shrink-0 text-xl font-black tracking-widest text-accent">
                    VOIDSTEP
                </Link>

                <div className="flex min-w-0 flex-1 items-center justify-end gap-3 md:gap-4">
                    <div className="scrollbar-hide -mx-4 flex min-w-0 flex-1 items-center gap-4 overflow-x-auto px-4 md:mx-0 md:overflow-visible">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`shrink-0 whitespace-nowrap text-sm font-medium tracking-wider transition-colors ${
                                    location.pathname === link.path || location.pathname.startsWith(link.path + '/')
                                        ? 'text-accent'
                                        : 'text-gray-400 hover:text-white'
                                }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    <div className="flex shrink-0 items-center gap-3">
                        {isVerified && (
                            <Link to="/wishlist" className="relative text-gray-400 hover:text-white">
                                <Heart size={20} />
                                {wishlistCount > 0 && (
                                    <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[9px] font-black text-black">
                                        {wishlistCount}
                                    </span>
                                )}
                            </Link>
                        )}

                        {isVerified && (
                            <Link to="/cart" className="relative">
                                <ShoppingCart size={22} className="text-gray-400 transition-colors hover:text-white" />
                                {totalItems > 0 && (
                                    <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-black text-black">
                                        {totalItems}
                                    </span>
                                )}
                            </Link>
                        )}

                        {user ? (
                            <div className="flex items-center gap-3">
                                <Link
                                    to="/account"
                                    className={`transition-colors ${location.pathname.startsWith('/account') ? 'text-accent' : 'text-gray-400 hover:text-white'}`}
                                >
                                    <User size={20} />
                                </Link>
                                <button onClick={handleLogout} className="text-gray-400 hover:text-white" aria-label="Logout">
                                    <LogOut size={20} />
                                </button>
                            </div>
                        ) : (
                            <div className="flex shrink-0 items-center gap-3 text-xs uppercase tracking-widest">
                                <Link to="/login" className="text-gray-400 hover:text-accent">Login</Link>
                                <Link to="/register" className="text-accent hover:text-white">Register</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

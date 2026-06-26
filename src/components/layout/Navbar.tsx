import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, User, LogOut } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import { useAuthStore, useIsStaff, useIsVerified } from '../../store/authStore';
import { useWishlistStore } from '../../store/wishlistStore';

const isLinkActive = (pathname: string, path: string) =>
    path === '/'
        ? pathname === '/'
        : pathname === path || pathname.startsWith(`${path}/`);

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
        ...(isVerified ? [{ label: 'Orders', path: '/orders' }] : []),
        ...(isStaff ? [{ label: 'Admin', path: '/admin/promotions' }] : []),
    ];

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const linkClass = (path: string) =>
        `shrink-0 whitespace-nowrap text-sm font-medium tracking-wider transition-colors ${
            isLinkActive(location.pathname, path)
                ? 'text-accent'
                : 'text-gray-400 hover:text-white'
        }`;

    const iconActions = (
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            {isVerified && (
                <>
                    <Link
                        to="/wishlist"
                        aria-label="Wishlist"
                        className={`relative p-1 transition-colors ${
                            isLinkActive(location.pathname, '/wishlist')
                                ? 'text-accent'
                                : 'text-gray-400 hover:text-white'
                        }`}
                    >
                        <Heart size={20} />
                        {wishlistCount > 0 && (
                            <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[9px] font-black text-black">
                                {wishlistCount}
                            </span>
                        )}
                    </Link>
                    <Link
                        to="/cart"
                        aria-label="Cart"
                        className={`relative p-1 transition-colors ${
                            isLinkActive(location.pathname, '/cart')
                                ? 'text-accent'
                                : 'text-gray-400 hover:text-white'
                        }`}
                    >
                        <ShoppingCart size={22} />
                        {totalItems > 0 && (
                            <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-black text-black">
                                {totalItems}
                            </span>
                        )}
                    </Link>
                </>
            )}

            {user ? (
                <>
                    <Link
                        to="/account"
                        aria-label="Account"
                        className={`p-1 transition-colors ${
                            location.pathname.startsWith('/account')
                                ? 'text-accent'
                                : 'text-gray-400 hover:text-white'
                        }`}
                    >
                        <User size={20} />
                    </Link>
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="p-1 text-gray-400 hover:text-white"
                        aria-label="Logout"
                    >
                        <LogOut size={20} />
                    </button>
                </>
            ) : (
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest sm:gap-3 sm:text-xs">
                    <Link to="/login" className="text-gray-400 hover:text-accent">Login</Link>
                    <Link to="/register" className="text-accent hover:text-white">Register</Link>
                </div>
            )}
        </div>
    );

    return (
        <nav className="sticky top-0 z-50 border-b border-border bg-bg/90 backdrop-blur-md">
            <div className="mx-auto max-w-7xl px-4 md:px-6">
                {/* Primary bar: logo + actions */}
                <div className="flex items-center justify-between gap-4 py-3 md:py-4">
                    <Link
                        to="/"
                        className="shrink-0 text-lg font-black tracking-widest text-accent sm:text-xl"
                    >
                        VOIDSTEP
                    </Link>

                    {/* Desktop: inline nav links */}
                    <div className="hidden min-w-0 flex-1 items-center justify-center gap-6 md:flex">
                        {navLinks.map((link) => (
                            <Link key={link.path} to={link.path} className={linkClass(link.path)}>
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {iconActions}
                </div>

                {/* Mobile: scrollable nav row */}
                <div className="relative border-t border-border md:hidden">
                    <div
                        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-bg/95 to-transparent"
                        aria-hidden
                    />
                    <div
                        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-bg/95 to-transparent"
                        aria-hidden
                    />
                    <div className="scrollbar-hide flex items-center gap-5 overflow-x-auto px-2 py-2.5">
                        {navLinks.map((link) => (
                            <Link key={link.path} to={link.path} className={linkClass(link.path)}>
                                {link.label}
                            </Link>
                        ))}
                        {isVerified && (
                            <Link to="/account" className={linkClass('/account')}>
                                Account
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

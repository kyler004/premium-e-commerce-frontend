import { NavLink, Outlet } from 'react-router-dom';

const accountLinks = [
    { label: 'Dashboard', path: '/account', end: true },
    { label: 'Receipts', path: '/account/receipts', end: false },
    { label: 'Profile', path: '/account/profile', end: false },
];

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `shrink-0 px-3 py-2 text-xs uppercase tracking-wider transition-colors ${
        isActive ? 'border-accent bg-accent/5 text-accent' : 'text-gray-400 hover:text-white'
    }`;

const AccountLayout = () => (
    <div className="mx-auto min-h-[80vh] max-w-7xl px-4 py-8 md:px-6 md:py-12">
        <nav className="scrollbar-hide mb-6 flex gap-1 overflow-x-auto border border-border bg-surface p-2 lg:hidden">
            {accountLinks.map((link) => (
                <NavLink key={link.path} to={link.path} end={link.end} className={navLinkClass}>
                    {link.label}
                </NavLink>
            ))}
            <NavLink to="/orders" className="shrink-0 px-3 py-2 text-xs uppercase tracking-wider text-gray-400 transition-colors hover:text-white">
                Orders
            </NavLink>
        </nav>

        <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
            <aside className="hidden w-56 shrink-0 border border-border bg-surface p-4 lg:block">
                <p className="mb-4 text-[10px] font-semibold uppercase tracking-widest text-gray-500">Account</p>
                <nav className="flex flex-col gap-1">
                    {accountLinks.map((link) => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            end={link.end}
                            className={({ isActive }) =>
                                `px-3 py-2 text-xs uppercase tracking-wider transition-colors ${
                                    isActive ? 'border-l-2 border-accent bg-accent/5 text-accent' : 'text-gray-400 hover:text-white'
                                }`
                            }
                        >
                            {link.label}
                        </NavLink>
                    ))}
                    <NavLink
                        to="/orders"
                        className="px-3 py-2 text-xs uppercase tracking-wider text-gray-400 transition-colors hover:text-white"
                    >
                        Orders
                    </NavLink>
                </nav>
            </aside>
            <div className="min-w-0 flex-1">
                <Outlet />
            </div>
        </div>
    </div>
);

export default AccountLayout;

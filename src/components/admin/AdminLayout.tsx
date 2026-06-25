import { NavLink, Outlet } from 'react-router-dom';

const adminLinks = [
    { label: 'Promotions', path: '/admin/promotions' },
    { label: 'Categories', path: '/admin/categories' },
    { label: 'Products', path: '/admin/products' },
    { label: 'Variants', path: '/admin/variants' },
    { label: 'Inventory', path: '/admin/inventories' },
];

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `shrink-0 px-3 py-2 text-xs uppercase tracking-wider transition-colors ${
        isActive ? 'border-accent bg-accent/5 text-accent' : 'text-gray-400 hover:text-white'
    }`;

const AdminLayout = () => (
    <div className="mx-auto min-h-[80vh] max-w-7xl px-4 py-8 md:px-6 md:py-12">
        <nav className="scrollbar-hide mb-6 flex gap-1 overflow-x-auto border border-border bg-surface p-2 lg:hidden">
            {adminLinks.map((link) => (
                <NavLink key={link.path} to={link.path} className={navLinkClass}>
                    {link.label}
                </NavLink>
            ))}
        </nav>

        <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
            <aside className="hidden w-56 shrink-0 border border-border bg-surface p-4 lg:block">
                <p className="mb-4 text-[10px] font-semibold uppercase tracking-widest text-gray-500">Admin</p>
                <nav className="flex flex-col gap-1">
                    {adminLinks.map((link) => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            className={({ isActive }) =>
                                `px-3 py-2 text-xs uppercase tracking-wider transition-colors ${
                                    isActive ? 'border-l-2 border-accent bg-accent/5 text-accent' : 'text-gray-400 hover:text-white'
                                }`
                            }
                        >
                            {link.label}
                        </NavLink>
                    ))}
                </nav>
            </aside>
            <div className="min-w-0 flex-1">
                <Outlet />
            </div>
        </div>
    </div>
);

export default AdminLayout;

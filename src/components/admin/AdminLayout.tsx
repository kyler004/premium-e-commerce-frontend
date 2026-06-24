import { NavLink, Outlet } from 'react-router-dom';

const adminLinks = [
    { label: 'Promotions', path: '/admin/promotions' },
    { label: 'Categories', path: '/admin/categories' },
    { label: 'Products', path: '/admin/products' },
    { label: 'Variants', path: '/admin/variants' },
    { label: 'Inventory', path: '/admin/inventories' },
];

const AdminLayout = () => (
    <div className="mx-auto flex min-h-[80vh] max-w-7xl gap-8 px-6 py-12">
        <aside className="w-56 shrink-0 border border-border bg-surface p-4">
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
        <div className="flex-1">
            <Outlet />
        </div>
    </div>
);

export default AdminLayout;

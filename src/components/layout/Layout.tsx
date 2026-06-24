import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { useAuthStore } from '../../store/authStore';

const Layout = () => {
    const initialize = useAuthStore((s) => s.initialize);
    const isInitialized = useAuthStore((s) => s.isInitialized);

    useEffect(() => {
        initialize();
    }, [initialize]);

    if (!isInitialized) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-bg text-gray-500">
                Loading...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-bg text-white">
            <Navbar />
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;

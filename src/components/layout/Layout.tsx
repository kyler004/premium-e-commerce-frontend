import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white">
            <Navbar />
            <main>
                <Outlet />   {/* Pages render here */}
            </main>
        </div>
    );
};

export default Layout;
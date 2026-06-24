import { useEffect } from 'react';
import AuthCard from '../../components/auth/AuthCard';
import Button from '../../components/ui/Button';
import { useAuthStore } from '../../store/authStore';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../../lib/format';

const AccountPage = () => {
    const user = useAuthStore((s) => s.user);
    const logout = useAuthStore((s) => s.logout);
    const fetchMe = useAuthStore((s) => s.fetchMe);
    const navigate = useNavigate();

    useEffect(() => {
        fetchMe().catch(() => {});
    }, [fetchMe]);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <AuthCard title="Account" subtitle="Your profile details.">
            {user && (
                <div className="flex flex-col gap-4">
                    <div className="border border-border bg-bg p-4">
                        <p className="text-[10px] uppercase tracking-widest text-gray-500">Email</p>
                        <p className="mt-1 text-sm text-white">{user.email}</p>
                    </div>
                    <div className="border border-border bg-bg p-4">
                        <p className="text-[10px] uppercase tracking-widest text-gray-500">Verified</p>
                        <p className="mt-1 text-sm text-white">
                            {user.email_verified_at ? formatDate(user.email_verified_at) : 'Not verified'}
                        </p>
                    </div>
                    {user.is_staff && (
                        <Button variant="secondary" onClick={() => navigate('/admin/promotions')}>
                            Admin Dashboard
                        </Button>
                    )}
                    <Button variant="danger" onClick={handleLogout}>Sign Out</Button>
                </div>
            )}
        </AuthCard>
    );
};

export default AccountPage;

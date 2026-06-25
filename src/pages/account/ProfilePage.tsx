import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import PageHeader from '../../components/ui/PageHeader';
import { useAuthStore } from '../../store/authStore';
import { formatDate } from '../../lib/format';

const ProfilePage = () => {
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
        <div className="fade-in-element">
            <PageHeader eyebrow="Account" title="Profile" />

            {user && (
                <div className="flex max-w-lg flex-col gap-4">
                    <div className="border border-border bg-surface p-5">
                        <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-500">Email</p>
                        <p className="mt-2 text-sm text-white">{user.email}</p>
                    </div>
                    <div className="border border-border bg-surface p-5">
                        <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-500">Verified</p>
                        <p className="mt-2 text-sm text-white">
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
        </div>
    );
};

export default ProfilePage;

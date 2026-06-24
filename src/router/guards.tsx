import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore, useIsStaff, useIsVerified } from '../store/authStore';

interface GuardProps {
    children: React.ReactNode;
}

export const VerifiedRoute = ({ children }: GuardProps) => {
    const user = useAuthStore((s) => s.user);
    const isVerified = useIsVerified();
    const location = useLocation();

    if (!user) {
        return <Navigate to={`/login?next=${encodeURIComponent(location.pathname)}`} replace />;
    }

    if (!isVerified) {
        return <Navigate to="/verify-email" replace state={{ email: user.email }} />;
    }

    return <>{children}</>;
};

export const AuthenticatedRoute = ({ children }: GuardProps) => {
    const user = useAuthStore((s) => s.user);
    const location = useLocation();

    if (!user) {
        return <Navigate to={`/login?next=${encodeURIComponent(location.pathname)}`} replace />;
    }

    return <>{children}</>;
};

export const StaffRoute = ({ children }: GuardProps) => {
    const user = useAuthStore((s) => s.user);
    const isStaff = useIsStaff();
    const location = useLocation();

    if (!user) {
        return <Navigate to={`/login?next=${encodeURIComponent(location.pathname)}`} replace />;
    }

    if (!isStaff) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};

export const GuestRoute = ({ children }: GuardProps) => {
    const user = useAuthStore((s) => s.user);
    const isVerified = useIsVerified();

    if (user && isVerified) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};

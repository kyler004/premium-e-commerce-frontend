import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AuthCard from '../../components/auth/AuthCard';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { useToast } from '../../hooks/useToast';
import { handleAuthError } from '../../lib/authErrors';
import { clearPendingVerifyEmail, getPendingVerifyEmail } from '../../lib/authSession';
import { useAuthStore } from '../../store/authStore';

const VerifyEmailPage = () => {
    const location = useLocation();
    const routeEmail = (location.state as { email?: string })?.email ?? '';
    const [email, setEmail] = useState(() => getPendingVerifyEmail(routeEmail));
    const [otp, setOtp] = useState('');
    const [errors, setErrors] = useState<Record<string, string>>({});
    const verifyEmail = useAuthStore((s) => s.verifyEmail);
    const resendOtp = useAuthStore((s) => s.resendOtp);
    const isLoading = useAuthStore((s) => s.isLoading);
    const { showToast } = useToast();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});
        try {
            await verifyEmail(email, otp);
            clearPendingVerifyEmail();
            showToast('Email verified! You can now sign in.', 'success');
            navigate('/login');
        } catch (err) {
            handleAuthError(err, showToast, setErrors);
        }
    };

    const handleResend = async () => {
        try {
            await resendOtp(email, 'signup');
            showToast('Verification code resent.', 'success');
        } catch (err) {
            handleAuthError(err, showToast);
        }
    };

    return (
        <AuthCard title="Verify Email" subtitle="Enter the 6-digit code sent to your email.">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <Input label="Verification Code" value={otp} onChange={(e) => setOtp(e.target.value)} error={errors.otp} required />
                <Button type="submit" fullWidth loading={isLoading}>Verify Email</Button>
            </form>
            <button onClick={handleResend} className="mt-4 text-xs text-gray-500 hover:text-accent">
                Resend code
            </button>
            <p className="mt-4 text-xs text-gray-500">
                <Link to="/login" className="hover:text-accent">Back to login</Link>
            </p>
        </AuthCard>
    );
};

export default VerifyEmailPage;

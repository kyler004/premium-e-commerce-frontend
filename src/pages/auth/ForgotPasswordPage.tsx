import { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthCard from '../../components/auth/AuthCard';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { useToast } from '../../hooks/useToast';
import { handleAuthError } from '../../lib/authErrors';
import { setPendingResetEmail } from '../../lib/authSession';
import { useAuthStore } from '../../store/authStore';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [sent, setSent] = useState(false);
    const forgotPassword = useAuthStore((s) => s.forgotPassword);
    const isLoading = useAuthStore((s) => s.isLoading);
    const { showToast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await forgotPassword(email);
            setPendingResetEmail(email);
            setSent(true);
            showToast('If an account exists, a code has been sent.', 'success');
        } catch (err) {
            handleAuthError(err, showToast);
        }
    };

    return (
        <AuthCard title="Forgot Password" subtitle="We'll send a reset code to your email.">
            {sent ? (
                <div className="flex flex-col gap-4">
                    <p className="text-sm text-gray-400">Check your email for a reset code, then continue to reset your password.</p>
                    <Link to="/reset-password" state={{ email }}>
                        <Button fullWidth>Reset Password</Button>
                    </Link>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <Button type="submit" fullWidth loading={isLoading}>Send Reset Code</Button>
                </form>
            )}
            <p className="mt-6 text-xs text-gray-500">
                <Link to="/login" className="hover:text-accent">Back to login</Link>
            </p>
        </AuthCard>
    );
};

export default ForgotPasswordPage;

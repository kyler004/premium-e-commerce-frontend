import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AuthCard from '../../components/auth/AuthCard';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { useToast } from '../../hooks/useToast';
import { ApiError, getFieldErrors, parseApiError } from '../../api/client';
import { useAuthStore } from '../../store/authStore';

const ResetPasswordPage = () => {
    const location = useLocation();
    const initialEmail = (location.state as { email?: string })?.email ?? '';
    const [email, setEmail] = useState(initialEmail);
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [errors, setErrors] = useState<Record<string, string>>({});
    const resetPassword = useAuthStore((s) => s.resetPassword);
    const isLoading = useAuthStore((s) => s.isLoading);
    const { showToast } = useToast();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});
        try {
            await resetPassword(email, otp, newPassword);
            showToast('Password reset successfully.', 'success');
            navigate('/login');
        } catch (err) {
            if (err instanceof ApiError) {
                const fieldErrors = getFieldErrors(err.body);
                if (Object.keys(fieldErrors).length > 0) {
                    setErrors(Object.fromEntries(Object.entries(fieldErrors).map(([k, v]) => [k, v[0]])));
                } else {
                    showToast(parseApiError(err.body), 'error');
                }
            }
        }
    };

    return (
        <AuthCard title="Reset Password" subtitle="Enter your code and new password.">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} required />
                <Input label="Verification Code" value={otp} onChange={(e) => setOtp(e.target.value)} error={errors.otp} required />
                <Input label="New Password" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} error={errors.new_password} required minLength={8} />
                <Button type="submit" fullWidth loading={isLoading}>Reset Password</Button>
            </form>
            <p className="mt-6 text-xs text-gray-500">
                <Link to="/login" className="hover:text-accent">Back to login</Link>
            </p>
        </AuthCard>
    );
};

export default ResetPasswordPage;

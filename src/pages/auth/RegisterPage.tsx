import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthCard from '../../components/auth/AuthCard';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { useToast } from '../../hooks/useToast';
import { ApiError, getFieldErrors, parseApiError } from '../../api/client';
import { useAuthStore } from '../../store/authStore';

const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<Record<string, string>>({});
    const register = useAuthStore((s) => s.register);
    const isLoading = useAuthStore((s) => s.isLoading);
    const { showToast } = useToast();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});
        try {
            await register(email, password);
            showToast('Verification code sent to your email.', 'success');
            navigate('/verify-email', { state: { email } });
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
        <AuthCard title="Register" subtitle="Create your account to start shopping.">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} required />
                <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} error={errors.password} required minLength={8} />
                <Button type="submit" fullWidth loading={isLoading}>Create Account</Button>
            </form>
            <p className="mt-6 text-xs text-gray-500">
                Already have an account? <Link to="/login" className="hover:text-accent">Sign in</Link>
            </p>
        </AuthCard>
    );
};

export default RegisterPage;

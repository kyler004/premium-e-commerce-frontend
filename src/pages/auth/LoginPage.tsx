import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import AuthCard from '../../components/auth/AuthCard';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { useToast } from '../../hooks/useToast';
import { handleAuthError } from '../../lib/authErrors';
import { useAuthStore } from '../../store/authStore';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<Record<string, string>>({});
    const login = useAuthStore((s) => s.login);
    const isLoading = useAuthStore((s) => s.isLoading);
    const { showToast } = useToast();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const next = searchParams.get('next') ?? '/';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});
        try {
            await login(email, password);
            showToast('Welcome back!', 'success');
            navigate(next);
        } catch (err) {
            handleAuthError(err, showToast, setErrors);
        }
    };

    return (
        <AuthCard title="Login" subtitle="Sign in to access your cart and orders.">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} required />
                <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} error={errors.password} required />
                <Button type="submit" fullWidth loading={isLoading}>Sign In</Button>
            </form>
            <div className="mt-6 flex flex-col gap-2 text-xs text-gray-500">
                <Link to="/register" className="hover:text-accent">Create an account</Link>
                <Link to="/forgot-password" className="hover:text-accent">Forgot password?</Link>
            </div>
        </AuthCard>
    );
};

export default LoginPage;

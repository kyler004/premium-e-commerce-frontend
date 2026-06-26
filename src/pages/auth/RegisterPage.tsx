import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthCard from '../../components/auth/AuthCard';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { useToast } from '../../hooks/useToast';
import { handleAuthError } from '../../lib/authErrors';
import { setPendingVerifyEmail } from '../../lib/authSession';
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
            setPendingVerifyEmail(email);
            showToast('Verification code sent to your email.', 'success');
            navigate('/verify-email', { state: { email } });
        } catch (err) {
            handleAuthError(err, showToast, setErrors);
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

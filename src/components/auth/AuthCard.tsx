import type { ReactNode } from 'react';

interface AuthCardProps {
    title: string;
    subtitle?: string;
    children: ReactNode;
}

const AuthCard = ({ title, subtitle, children }: AuthCardProps) => (
    <div className="mx-auto flex min-h-[70vh] max-w-lg flex-col justify-center px-6 py-12">
        <div className="border border-border bg-surface p-8">
            <div className="mb-8">
                <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-gray-500">
                    Account
                </p>
                <h1 className="text-3xl font-black uppercase tracking-tight text-white">{title}</h1>
                {subtitle && <p className="mt-2 text-sm text-gray-500">{subtitle}</p>}
            </div>
            {children}
        </div>
    </div>
);

export default AuthCard;

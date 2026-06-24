import { useCallback, useState, type ReactNode } from 'react';
import { ToastContext } from '../../context/ToastContext';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
    id: number;
    message: string;
    type: ToastType;
}

let toastId = 0;

export const ToastProvider = ({ children }: { children: ReactNode }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = useCallback((message: string, type: ToastType = 'info') => {
        const id = ++toastId;
        setToasts((prev) => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 4000);
    }, []);

    const typeStyles: Record<ToastType, string> = {
        success: 'border-emerald-800/40 bg-emerald-900/20 text-emerald-400',
        error: 'border-red-800/40 bg-red-900/20 text-red-400',
        info: 'border-border bg-surface text-white',
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className={`fade-in-element border px-4 py-3 text-sm ${typeStyles[toast.type]}`}
                    >
                        {toast.message}
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};

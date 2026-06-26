import { ApiError, getFieldErrors, parseApiError } from '../api/client';

type ToastFn = (message: string, type: 'success' | 'error') => void;

export function handleAuthError(
    err: unknown,
    showToast: ToastFn,
    setErrors?: (errors: Record<string, string>) => void
) {
    if (err instanceof ApiError) {
        const fieldErrors = getFieldErrors(err.body);
        if (setErrors && Object.keys(fieldErrors).length > 0) {
            setErrors(Object.fromEntries(Object.entries(fieldErrors).map(([k, v]) => [k, v[0]])));
            return;
        }
        showToast(parseApiError(err.body), 'error');
        return;
    }

    showToast('Network error. Check your connection and try again.', 'error');
}

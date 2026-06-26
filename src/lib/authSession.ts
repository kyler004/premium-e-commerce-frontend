export const PENDING_VERIFY_EMAIL_KEY = 'pendingVerifyEmail';
export const PENDING_RESET_EMAIL_KEY = 'pendingResetEmail';

export function getPendingVerifyEmail(fallback = ''): string {
    return sessionStorage.getItem(PENDING_VERIFY_EMAIL_KEY) ?? fallback;
}

export function setPendingVerifyEmail(email: string) {
    sessionStorage.setItem(PENDING_VERIFY_EMAIL_KEY, email);
}

export function clearPendingVerifyEmail() {
    sessionStorage.removeItem(PENDING_VERIFY_EMAIL_KEY);
}

export function getPendingResetEmail(fallback = ''): string {
    return sessionStorage.getItem(PENDING_RESET_EMAIL_KEY) ?? fallback;
}

export function setPendingResetEmail(email: string) {
    sessionStorage.setItem(PENDING_RESET_EMAIL_KEY, email);
}

export function clearPendingResetEmail() {
    sessionStorage.removeItem(PENDING_RESET_EMAIL_KEY);
}

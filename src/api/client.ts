import type { ApiErrorBody, PaginatedResponse } from '../types/api';

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://127.0.0.1:8000';

let accessToken: string | null = null;
let refreshHandler: (() => Promise<string | null>) | null = null;

export const setAccessToken = (token: string | null) => {
    accessToken = token;
};

export const getAccessToken = () => accessToken;

export const setRefreshHandler = (handler: (() => Promise<string | null>) | null) => {
    refreshHandler = handler;
};

export class ApiError extends Error {
    status: number;
    body: ApiErrorBody;

    constructor(status: number, body: ApiErrorBody) {
        super(typeof body.detail === 'string' ? body.detail : 'Request failed');
        this.status = status;
        this.body = body;
    }
}

export const parseApiError = (body: ApiErrorBody): string => {
    if (typeof body.detail === 'string') return body.detail;
    const fieldErrors = Object.entries(body)
        .filter(([key]) => key !== 'detail')
        .flatMap(([, value]) => {
            if (Array.isArray(value)) return value.map(String);
            if (typeof value === 'string') return [value];
            return [];
        });
    return fieldErrors[0] ?? 'Request failed';
};

export const getFieldErrors = (body: ApiErrorBody): Record<string, string[]> => {
    const errors: Record<string, string[]> = {};
    for (const [key, value] of Object.entries(body)) {
        if (key === 'detail') continue;
        if (Array.isArray(value)) errors[key] = value.map(String);
    }
    return errors;
};

interface RequestOptions extends Omit<RequestInit, 'body'> {
    body?: unknown;
    auth?: boolean;
    skipRefresh?: boolean;
}

async function parseResponse<T>(response: Response): Promise<T> {
    if (response.status === 204) return undefined as T;
    const text = await response.text();
    if (!text) return undefined as T;
    return JSON.parse(text) as T;
}

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
    const { body, auth = true, skipRefresh = false, headers, ...rest } = options;

    const requestHeaders: Record<string, string> = {
        ...(headers as Record<string, string>),
    };

    if (body !== undefined) {
        requestHeaders['Content-Type'] = 'application/json';
    }

    if (auth && accessToken) {
        requestHeaders['Authorization'] = `Bearer ${accessToken}`;
    }

    const response = await fetch(`${BASE_URL}${path}`, {
        ...rest,
        headers: requestHeaders,
        body: body !== undefined ? JSON.stringify(body) : undefined,
    });

    if (response.status === 401 && auth && !skipRefresh && refreshHandler) {
        const newToken = await refreshHandler();
        if (newToken) {
            return request<T>(path, { ...options, skipRefresh: true });
        }
    }

    if (!response.ok) {
        let errorBody: ApiErrorBody = { detail: response.statusText };
        try {
            errorBody = await parseResponse<ApiErrorBody>(response);
        } catch {
            // keep default
        }
        throw new ApiError(response.status, errorBody);
    }

    return parseResponse<T>(response);
}

async function requestText(path: string, options: RequestOptions = {}): Promise<string> {
    const { auth = true, skipRefresh = false, headers, method = 'GET' } = options;

    const requestHeaders: Record<string, string> = {
        ...(headers as Record<string, string>),
    };

    if (auth && accessToken) {
        requestHeaders['Authorization'] = `Bearer ${accessToken}`;
    }

    const response = await fetch(`${BASE_URL}${path}`, {
        method,
        headers: requestHeaders,
    });

    if (response.status === 401 && auth && !skipRefresh && refreshHandler) {
        const newToken = await refreshHandler();
        if (newToken) {
            return requestText(path, { ...options, skipRefresh: true });
        }
    }

    if (!response.ok) {
        let errorBody: ApiErrorBody = { detail: response.statusText };
        try {
            errorBody = await parseResponse<ApiErrorBody>(response);
        } catch {
            // keep default
        }
        throw new ApiError(response.status, errorBody);
    }

    return response.text();
}

export const apiClient = {
    get: <T>(path: string, auth = true) => request<T>(path, { method: 'GET', auth }),
    getText: (path: string, auth = true) => requestText(path, { method: 'GET', auth }),
    post: <T>(path: string, body?: unknown, auth = true) =>
        request<T>(path, { method: 'POST', body, auth }),
    patch: <T>(path: string, body?: unknown, auth = true) =>
        request<T>(path, { method: 'PATCH', body, auth }),
    put: <T>(path: string, body?: unknown, auth = true) =>
        request<T>(path, { method: 'PUT', body, auth }),
    delete: <T>(path: string, auth = true) => request<T>(path, { method: 'DELETE', auth }),
};

export const getPaginated = <T>(path: string, params?: Record<string, string | number | undefined>) => {
    const search = new URLSearchParams();
    if (params) {
        for (const [key, value] of Object.entries(params)) {
            if (value !== undefined && value !== '') search.set(key, String(value));
        }
    }
    const query = search.toString();
    return apiClient.get<PaginatedResponse<T>>(`${path}${query ? `?${query}` : ''}`, false);
};

export const buildQueryPath = (path: string, params?: Record<string, string | number | undefined | null>) => {
    const search = new URLSearchParams();
    if (params) {
        for (const [key, value] of Object.entries(params)) {
            if (value !== undefined && value !== null && value !== '') {
                search.set(key, String(value));
            }
        }
    }
    const query = search.toString();
    return `${path}${query ? `?${query}` : ''}`;
};

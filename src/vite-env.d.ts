/// <reference types="vite/client" />

interface ImportMetaEnv {
    /** Backend API origin. Defaults to http://127.0.0.1:8000 in development if unset. */
    readonly VITE_API_BASE_URL?: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

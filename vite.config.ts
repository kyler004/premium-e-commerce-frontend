import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '')
    const apiBaseUrl = env.VITE_API_BASE_URL

    if (mode === 'production' && (!apiBaseUrl || apiBaseUrl.includes('127.0.0.1') || apiBaseUrl.includes('localhost'))) {
        throw new Error(
            'VITE_API_BASE_URL must be set to a production API URL before building. ' +
                'Example: VITE_API_BASE_URL=https://api.example.com npm run build'
        )
    }

    return {
        plugins: [react(), tailwindcss()],
    }
})

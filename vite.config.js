import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({_, mode}) => {
    return {
        plugins: [vue()],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url))
            },
        },
        base: mode === 'production' ? '/soa/' : '',
        server: {
            proxy: {
                '/api': {
                    // target: 'http://127.0.0.1:5000',
                    // target: "https://34.118.40.21",
                    target: "https://kw23.ddns.net/",
                    changeOrigin: true,
                    secure: false,
                }
            }
        }
    }
})

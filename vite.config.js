import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig(({ command }) =>{
    const isProduction = command === 'build';
    return {
        base: isProduction ? '/sektor/' : '/',
        publicDir: 'public',
        server: {
            https: false,
            proxy: {
                '/api': {
                    // target: "http://krw.ddns.net:8080/",
                    target: "http://localhost:1977/",
                    changeOrigin: true,
                    secure: false,
                    ws: true, // proxy także połączeń WebSocket (/api/ws/odprawa)
                    rewrite: (path) => path.replace(/^\/api/, ''),
                }
            }
        },
        plugins: [vue()],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url))
            }
        }
    }
})
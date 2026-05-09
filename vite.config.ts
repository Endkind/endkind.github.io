import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from "@tailwindcss/vite";
import {fileURLToPath, URL} from 'node:url'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        tailwindcss()
    ],
    resolve: {
        alias: {
            '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
            '@json': fileURLToPath(new URL('./src/json', import.meta.url)),
            '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
            '@ts': fileURLToPath(new URL('./src/ts', import.meta.url)),
        },
    },
})

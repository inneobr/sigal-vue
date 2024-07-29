import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig(() => {
    return {
        plugins: [vue()],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url)),
                '@service': fileURLToPath(new URL('./src/service', import.meta.url)),
                '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
                '@paginas': fileURLToPath(new URL('./src/paginas', import.meta.url))
            }
        }
    };
});

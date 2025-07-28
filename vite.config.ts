import { defineConfig } from 'vite';
import { resolve } from 'path';
import { serverPort, serverOrigin, remoteUrls } from './src/server';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';
// import eslint from 'vite-plugin-eslint';
import paris from 'paris-vite-plugin';

export default defineConfig({
    base: '/',
    plugins: [
        vue(),
        tailwindcss(),
        // eslint(),
        paris({
            name: 'paris',
            remotes: remoteUrls,
        }),
    ],
    resolve: {
        alias: {
            '@': resolve(__dirname, './src/shell'),
        },
    },
    build: {
        rollupOptions: {
            external: [ 'vue' ],
            output: {
                globals: {
                    vue: 'Vue',
                },
            },
        },
    },
    server: {
        port: serverPort,
        origin: serverOrigin,
    },
    preview: {
        port: serverPort,
    },
});

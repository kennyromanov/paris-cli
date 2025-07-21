console.log('import.meta.url', import.meta.url);

import('./src/server').then(console.log);

import { defineConfig } from 'vite';
import { resolve } from 'path';
import { serverPort, remoteUrls } from './src/server';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';
// import eslint from 'vite-plugin-eslint';
import paris from 'paris-vite-plugin';

export default defineConfig({
    plugins: [
        vue(),
        tailwindcss(),
        // eslint(),
        paris({
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
    },
    preview: {
        port: serverPort,
    },
});

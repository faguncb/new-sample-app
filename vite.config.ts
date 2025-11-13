import { defineConfig } from 'vite';

export default defineConfig({
    resolve: {
        alias: {
            buffer: 'buffer',
            process: 'process/browser',
        },
    },
    define: {
        'process.env': {},
        'global': 'globalThis',
    },
    build: {
        outDir: 'dist',
        rollupOptions: {
            input: 'index.html'
        }
    },
    optimizeDeps: {
        esbuildOptions: {
            define: {
                global: 'globalThis',
            },
        },
    },
});
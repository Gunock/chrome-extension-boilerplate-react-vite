import {defineConfig} from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [],
    base: './',
    build: {
        outDir: 'dist/content',
        rollupOptions: {
            input: 'src/content/index.ts',
            output: {
                inlineDynamicImports: true,
                entryFileNames: '[name].js'
            }
        }
    }
});

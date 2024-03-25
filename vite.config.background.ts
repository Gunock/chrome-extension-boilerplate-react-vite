import {defineConfig} from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [],
    base: './',
    build: {
        outDir: 'dist/background',
        rollupOptions: {
            input: 'src/background/index.ts',
            output: {
                inlineDynamicImports: true,
                entryFileNames: '[name].js'
            }
        }
    }
});

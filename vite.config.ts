import { crx } from '@crxjs/vite-plugin';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

import manifest from './manifest.json';
import packageJson from './package.json';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), crx({
        manifest: {
            ...manifest,
            version: packageJson.version
        }
    })],
    build: {
        outDir: 'dist',
        emptyOutDir: true
    }
});

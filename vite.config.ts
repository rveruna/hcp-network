// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/orcid-proxy': {
        target: 'https://pub.orcid.org/v3.0',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/orcid-proxy/, '')
      }
    }
  }
});

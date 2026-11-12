import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // The browser calls /api/... on port 5173; Vite forwards it to Spring Boot.
    // Same origin for the browser, so no CORS setup needed in dev.
    proxy: {
      '/api': 'http://localhost:8080',
    },
  },
});

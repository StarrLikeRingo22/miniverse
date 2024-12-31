import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({

  server: {  
    host: true  // hosting mobile link
  },
  plugins: [react()],
  build: {
    outDir: 'dist', // Ensure the output directory is set to 'dist'
  },
});

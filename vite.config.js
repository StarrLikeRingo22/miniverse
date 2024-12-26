import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // This specifies where the built assets should go
    outDir: 'public', // Set this to 'public' so the build assets are placed there
    assetsDir: 'assets', // Optionally specify assets directory for images or other static files
    rollupOptions: {
      input: {
        main: '/index.html',  // Main entry point
        three: '/Three.html'  // Your custom entry for Three.js experience
      },
    },
  },
})

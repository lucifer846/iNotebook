import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0'},  // Allows both 127.0.0.1 and localhost
  plugins: [react()],
})

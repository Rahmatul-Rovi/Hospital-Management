import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // jodi tumi tailwind v4 use koro

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
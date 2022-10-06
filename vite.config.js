import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
  },
  resolve: {
    alias: {
      '@Img': path.resolve(__dirname, 'src/Images'),
      '@Utils': path.resolve(__dirname, 'src/Utils'),
      '@Components': path.resolve(__dirname, 'src/Components'),
      '@Hooks': path.resolve(__dirname, 'src/Hooks'),
      '@Screens': path.resolve(__dirname, 'src/Screens'),
      '@Redux': path.resolve(__dirname, 'src/Redux'),
      '@Modals': path.resolve(__dirname, 'src/Modals'),
      '@Root': path.resolve(__dirname, 'src'),
    },
  },
})

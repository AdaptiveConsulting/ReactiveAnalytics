import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        // see https://github.com/vitejs/vite/issues/279#issuecomment-773454743
        find: '@',
        replacement: '/src',
      },
    ],
  },
})

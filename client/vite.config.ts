import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import graphql from '@rollup/plugin-graphql'

export default defineConfig({
  plugins: [react(), graphql()],
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

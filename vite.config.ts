import {defineConfig} from 'vitest/config'
import {svelte} from '@sveltejs/vite-plugin-svelte'
import {svelteTesting} from '@testing-library/svelte/vite'

export default defineConfig({
  plugins: [svelte(), svelteTesting()],

  server: {
    proxy: {
      '/api': 'https://dashboard.elering.ee',
    }
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['src/vitest-setup.ts'],
  },
})

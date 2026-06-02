import { defineConfig } from 'vitest/config'
import path from 'node:path'

// Tests run in node and never bundle into the app — no client JS is added to the
// publication. JSX is compiled by esbuild's automatic runtime.
export default defineConfig({
  esbuild: { jsx: 'automatic' },
  resolve: {
    alias: { '@': path.resolve(__dirname, '.') },
  },
  test: {
    environment: 'node',
    include: ['test/**/*.test.{ts,tsx}'],
  },
})

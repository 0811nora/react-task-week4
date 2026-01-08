import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  return {
    plugins: [react()],
    base: command === 'build' ? '/react-task-week2/' : '/',
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          silenceDeprecations: ['global-builtin', 'import', 'color-functions', 'mixed-decls'],
          logger: {
            warn: (message, options) => {
              if (options.deprecation) return;
            },
          },
        },
      },
    },
  }
})

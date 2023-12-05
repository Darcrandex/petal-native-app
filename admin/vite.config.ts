import react from '@vitejs/plugin-react-swc'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, './')

  return {
    plugins: [react()],

    resolve: { alias: { '@': '/src' } },

    server: {
      host: true,
      port: parseInt(env.PORT || '3000'),
      proxy: {
        '/api': {
          target: env.VITE_API_URI,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  }
})
